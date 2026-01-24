'use client';

import { Box, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';

const PACKAGES = [
  { name: 'BUN', value: 'bun created better' },
  { name: 'PNPM', value: 'pnpm created' },
  { name: 'NPM', value: 'npm init' },
];

export const PackageManager = () => {
  const [selectedPackage, setSelectedPackge] = useState('');

  const handleSelect = (e: SelectChangeEvent) => {
    setSelectedPackge(e.target.value as string);
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
        <Select
          value={selectedPackage}
          label="Gerenciadores"
          onChange={handleSelect}
          labelId={'package-selected-label'}
          displayEmpty={true}
        >
          {PACKAGES.map(pkg => (
            <MenuItem key={pkg.value} value={pkg.name}>
              {pkg.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedPackage && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'primary.main' }}>
          Comando base: {selectedPackage}
        </Typography>
      )}
    </Box>
  );
};
