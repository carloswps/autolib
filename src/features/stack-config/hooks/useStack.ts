import { useContext } from 'react';
import { StackContext } from '@/features/stack-config/hooks/StackContext';

export const useStack = () => {
  const context = useContext(StackContext);
  if (!context) throw new Error('useStack must be used within a StackProvider');
  return context;
};
