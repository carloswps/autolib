import { Block } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { ICON_MAPPER } from '@/shared/constants/iconMapper';

const techs = [
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
  const { availableTechs, toggleSelection, selections } = useStack();
  const techs = availableTechs.filter(tech => tech.category === 'web-frontend');
  const selectedId = selections['web-frontend']?.id;

  return (
    <SectionsWrapper title={'Web Frontend'} subtitle={'Escolha a sua stack de frontend preferida.'}>
      {techs.map(tech => {
        const isSelected = selectedId === tech.id;
        const iconPath = ICON_MAPPER[tech.name] || '/icons/default.png';

        return (
          <Button
            key={tech.id}
            variant={isSelected ? 'contained' : 'outlined'}
            onClick={() => toggleSelection(tech)}
            startIcon={<Image src={iconPath} alt={tech.name} width={20} height={20} />}
            sx={{
              bgcolor: '#f4f5f7',
              color: '#333',
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: 'none',
              justifyContent: 'flex-start',
              '&:hover': { bgcolor: '#eceef1' },
            }}
          >
            {tech.name}
          </Button>
        );
      })}
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
