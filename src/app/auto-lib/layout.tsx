'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from '@/shared/components/Header';
import { LastStepsSidebar } from '@/features/last-steps/components/LastStepsSidebar';
import { StackProvider } from '@/features/stack-config/hooks/StackProvider';

export default function AutoLibLayout({ children }: { children: ReactNode }) {
  return (
    <StackProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <LastStepsSidebar />
          <Box
            component={'main'}
            sx={{
              flexGrow: 1,
              p: 4,
              overflow: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </StackProvider>
  );
}
