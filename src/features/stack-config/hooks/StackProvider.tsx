import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { TechItem } from '@/shared/types/techItem';
import StackService from '@/features/stack-config/services/stackService';
import { StackContext } from './StackContext';

export const StackProvider = ({ children }: { children: ReactNode }) => {
  const [availableTechs, setAvailableTechs] = useState<TechItem[]>([]);
  const [selections, setSelections] = useState<Record<string, TechItem | null>>({});
  const [loading, setLoading] = useState(true);
  const [packageManager] = useState('pnpm');

  const getStackService = useRef(new StackService()).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStackService.getTechs();
        setAvailableTechs(data);
      } catch (e: any) {
        console.error('Falha ao buscar pacotes: ', e.message || 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

    if (selectedList.length === 0) return 'Selecione uma tecnologia...';

    const installDeps = selectedList.map(s => s.install).join(' ');
    const devDeps = selectedList
      .map(s => s.dev)
      .filter(Boolean)
      .join(' ');

    let command = `${packageManager} add ${installDeps}`;
    if (devDeps) {
      command += `\n${packageManager} add -D ${devDeps}`;
    }

    return command;
  }, [selections, packageManager]);

  return (
    <StackContext.Provider
      value={{
        availableTechs,
        selections,
        loading,
        toggleSelection,
        clearCategory,
        generatedCommand,
      }}
    >
      {children}
    </StackContext.Provider>
  );
};
