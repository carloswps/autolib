'use client';

import { CommandDisplay } from '@/features/last-steps/components/CommandDisplay';
import { SelectedStackSummary } from '@/features/last-steps/components/SelectedStackSummary';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { Box, Divider, Typography } from '@mui/material';
import { NameProjectInput } from './NameProjectInput';

export const LastStepsSidebar = ({ maxLength = 15 }: { maxLength?: number }) => {
  const { generatedCommand, projectName, setProjectName } = useStack();

  return (
    <Box
      component={'aside'}
      sx={{
        width: { xs: '100%', md: '30vw' },
        height: { xs: 'auto', md: '100vh' },
        position: { xs: 'relative', md: 'sticky' },
        top: 0,
        borderRight: { xs: 'none', md: '1px solid' },
        borderColor: { xs: '1px solid', md: 'none' },
        p: 4,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant={'h4'}
        sx={{
          fontWeight: 700,
        }}
      >
        Ultimos Passos
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{
          mb: 4,
        }}
      >
        Instale suas libs e types de forma prática
        <Divider orientation="horizontal" />
      </Typography>

      <Box sx={{ mt: 'auto', backgroundColor: 'transparent' }}>
        <NameProjectInput value={projectName} onChange={setProjectName} maxLength={maxLength} isLoading={false} />
      </Box>

      <CommandDisplay command={generatedCommand} />
      <SelectedStackSummary />
    </Box>
  );
};
