import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Block } from '@mui/icons-material';

const frameworks = [
  { name: 'Prisma', icon: '/icons/prisma.png' },
  { name: 'Drizzle', icon: '/icons/drizzle.png' },
  { name: 'Mongoose', icon: '/icons/mongoose.png' },
];

export const ManagerORM = () => {
  return (
    <SectionsWrapper title={'Manager ORM'} subtitle={'Escolha o seu gerenciador de banco de dados preferido.'}>
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
        No ORM
      </Button>
    </SectionsWrapper>
  );
};
