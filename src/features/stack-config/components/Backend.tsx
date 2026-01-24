import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Block } from '@mui/icons-material';

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
  return (
    <SectionsWrapper title={'Backend'} subtitle={'Escolha a sua stack de backend preferida.'}>
      {frameworks.map(fw => (
        <Button
          key={fw.name}
          variant="contained"
          sx={{
            bgcolor: '#f4f5f7',
            color: '#333',
            borderRadius: '50px',
            textTransform: 'none',
            boxShadow: 'none',
            justifyContent: 'flex-start',
            '&:hover': { bgcolor: '#eceef1' },
          }}
          startIcon={<Image src={fw.icon} alt="" width={20} height={20} />}
        >
          {fw.name}
        </Button>
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
