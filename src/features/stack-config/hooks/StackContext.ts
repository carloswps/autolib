import { TechItem } from '@/shared/types/techItem';
import { createContext } from 'react';

interface StackContextType {
  availableTechs: TechItem[];
  selections: Record<string, TechItem | null>;
  loading: boolean;
  toggleSelection: (item: TechItem) => void;
  clearCategory: (category: string) => void;
  generatedCommand: string;
}

export const StackContext = createContext<StackContextType | undefined>(undefined);
