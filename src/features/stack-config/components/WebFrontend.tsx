import { Block } from '@mui/icons-material';
import { Button } from '@mui/material';
import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';

export const WebFrontend = () => {
  const { availableTechs, toggleSelection, selections } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'web-frontend');
  const selectedId = selections['web-frontend']?.id;

  return (
    <SectionsWrapper title={'Web Frontend'} subtitle={'Escolha a sua stack de frontend preferida.'}>
      {techs.map(tech => (
        <TechButton key={tech.id} tech={tech} isSelected={selectedId === tech.id} onToggle={toggleSelection} />
      ))}
      <Button
        variant={'contained'}
        sx={{
          bgcolor: '#f4f5f7',
          color: '#333',
          borderRadius: '50px',
          textTransform: 'none',
          boxShadow: 'none',
          justifyContent: 'flex-start',
          '&:hover': { bgcolor: '#eceef1' },
        }}
        startIcon={<Block />}
      >
        No Web Frontend
      </Button>
    </SectionsWrapper>
  );
};
