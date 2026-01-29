import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const ManagerORM = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'orm');
  const selectedId = selections['orm']?.id;

  return (
    <SectionsWrapper title={'Manager ORM'} subtitle={'Escolha o seu gerenciador de banco de dados preferido.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('orm')} info={'No ORM'} />
    </SectionsWrapper>
  );
};
