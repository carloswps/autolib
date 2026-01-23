import { Box, Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import loading from '@/shared/animations/loading-animation.json';

export default function AnimationLoading({ info = 'Carregando informações}: {info?: string}' }) {
  return (
    <Stack direction={'row'} justifyContent={'center'} sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          width: { xs: '100px', sm: '200px', lg: '300px' },
          height: { xs: '100px', sm: '200px', lg: '300px' },
        }}
      >
        <Lottie animationData={loading} loop={true} />
        <Typography variant={'body1'} sx={{ mt: 0, textAlign: 'center', color: 'text.primary' }}>
          {info}
        </Typography>
      </Box>
    </Stack>
  );
}
