import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/theme.css';

export const wrapper = style({
  padding: vars.space[6],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
});

export const title = style({
  margin: 0,
  fontSize: vars.font.size.xxl,
  fontWeight: vars.font.weight.bold,
});

export const description = style({
  marginTop: vars.space[3],
  marginBottom: 0,
  color: vars.color.textMuted,
  lineHeight: 1.6,
});
