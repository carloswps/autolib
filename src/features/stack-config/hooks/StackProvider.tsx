import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { PackageManager, TechItem } from '@/shared/types/techItem';
import StackService from '@/features/stack-config/services/stackService';
import { StackContext } from './StackContext';

export const StackProvider = ({ children }: { children: ReactNode }) => {
  const [availableTechs, setAvailableTechs] = useState<TechItem[]>([]);
  const [selections, setSelections] = useState<Record<string, TechItem | null>>({});
  const [packageManagers, setPackageManagers] = useState<PackageManager[]>([]);
  const [selectedPackageManager, setSelectedPackageManager] = useState<PackageManager | null>(null);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(true);

  const getStackService = useRef(new StackService()).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStackService.getTechs();
        const uniqueByCategoryAndName = Array.from(
          new Map(data.map(item => [`${item.category}:${item.name}`, item])).values()
        );
        setAvailableTechs(uniqueByCategoryAndName);
      } catch (e: any) {
        console.error('Falha ao buscar pacotes: ', e.message || 'Erro desconhecido.');
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
        const data = await getStackService.getPackages();
        setPackageManagers(data);
        setSelectedPackageManager(prev => prev ?? data[0] ?? null);
      } catch (e: any) {
        console.error('Falha ao buscar pacotes: ', e.message || 'Erro desconhecido.');
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

    const installDeps = selectedList.map(s => s.install).join(' ');
    const devDeps = selectedList
      .map(s => s.dev)
      .filter(Boolean)
      .join(' ');

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

  return (
    <StackContext.Provider
      value={{
        availableTechs,
        packageManagers,
        selectedPackageManager,
        projectName,
        selections,
        loading,
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
