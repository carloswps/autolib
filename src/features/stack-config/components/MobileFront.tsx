import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';
import { ClearButton } from '@/shared/components/ClearButton';

export const MobileFront = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'mobile-frontend');
  const selectedId = selections['mobile-frontend']?.id;

  return (
    <SectionsWrapper title={'Mobile Frontend'} subtitle={'Escolha a sua stack de frontend mobile preferida.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('mobile-frontend')} info={'No Mobile Frontend'} />
    </SectionsWrapper>
  );
};
