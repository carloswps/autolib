import { Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <Box
      component={'header'}
      sx={{
        py: 1,
        width: '100%',
      }}
    >
      <Stack alignItems={'center'} justifyContent={'center'}>
        <Image src={'/logo.png'} alt={'Logo Auto Lib'} width={100} height={100} priority style={{ height: 'auto' }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Escolha a sua Stack
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '12px' },
          }}
        >
          Selecione as tecnologias para o seu próximo projeto
        </Typography>
      </Stack>
      <Divider variant="middle" />
    </Box>
  );
}
