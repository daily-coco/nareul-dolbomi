import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};
