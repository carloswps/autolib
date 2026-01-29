import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const Backend = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'backend');
  const selectedId = selections['backend']?.id;

  return (
    <SectionsWrapper title={'Backend'} subtitle={'Escolha a sua stack de backend preferida.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('backend')} info={'No Backend'} />
    </SectionsWrapper>
  );
};
