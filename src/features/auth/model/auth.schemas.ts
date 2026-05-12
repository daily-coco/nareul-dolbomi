import { email, z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, '이메일을 입력해 주세요.')
  .email('올바른 이메일 형식이 아닙니다.')
  .max(254, '입력된 이메일이 너무 깁니다. 다시 확인해 주세요.');

const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상 입력해 주세요.')
  .max(72, '비밀번호는 72자 이하로 입력해 주세요.');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine((valuse) => valuse.password === valuse.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
