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
        console.error('Fetch failed', erroMessage);
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
        console.error('Fetch failed', errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [getStackService]);

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

    for (const key in selections) {
      const item = selections[key];
      if (item) selectedList.push(item);
    }

    const installDeps = selectedList.map(item => item.install).join(' ');
    const devDeps = selectedList
      .map(s => s.dev)
      .filter(Boolean)
      .join('');

    const baseInstall = selectedPackageManager?.install ?? 'pnpm add';
    const commandLines: string[] = [];

    if (projectName.trim()) {
      commandLines.push(`mkdir "${projectName.trim()}"`, `cd "${projectName.trim()}"`);
    }

    if (selectedList.length > 0) {
      commandLines.push(`${baseInstall} ${installDeps}`);
      if (devDeps) {
        commandLines.push(`${baseInstall} -D ${devDeps}`);
      }
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
