import { globalStyle } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  fontSize: '16px',
});

globalStyle('body', {
  margin: 0,
  minWidth: '260px',
  minHeight: '100vh',
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
});
