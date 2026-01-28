import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import { Block } from '@mui/icons-material';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { TechButton } from '@/shared/components/TechButton';

const frameworks = [
  { name: 'Fastify', icon: '/icons/fastify.png' },
  { name: 'Nuxt', icon: '/icons/nuxt.png' },
  { name: 'Hono', icon: '/icons/hono.png' },
  { name: 'Convex', icon: '/icons/convex.png' },
  { name: 'Express', icon: '/icons/express.png' },
  { name: 'Next', icon: '/icons/astro.png' },
  { name: 'Tanstack Start', icon: '/icons/TansTack.png' },
  { name: 'Elysia', icon: '/icons/elysia.png' },
  { name: 'React', icon: '/icons/ReactRouter.png' },
];

export const Backend = () => {
  const { availableTechs, toggleSelection, selections } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'backend');
  const selectedId = selections['backend']?.id;

  return (
    <SectionsWrapper title={'Backend'} subtitle={'Escolha a sua stack de backend preferida.'}>
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
        No Backend
      </Button>
    </SectionsWrapper>
  );
};
