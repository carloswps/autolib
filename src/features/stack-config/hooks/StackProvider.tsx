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
    const name = projectName.trim() || 'my-app';
    const baseInstall = selectedPackageManager?.install ?? 'pnp add';

    const scaffolds: string[] = [];
    const deps: string[] = [];

    const devDeps: string[] = [];

    selectedList.forEach(tech => {
      if (tech.category === 'web-frontend' && tech.name.toLocaleLowerCase().includes('next.js')) {
        scaffolds.push(`npx created-next-app@latest ${name} --typescript --tailwind --eslint`);
      } else if (tech.category === 'web-frontend' && tech.name.toLocaleLowerCase().includes('astro')) {
        scaffolds.push(`npm create astro@latest ${name} -- --template framework=react`);
      } else {
        if (tech.install) {
          deps.push(tech.install);
        }
        if (tech.dev) {
          devDeps.push(tech.dev);
        }
      }
    });

    const commandLines: string[] = [];

    if (scaffolds.length > 0) {
      commandLines.push(...scaffolds);
      commandLines.push(`cd ${name}`);
    } else {
      commandLines.push(`mkdir "${name}"`, `cd "${name}"`, `npm init -y`);
    }

    if (deps.length > 0) {
      const filterDeps = deps.filter((d: string) => d !== 'next');
      if (filterDeps.length > 0) {
        commandLines.push(`${baseInstall} ${filterDeps.join(' ')}`);
      }
    }

    if (devDeps.length > 0) {
      commandLines.push(`${baseInstall} -D ${devDeps.join(' ')}`);
    }

    return commandLines.length > 0 ? commandLines.join('\n') : 'Escolha a sua Stack...';
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
