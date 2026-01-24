import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Block } from '@mui/icons-material';

const frameworks = [
  { name: 'Turso', icon: '/icons/turso.png' },
  { name: 'Supabase', icon: '/icons/supabase.png' },
  { name: 'Docker', icon: '/icons/docker.png' },
  { name: 'MongoDb Atlas', icon: '/icons/mongodb.png' },
  { name: 'Prisma Postgres', icon: '/icons/prisma.png' },
  { name: 'Cloudflare D1', icon: '/icons/cloudflare.png' },
  { name: 'Neon', icon: '/icons/neon.png' },
  { name: 'PlanetScale', icon: '/icons/planetscale.png' },
];

export const DBIntegration = () => {
  return (
    <SectionsWrapper title={'Database Integration'} subtitle={'Escolha o seu gerenciador de banco de dados preferido.'}>
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
        Basic Setup
      </Button>
    </SectionsWrapper>
  );
};
