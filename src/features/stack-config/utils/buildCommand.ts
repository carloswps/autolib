import { PackageManager } from '../hooks/StackContext';

const splitTokens = (value: string | null | undefined) => {
  return (value ?? '')
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(Boolean);
};

const uniq = (items: string[]): string[] => {
  return Array.from(new Set(items));
};

const installLine = (pm: PackageManager, packages: string[], dev: boolean) => {
  const pkgs = packages.join('');

  if (pm === 'npm') return dev ? `pnpm add -D ${pkgs}` : `pnpm add ${pkgs}`;
};
