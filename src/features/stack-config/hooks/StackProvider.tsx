'use client';

import StackService from '@/features/stack-config/services/stackService';
import { PackageManager, TechItem } from '@/shared/types/techItem';
import { debounce } from '@/shared/utils/debounce';
import { handleErrorMessage } from '@/shared/utils/handleError';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StackContext } from './StackContext';

export const StackProvider = ({ children }: { children: ReactNode }) => {
  const [availableTechs, setAvailableTechs] = useState<TechItem[]>([]);
  const [selections, setSelections] = useState<Record<string, TechItem | null>>({});
  const [packageManagers, setPackageManagers] = useState<PackageManager[]>([]);
  const [selectedPackageManager, setSelectedPackageManager] = useState<PackageManager | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projectName, setProjectName] = useState('');
  const debouncedSetProjectName = useRef<((name: string) => void) | null>(null);

  const getStackService = useRef(new StackService()).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStackService.getTechs();
        const uniqueByCategoryAndName = Array.from(
          new Map(data.map(item => [`${item.category}:${item.name}`, item])).values()
        );
        setAvailableTechs(uniqueByCategoryAndName);
      } catch (error) {
        const erroMessage = handleErrorMessage(error);
        setError(erroMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getStackService]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStackService.getPackages();
        setPackageManagers(data);
        setSelectedPackageManager(prev => prev ?? data[0] ?? null);
      } catch (error) {
        const errorMessage = handleErrorMessage(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [getStackService]);

  useEffect(() => {
    const selectedRuntime = selections['runtime'];
    if (selectedRuntime?.name.toLowerCase() === 'bun') {
      const bunPackageManager = packageManagers.find(pm => pm.name.toLowerCase() === 'bun');
      if (bunPackageManager) {
        setSelectedPackageManager(bunPackageManager);
      }
    }
  }, [selections, packageManagers]);

  const toggleSelection = (item: TechItem) => {
    setSelections(prev => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item,
    }));
  };

  const clearCategory = (category: string) => {
    setSelections(prev => ({ ...prev, [category]: null }));
  };

  const generatedCommand = useMemo(() => {
    const selectedList = Object.values(selections).filter((s): s is TechItem => s !== null);

    const installableItems = selectedList.filter(item => item.category !== 'runtime' && item.category !== 'git');

    const installDepsString = installableItems
      .map(item => item.install)
      .filter(Boolean)
      .join(' ');

    const uniqueInstallDeps = [...new Set(installDepsString.split(' ').filter(Boolean))];

    const devDepsString = installableItems
      .map(item => item.dev)
      .filter(Boolean)
      .map(devString => devString.split(' ').pop()!)
      .filter(Boolean);

    const uniqueDevDeps = [...new Set(devDepsString)].filter(p => !uniqueInstallDeps.includes(p));

    const baseInstall = selectedPackageManager?.install ?? 'pnpm add';
    const commandLines: string[] = [];

    if (projectName.trim()) {
      commandLines.push(`mkdir "${projectName.trim()}"`, `cd "${projectName.trim()}"`);
    }

    if (uniqueInstallDeps.length > 0) {
      commandLines.push(`${baseInstall} ${uniqueInstallDeps.join(' ')}`);
    }
    if (uniqueDevDeps.length > 0) {
      commandLines.push(`${baseInstall} -D ${uniqueDevDeps.join(' ')}`);
    }

    if (commandLines.length === 0) return 'Selecione uma tecnologia...';

    return commandLines.join('\n');
  }, [projectName, selections, selectedPackageManager]);

  const resetStack = () => {
    setSelections({});
  };

  useEffect(() => {
    debouncedSetProjectName.current = debounce((name: string) => {
      setProjectName(name);
    }, 0);
  }, []);

  const handleSetProjectName = useCallback((name: string) => {
    if (debouncedSetProjectName.current) {
      debouncedSetProjectName.current(name);
    }
  }, []);

  return (
    <StackContext.Provider
      value={{
        availableTechs,
        packageManagers,
        selectedPackageManager,
        projectName,
        selections,
        loading,
        error,
        toggleSelection,
        clearCategory,
        generatedCommand,
        resetStack,
        setProjectName: handleSetProjectName,
        setPackageManager: setSelectedPackageManager,
      }}
    >
      {children}
    </StackContext.Provider>
  );
};
