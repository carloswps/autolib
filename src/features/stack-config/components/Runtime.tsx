import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Block } from '@mui/icons-material';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { ICON_MAPPER } from '@/shared/constants/iconMapper';

export const Runtime = () => {
  const { availableTechs, selections, toggleSelection } = useStack();
  const techs = availableTechs.filter(thec => thec.category === 'runtime');
  const selectedId = selections['runtime']?.id;

  return (
    <SectionsWrapper title={'Runtime'}>
      {techs.map(tech => {
        const isSelected = selectedId === tech.id;
        const iconPath = ICON_MAPPER[tech.name] || '/logo.png';

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
              width: 'auto',
              height: '50px',
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
        No Runtime
      </Button>
    </SectionsWrapper>
  );
};
