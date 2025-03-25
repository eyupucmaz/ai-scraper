'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
