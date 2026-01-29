import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const DBIntegration = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'db-integration');
  const selectedId = selections['db-integration']?.id;

  return (
    <SectionsWrapper title={'Database Integration'} subtitle={'Escolha o seu gerenciador de banco de dados preferido.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('db-integration')} info={'No Database Integration'} />
    </SectionsWrapper>
  );
};
