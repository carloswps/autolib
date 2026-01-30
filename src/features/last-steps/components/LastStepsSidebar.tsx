'use client';

import { Code } from '@mui/icons-material';
import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { CommandDisplay } from '@/features/last-steps/components/CommandDisplay';
import { SelectedStackSummary } from '@/features/last-steps/components/SelectedStackSummary';
import { useStack } from '@/features/stack-config/hooks/useStack';

export const LastStepsSidebar = ({ maxLength = 15 }: { maxLength?: number }) => {
  const { generatedCommand, projectName, setProjectName } = useStack();

  return (
    <Box
      component={'aside'}
      sx={{
        width: '30vw',
        height: '100vh',
        position: 'sticky',
        top: 0,
        bgColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
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

      <TextField
        variant="outlined"
        label="Nome do projeto"
        placeholder="Digite o nome do seu projeto..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Code />
              </InputAdornment>
            ),
          },
        }}
        value={projectName}
        onChange={e => {
          if (e.target.value.length <= maxLength) {
            setProjectName(e.target.value);
          }
        }}
        helperText={`${projectName.length}/${maxLength}`}
      />
      {/*<CommandDisplay command={getProjectCreationCommand()} />*/}
      <CommandDisplay command={generatedCommand} />
      <SelectedStackSummary />
    </Box>
  );
};
