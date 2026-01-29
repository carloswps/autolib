import { Block } from '@mui/icons-material';
import { Button } from '@mui/material';

interface ClearButtonProps {
  onClick: () => void;
  info?: string;
}

export const ClearButton = ({ onClick, info }: ClearButtonProps) => {
  return (
    <Button
      onClick={() => onClick()}
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
      {info}
    </Button>
  );
};
