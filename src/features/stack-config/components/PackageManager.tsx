'use client';

import { Box, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useStack } from '@/features/stack-config/hooks/useStack';

export const PackageManager = () => {
  const { packageManagers, selectedPackageManager, setPackageManager } = useStack();

  const handleSelect = (e: SelectChangeEvent<number>) => {
    const selectedId = e.target.value;
    const manager = packageManagers.find(pkg => pkg.id === selectedId) ?? null;
    setPackageManager(manager);
  };

  return (
    <Box>
      <Typography
        variant={'h4'}
        sx={{
          fontWeight: 700,
        }}
      >
        Package Manager
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{
          mb: 4,
        }}
      >
        Escolha o seu gerenciador de pacotes preferido.
        <Divider orientation="horizontal" />
      </Typography>
      <FormControl fullWidth variant={'outlined'}>
        <InputLabel id={'package-selected-label'}>Gerenciadores</InputLabel>
        <Select<number>
          value={selectedPackageManager?.id ?? ''}
          label="Gerenciadores"
          onChange={handleSelect}
          labelId={'package-selected-label'}
          displayEmpty={true}
        >
          {packageManagers.map(pkg => (
            <MenuItem key={pkg.id} value={pkg.id}>
              {pkg.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedPackageManager && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'primary.main' }}>
          Comando base: {selectedPackageManager.install}
        </Typography>
      )}
    </Box>
  );
};
