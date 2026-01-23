import { ReactNode } from 'react';
import Header from '@/shared/components/Header';

export default function AutoLibLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
