'use client';

import StackService from '@/features/stack-config/services/stackService';
import { PackageManager, TechItem } from '@/shared/types/techItem';
import { debounce } from '@/shared/utils/debounce';
import { formatProjectName } from '@/shared/utils/formatProjectName';
import { handleErrorMessage } from '@/shared/utils/handleError';
import { SCAFFOLD_COMMANDS, SCAFOOLD_CATEGORIES } from '@/shared/utils/scaffoldCommands';
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
    const commandLines: string[] = [];
    const baseInstall = selectedPackageManager?.install ?? 'npm install';
    const pnName = selectedPackageManager?.name ?? 'npm';
    const formattedName = formatProjectName(projectName);

    const mainFrameWork = selectedList.find(item => SCAFOOLD_CATEGORIES.includes(item.category));

    // if (!mainFrameWork) {
    //   return <Alert severity="info">Selecione um framework principal (Web, Mobile ou Backend) para continuar.</Alert>;
    // }

    // if (!projectName.trim()) {
    //   return <Alert severity="info">Informe o nome do projeto para gerar o comando.</Alert>;
    // }

    if (!mainFrameWork) {
      return '⚠️ Selecione um framework principal (Web, Mobile ou Backend) para continuar.';
    }

    if (!formattedName) {
      return '⚠️ Informe o nome do projeto para gerar o comando.';
    }

    const scaffoldCommands = SCAFFOLD_COMMANDS[mainFrameWork.name];
    if (scaffoldCommands) {
      commandLines.push(scaffoldCommands(formattedName, pnName));
    }

    const secondaryList = selectedList.filter(item => item !== mainFrameWork);

    if (secondaryList.length > 0) {
      const resolvedList = secondaryList.map(item => {
        const match = availableTechs.find(
          t => t.name === item.name && t.category === item.category && t.packageManagerId === selectedPackageManager?.id
        );
        return match ?? item;
      });

      const installDeps = resolvedList.map(item => item.install).join(' ');
      commandLines.push(`cd "${formattedName}" && ${baseInstall} ${installDeps}`);

      const devDeps = resolvedList
        .map(s => s.dev)
        .filter(Boolean)
        .join(' ');

      if (devDeps.length > 0) {
        commandLines.push(`${baseInstall} -D ${devDeps}`);
      }
    }

    return commandLines.join('\n');
  }, [
    selections,
    selectedPackageManager?.install,
    selectedPackageManager?.name,
    selectedPackageManager?.id,
    projectName,
    availableTechs,
  ]);

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
