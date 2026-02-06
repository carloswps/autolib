'use client';

import { AuthManager } from '@/features/stack-config/components/AuthManager';
import { Backend } from '@/features/stack-config/components/Backend';
import { DatabaseManager } from '@/features/stack-config/components/DatabaseManager';
import { DBIntegration } from '@/features/stack-config/components/DBIntegration';
import { GitManager } from '@/features/stack-config/components/GitManager';
import { HandleApiManager } from '@/features/stack-config/components/HandleApiManager';
import { ManagerORM } from '@/features/stack-config/components/ManagerORM';
import { PackageManager } from '@/features/stack-config/components/PackageManager';
import { PaymentsManager } from '@/features/stack-config/components/PaymentsManager';
import { Runtime } from '@/features/stack-config/components/Runtime';
import { ValidationManager } from '@/features/stack-config/components/ValidationManager';
import { Box, Grid } from '@mui/material';
import { MobileFront } from './MobileFront';
import { WebFrontend } from './WebFrontend';

export const SelectionArea = () => {
  return (
    <Grid container spacing={4} sx={{ p: { xs: 2, md: 4 } }}>
      {/* LEFT COLUMN */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <PackageManager />
          <MobileFront />
          <Runtime />
          <DatabaseManager />
          <DBIntegration />
          <PaymentsManager />
          <ValidationManager />
        </Box>
      </Grid>

      {/* RIGHT COLUMN */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <WebFrontend />
          <Backend />
          <HandleApiManager />
          <ManagerORM />
          <AuthManager />
          <GitManager />
        </Box>
      </Grid>
    </Grid>
  );
};
