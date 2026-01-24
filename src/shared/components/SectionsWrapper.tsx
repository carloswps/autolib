import { ReactNode } from 'react';
import { Box, Divider, Typography } from '@mui/material';

interface SectionsWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const SectionsWrapper = ({
  title,
  subtitle = 'Escolha a sua stack preferida.',
  children,
}: SectionsWrapperProps) => (
  <Box>
    <Typography variant={'h4'} fontWeight={700} sx={{ mb: 0.5 }}>
      {title}
    </Typography>
    <Typography
      variant={'body2'}
      color="textSecondary"
      sx={{
        mb: 4,
      }}
    >
      {subtitle}
      <Divider orientation="horizontal" />
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 1.5,
      }}
    >
      {children}
    </Box>
  </Box>
);
