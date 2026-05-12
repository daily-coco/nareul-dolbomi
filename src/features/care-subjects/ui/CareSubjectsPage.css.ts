import { style } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  maxWidth: '56rem',
  margin: '0 auto',
  padding: '2rem 1rem',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1.5rem',
});

export const title = style({
  margin: 0,
  fontSize: '1.75rem',
  lineHeight: 1.3,
  fontWeight: 700,
});

export const description = style({
  margin: 0,
  color: '#555',
  fontSize: '1rem',
  lineHeight: 1.6,
});

export const contentGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',

  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: '20rem 1fr',
      alignItems: 'start',
    },
  },
});

export const panel = style({
  padding: '1rem',
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  backgroundColor: '#fff',
});

export const panelTitle = style({
  margin: '0 0 1rem',
  fontSize: '1.125rem',
  lineHeight: 1.4,
  fontWeight: 700,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

export const label = style({
  fontSize: '0.875rem',
  fontWeight: 600,
});

export const input = style({
  width: '100%',
  minHeight: '2.75rem',
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  lineHeight: 1.5,

  ':focus': {
    outline: '2px solid #111827',
    outlineOffset: '2px',
  },
});

export const textarea = style([
  input,
  {
    minHeight: '7rem',
    resize: 'vertical',
  },
]);

export const fieldError = style({
  margin: 0,
  color: '#dc2626',
  fontSize: '0.875rem',
  lineHeight: 1.4,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
});

export const primaryButton = style({
  minHeight: '2.75rem',
  padding: '0 1rem',
  border: 0,
  borderRadius: '0.75rem',
  backgroundColor: '#111827',
  color: '#fff',
  fontSize: '0.9375rem',
  fontWeight: 700,
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const secondaryButton = style({
  minHeight: '2.75rem',
  padding: '0 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.75rem',
  backgroundColor: '#fff',
  color: '#111827',
  fontSize: '0.9375rem',
  fontWeight: 700,
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const dangerButton = style({
  minHeight: '2.5rem',
  padding: '0 0.875rem',
  border: '1px solid #fecaca',
  borderRadius: '0.75rem',
  backgroundColor: '#fff',
  color: '#dc2626',
  fontSize: '0.875rem',
  fontWeight: 700,
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const listItem = style({
  padding: '1rem',
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  backgroundColor: '#fff',
});

export const listItemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '0.5rem',
});

export const listItemTitle = style({
  margin: 0,
  fontSize: '1rem',
  lineHeight: 1.5,
  fontWeight: 700,
});

export const listItemDescription = style({
  margin: '0.5rem 0 0',
  color: '#4b5563',
  fontSize: '0.9375rem',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
});

export const listItemMeta = style({
  margin: '0.5rem 0 0',
  color: '#6b7280',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
});

export const empty = style({
  padding: '2rem 1rem',
  border: '1px dashed #d1d5db',
  borderRadius: '1rem',
  color: '#6b7280',
  textAlign: 'center',
  lineHeight: 1.6,
});

export const statusText = style({
  margin: 0,
  color: '#6b7280',
  fontSize: '0.9375rem',
  lineHeight: 1.6,
});

export const errorBox = style({
  padding: '1rem',
  border: '1px solid #fecaca',
  borderRadius: '1rem',
  backgroundColor: '#fef2f2',
  color: '#b91c1c',
  fontSize: '0.9375rem',
  lineHeight: 1.6,
});
