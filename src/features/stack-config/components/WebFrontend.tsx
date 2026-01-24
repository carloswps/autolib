import { Block } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import { SectionsWrapper } from '@/shared/components/SectionsWrapper';

const frameworks = [
  { name: 'TansStack', icon: '/icons/TansTack.png' },
  { name: 'Svelte', icon: '/icons/Svelte.png' },
  { name: 'Solid', icon: '/icons/solid.png' },
  { name: 'Nuxt', icon: '/icons/nuxt.png' },
  { name: 'React', icon: '/icons/react.png' },
  { name: 'Astro', icon: '/icons/astro.png' },
  { name: 'Tanstack Start', icon: '/icons/TansTack.png' },
  { name: 'React Router', icon: '/icons/ReactRouter.png' },
];

export const WebFrontend = () => {
  return (
    <SectionsWrapper title={'Web Frontend'} subtitle={'Escolha a sua stack de frontend preferida.'}>
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
        No Web Frontend
      </Button>
    </SectionsWrapper>
  );
};
