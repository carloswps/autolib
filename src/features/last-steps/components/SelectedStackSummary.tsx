'use client';

import { useStack } from '@/features/stack-config/hooks/useStack';
import { ICON_MAPPER } from '@/shared/constants/iconMapper';
import { RestartAlt } from '@mui/icons-material';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';

export const SelectedStackSummary = () => {
  const { selections, resetStack } = useStack();

  const selectedItems = useMemo(() => {
    const items: Array<{ id: string; name: string }> = [];
    for (const category in selections) {
      const item = selections[category];
      if (item) {
        items.push({ id: `${category}-${item.name}`, name: item.name });
      }
    }
    return items;
  }, [selections]);

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
            {ICON_MAPPER[item.name] ? (
              <Image src={ICON_MAPPER[item.name] || '/logo.png'} alt="" width={20} height={20} />
            ) : (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#777',
                }}
              >
                {item.name.charAt(0)}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={'outlined'}
          onClick={resetStack}
          startIcon={<RestartAlt />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
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
