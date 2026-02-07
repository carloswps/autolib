import { Code } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface NameProjectInputProps {
  value: string;
  isLoading: boolean;
  maxLength?: number;
  onChange: (value: string) => void | Promise<void>;
}

export function NameProjectInput({ isLoading, maxLength = 15, onChange, value }: NameProjectInputProps) {
  const handleSendName = () => {
    if (value.trim() === '' || isLoading) return;
    void onChange(value);
  };

  const handleKeyDow = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendName();
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Nome do Projeto"
      placeholder="Digite o nome do seu projeto..."
      value={value}
      onChange={e => {
        if (e.target.value.length <= maxLength) {
          onChange(e.target.value);
        }
      }}
      onKeyDown={handleKeyDow}
      helperText={`${value.length}/${maxLength}`}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Code />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
