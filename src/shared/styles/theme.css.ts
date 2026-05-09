import { createTheme } from '@vanilla-extract/css';
export const [themeClass, vars] = createTheme({
  color: {
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#111827',
    textMuted: '#6b7280',
    border: '#e5e7eb',
    primary: '#4f46e5',
    danger: '#dc2626',
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
  },
  font: {
    size: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    weight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
  },
});
