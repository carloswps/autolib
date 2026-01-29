import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const GitManager = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'git');
  const selectedId = selections['git']?.id;

  return (
    <SectionsWrapper title={'GIT'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('git')} info={'No GIT'} />
    </SectionsWrapper>
  );
};
