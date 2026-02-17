import { useStack } from '@/features/stack-config/hooks/useStack';
import { ClearButton } from '@/shared/components/ClearButton';
import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { TechButton } from '@/shared/components/TechButton';

export const WebFrontend = () => {
  const { availableTechs, toggleSelection, selections, clearCategory } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'web-frontend');
  const selectedId = selections['web-frontend']?.id;
  console.log('Available Techs in Web Frontend', techs);
  console.log('Selected Tech in Web Frontend', selections['web-frontend']);

  return (
    <SectionsWrapper title={'Web Frontend'} subtitle={'Escolha a sua stack de frontend preferida.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <ClearButton onClick={() => clearCategory('web-frontend')} info={'No Web Frontend'} />
    </SectionsWrapper>
  );
};
