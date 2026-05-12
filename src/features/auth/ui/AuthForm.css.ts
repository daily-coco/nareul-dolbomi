import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});

export const card = style({
  width: '100%',
  maxWidth: '26rem',
  padding: '2rem',
  border: '1px solid #e5e7eb',
  borderRadius: '1rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 1rem 2rem rgba(15, 23, 42, 0.08)',
});

export const title = style({
  margin: 0,
  fontSize: '1.5rem',
  lineHeight: 1.3,
  fontWeight: 700,
  color: '#111827',
});

export const description = style({
  marginTop: '0.5rem',
  marginBottom: '1.5rem',
  fontSize: '0.9375rem',
  lineHeight: 1.6,
  color: '#6b7280',
});

export const form = style({
  display: 'grid',
  gap: '1rem',
});

export const field = style({
  display: 'grid',
  gap: '0.375rem',
});

export const label = style({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#374151',
});

export const input = style({
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid #d1d5db',
  borderRadius: '0.75rem',
  padding: '0.75rem 0.875rem',
  fontSize: '1rem',
  lineHeight: 1.5,
  color: '#111827',
  outline: 'none',

  ':focus': {
    borderColor: '#111827',
  },
});

export const errorText = style({
  margin: 0,
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  color: '#dc2626',
});

export const message = style({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: '#374151',
});

export const button = style({
  width: '100%',
  border: 0,
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  fontSize: '1rem',
  fontWeight: 700,
  color: '#ffffff',
  backgroundColor: '#111827',
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
});

export const linkArea = style({
  marginTop: '1rem',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: '#6b7280',
});

export const link = style({
  color: '#111827',
  fontWeight: 700,
  textDecoration: 'none',
});
