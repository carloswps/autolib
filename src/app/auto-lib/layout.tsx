'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from '@/shared/components/Header';
import { LastStepsSidebar } from '@/features/last-steps/components/LastStepsSidebar';

export default function AutoLibLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <LastStepsSidebar />
        <Box
          component={'main'}
          sx={{
            flexGrow: 1,
            p: { xs: 3, md: 6 },
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
