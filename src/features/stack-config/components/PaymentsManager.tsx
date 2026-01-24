import { SectionsWrapper } from '@/shared/components/SectionsWrapper';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Block } from '@mui/icons-material';

const frameworks = [
  { name: 'Stripe', icon: '/icons/stripe.png' },
  { name: 'Polar', icon: '/icons/polar.png' },
];

export const PaymentsManager = () => {
  return (
    <SectionsWrapper title={'Pagamentos'}>
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
        No Payments
      </Button>
    </SectionsWrapper>
  );
};
