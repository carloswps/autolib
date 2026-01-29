import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const Runtime = () => {
  const { availableTechs, selections, toggleSelection, clearCategory } = useStack();
  const techs = availableTechs.filter(thec => thec.category === 'runtime');
  const selectedId = selections['runtime']?.id;

  return (
    <SectionsWrapper title={'Runtime'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('runtime')} info={'No runtime'} />
    </SectionsWrapper>
  );
};
