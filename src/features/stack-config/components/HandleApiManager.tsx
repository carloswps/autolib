import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import { Block } from '@mui/icons-material';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';

export const HandleApiManager = () => {
  const { availableTechs, toggleSelection, selections } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'api');
  const selectedId = selections['api']?.id;

  return (
    <SectionsWrapper title={'API'}>
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
        No Api
      </Button>
    </SectionsWrapper>
  );
};
