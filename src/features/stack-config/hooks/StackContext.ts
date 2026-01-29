import { TechItem } from '@/shared/types/techItem';
import { createContext } from 'react';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

interface StackContextType {
  availableTechs: TechItem[];
  selections: Record<string, TechItem | null>;
  loading: boolean;
  toggleSelection: (item: TechItem) => void;
  clearCategory: (category: string) => void;
  generatedCommand: string;
  resetStack: () => void;
  packageManager: PackageManager;
  setProjectName: (name: string) => void;
}

export const StackContext = createContext<StackContextType | undefined>(undefined);
