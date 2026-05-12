import { z } from 'zod';

export const careSubjectFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '기록 대상 이름을 입력해 주세요.')
    .max(40, '기록 대상 이름은 40자 이하로 입력해 주세요.'),
  description: z
    .string()
    .trim()
    .max(200, '설명은 200자 이하로 입력해 주세요.')
    .optional(),
});

export type CareSubjectFormValues = z.infer<typeof careSubjectFormSchema>;
