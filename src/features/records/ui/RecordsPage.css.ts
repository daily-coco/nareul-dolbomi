// src/features/records/ui/RecordsPage.css.ts

import { style } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '32px 20px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '24px',
});

export const headerText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const title = style({
  margin: 0,
  fontSize: '28px',
  lineHeight: 1.3,
  fontWeight: 700,
});

export const description = style({
  margin: 0,
  color: '#666',
  fontSize: '15px',
  lineHeight: 1.6,
});

export const card = style({
  padding: '24px',
  border: '1px solid #e5e5e5',
  borderRadius: '16px',
  background: '#fff',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const label = style({
  fontSize: '14px',
  fontWeight: 700,
});

export const input = style({
  width: '100%',
  minHeight: '42px',
  padding: '10px 12px',
  border: '1px solid #d8d8d8',
  borderRadius: '10px',
  fontSize: '15px',
  boxSizing: 'border-box',
});

export const select = style([
  input,
  {
    background: '#fff',
  },
]);

export const textarea = style([
  input,
  {
    minHeight: '180px',
    resize: 'vertical',
    lineHeight: 1.6,
  },
]);

export const errorText = style({
  margin: 0,
  color: '#c62828',
  fontSize: '13px',
  lineHeight: 1.5,
});

export const buttonRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
});

export const primaryButton = style({
  minHeight: '42px',
  padding: '0 16px',
  border: 'none',
  borderRadius: '10px',
  background: '#222',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',

  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const secondaryButton = style({
  minHeight: '42px',
  padding: '0 16px',
  border: '1px solid #d8d8d8',
  borderRadius: '10px',
  background: '#fff',
  color: '#222',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',

  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const dangerButton = style({
  minHeight: '38px',
  padding: '0 12px',
  border: '1px solid #ffcdd2',
  borderRadius: '10px',
  background: '#fff5f5',
  color: '#c62828',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',

  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const notice = style({
  padding: '16px',
  borderRadius: '12px',
  background: '#f7f7f7',
  color: '#555',
  fontSize: '14px',
  lineHeight: 1.6,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
});

export const listItem = style({
  padding: '18px',
  border: '1px solid #e5e5e5',
  borderRadius: '14px',
  background: '#fff',
});

export const listItemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
});

export const listItemTitle = style({
  margin: 0,
  fontSize: '18px',
  lineHeight: 1.4,
  fontWeight: 700,
});

export const meta = style({
  marginTop: '6px',
  color: '#777',
  fontSize: '13px',
  lineHeight: 1.5,
});

export const contentPreview = style({
  margin: '14px 0 0',
  color: '#333',
  fontSize: '15px',
  lineHeight: 1.7,
  whiteSpace: 'pre-wrap',
});

export const itemActions = style({
  display: 'flex',
  gap: '8px',
  flexShrink: 0,
});

export const empty = style({
  padding: '32px 20px',
  border: '1px dashed #d8d8d8',
  borderRadius: '16px',
  textAlign: 'center',
  color: '#666',
  lineHeight: 1.6,
});

export const editPanel = style({
  marginBottom: '24px',
});

export const sectionTitle = style({
  margin: '0 0 12px',
  fontSize: '20px',
  lineHeight: 1.4,
  fontWeight: 700,
});

export const linkButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '42px',
  padding: '0 16px',
  borderRadius: '10px',
  background: '#222',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 700,
});
