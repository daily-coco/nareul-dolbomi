import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const appShell = style({
  minHeight: '100vh',
  backgroundColor: vars.color.background,
});

export const main = style({
  width: '100%',
  maxWidth: '72rem',
  margin: '0 auto',
  padding: vars.space[4],
});
