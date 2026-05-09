import type { PropsWithChildren } from 'react';
import { QueryProvider } from '@/app/providers/QueryProvider';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};
