import { ICON_MAPPER } from '@/shared/constants/iconMapper';
import Image from 'next/image';
import { Button } from '@mui/material';
import { TechItem } from '@/shared/types/techItem';

interface TechButtonProps {
  tech: TechItem;
  isSelected: boolean;
  onToggle: (tech: TechItem) => void;
}

export const TechButton = ({ tech, isSelected, onToggle }: TechButtonProps) => {
  const iconPath = ICON_MAPPER[tech.name] || '/logo.png';

  return (
    <Button
      key={tech.id}
      variant={isSelected ? 'contained' : 'outlined'}
      onClick={() => onToggle(tech)}
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
};
