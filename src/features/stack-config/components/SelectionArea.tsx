'use client';

import { Box, Grid } from '@mui/material';
import { PackageManager } from '@/features/stack-config/components/PackageManager';
import { WebFrontend } from './WebFrontend';
import { MobileFront } from './MobileFront';
import { Backend } from '@/features/stack-config/components/Backend';
import { Runtime } from '@/features/stack-config/components/Runtime';
import { HandleApiManager } from '@/features/stack-config/components/HandleApiManager';
import { DatabaseManager } from '@/features/stack-config/components/DatabaseManager';
import { ManagerORM } from '@/features/stack-config/components/ManagerORM';
import { DBIntegration } from '@/features/stack-config/components/DBIntegration';
import { AuthManager } from '@/features/stack-config/components/AuthManager';
import { PaymentsManager } from '@/features/stack-config/components/PaymentsManager';
import { GitManager } from '@/features/stack-config/components/GitManager';
import { ValidationManager } from '@/features/stack-config/components/ValidationManager';

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
