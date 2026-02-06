import { PackageManager, TechItem } from '@/shared/types/techItem';
import { createContext } from 'react';

interface StackContextType {
  availableTechs: TechItem[];
  packageManagers: PackageManager[];
  selectedPackageManager: PackageManager | null;
  projectName: string;
  selections: Record<string, TechItem | null>;
  loading: boolean;
  toggleSelection: (item: TechItem) => void;
  clearCategory: (category: string) => void;
  generatedCommand: string;
  resetStack: () => void;
  setProjectName: (name: string) => void;
  setPackageManager: (manager: PackageManager | null) => void;
  error: string | null;
}

export const StackContext = createContext<StackContextType | undefined>(undefined);
