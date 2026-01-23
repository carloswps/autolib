import { useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

export const CommandDisplay = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant={'caption'} sx={{ ml: 1, color: 'text.secondary', textTransform: 'uppercase' }}>
        Terminal Output
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mt: 0.5,
          color: '#343131',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'flex-start',
          fontFamily: 'monospace',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          component="code"
          sx={{
            flexGrow: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}
        >
          {`$ ${command}`}
        </Box>
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} open={copied}>
          <IconButton onClick={handleCopy} size={'small'} sx={{ color: '#888', '&:hover': { color: '#fff' } }}>
            <ContentCopy fontSize={'small'} />
          </IconButton>
        </Tooltip>
      </Paper>

      <Typography
        variant={'caption'}
        sx={{
          ml: 1,
          mt: 1,
          color: 'info.main',
        }}
      >
        Execute os comandos acima no seu terminal.
      </Typography>
    </Box>
  );
};
