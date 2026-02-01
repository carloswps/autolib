'use client';

import { CommandDisplay } from '@/features/last-steps/components/CommandDisplay';
import { SelectedStackSummary } from '@/features/last-steps/components/SelectedStackSummary';
import { useStack } from '@/features/stack-config/hooks/useStack';
import { Code } from '@mui/icons-material';
import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material';


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
      <CommandDisplay command={generatedCommand} />
      <SelectedStackSummary />
    </Box>
  );
};
