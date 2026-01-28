import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import { Block } from '@mui/icons-material';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';

export const AuthManager = () => {
  const { availableTechs, toggleSelection, selections } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'auth');
  const selectedId = selections['auth']?.id;

  return (
    <SectionsWrapper title={'Auth Manager'} subtitle={'Escolha o seu gerenciador de banco de dados preferido.'}>
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
        No Auth Manager
      </Button>
    </SectionsWrapper>
  );
};
