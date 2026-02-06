'use client';

import StackService from '@/features/stack-config/services/stackService';
import { PackageManager, TechItem } from '@/shared/types/techItem';
import { handleErrorMessage } from '@/shared/utils/handleError';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { StackContext } from './StackContext';

export const StackProvider = ({ children }: { children: ReactNode }) => {
  const [availableTechs, setAvailableTechs] = useState<TechItem[]>([]);
  const [selections, setSelections] = useState<Record<string, TechItem | null>>({});
  const [packageManagers, setPackageManagers] = useState<PackageManager[]>([]);
  const [selectedPackageManager, setSelectedPackageManager] = useState<PackageManager | null>(null);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const baseInstall = selectedPackageManager?.install ?? 'pnpm add';
    const commandLines: string[] = [];

    if (projectName.trim()) {
      commandLines.push(`mkdir "${projectName.trim()}"`, `cd "${projectName.trim()}"`);
    }

    if (selectedList.length > 0) {
      selectedList.forEach(item => {
        if (item.install && item.install.includes(' ')) {
          commandLines.push(item.install);
        } else if (item.install) {
          commandLines.push(`${baseInstall} ${item.install}`);
        }

        if (item.dev && item.dev.includes(' ')) {
          commandLines.push(item.dev);
        } else if (item.dev) {
          commandLines.push(`${baseInstall} -D ${item.dev}`);
        }
      });
    }

    if (commandLines.length === 0) return 'Selecione uma tecnologia...';

    return commandLines.join('\n');
  }, [projectName, selections, selectedPackageManager]);

  const resetStack = () => {
    setSelections({});
  };

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
        setProjectName,
        setPackageManager: setSelectedPackageManager,
      }}
    >
      {children}
    </StackContext.Provider>
  );
};
