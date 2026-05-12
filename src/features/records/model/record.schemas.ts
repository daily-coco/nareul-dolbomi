import { z } from 'zod';

export const recordSchema = z.object({
  careSubjectId: z.string().uuid('기록 대상을 올바르게 선택해주세요.'),

  title: z
    .string()
    .trim()
    .min(1, '제목을 입력해주세요.')
    .max(80, '제목은 80자 이하로 입력해주세요.'),

  content: z
    .string()
    .trim()
    .min(1, '기록 내용을 입력해주세요.')
    .max(5000, '기록 내용은 5000자 이하로 입력해주세요.'),

  recordDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '기록 날짜를 선택해주세요.'),
});

export type RecordFormValues = z.infer<typeof recordSchema>;
