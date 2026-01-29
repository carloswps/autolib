'use client';

import { useStack } from '@/features/stack-config/hooks/useStack';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { ICON_MAPPER } from '@/shared/constants/iconMapper';
import { RestartAlt } from '@mui/icons-material';

export const SelectedStackSummary = () => {
  const { selections, resetStack } = useStack();

  const selectedItems = Object.values(selections).filter(item => item !== null);

  return (
    <Box>
      <Typography
        variant={'h4'}
        color={'text.secondary'}
        sx={{
          mt: 2,
          fontWeight: 500,
        }}
      >
        Sua Stack
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 4,
        }}
      >
        {selectedItems.map(item => (
          <Paper
            key={item.id}
            variant={'elevation'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 1,
              borderRadius: '12px',
              borderColor: '#e0e0e0',
              boxShadow: 'none',
            }}
          >
            <Image src={ICON_MAPPER[item.name] || '/logo.png'} alt="" width={20} height={20} />
          </Paper>
        ))}
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ dislay: 'flex', justifyContent: 'center' }}>
        <Button
          variant={'outlined'}
          onClick={resetStack}
          startIcon={<RestartAlt />}
          sx={{
            borderRadius: '12px',
            texTransform: 'none',
            color: '#5e5d71',
            borderColor: '#e0e0e0',
            px: 4,
            '&:hover': {
              borderColor: '#bdbdbd',
              bgcolor: '#f5f5f5',
            },
          }}
        >
          Resetar
        </Button>
      </Box>
    </Box>
  );
};
