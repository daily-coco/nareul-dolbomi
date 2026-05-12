import { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signUpWithEmail } from '@/features/auth/api/auth.api';
import {
  signupSchema,
  type SignupFormValues,
} from '@/features/auth/model/auth.schemas';
import * as styles from '@/features/auth/ui/AuthForm.css';
import { ROUTES } from '@/app/routes/paths';

export function SignupForm() {
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setFormMessage(null);

    try {
      await signUpWithEmail({
        email: values.email,
        password: values.password,
      });

      reset();

      setFormMessage(
        '회원가입 요청이 완료되었습니다. 이메일 확인 후 로그인해 주세요.'
      );
    } catch {
      setFormMessage(
        '회원가입을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  };

  return (
    <section className={styles.card} aria-labelledby='signup-title'>
      <h1 id='signup-title' className={styles.title}>
        회원가입
      </h1>

      <p className={styles.description}>
        기록 데이터는 사용자 계정 기준으로 분리됩니다.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='email'>
            이메일
          </label>
          <input
            id='email'
            className={styles.input}
            type='email'
            autoComplete='email'
            {...register('email')}
          />
          {errors.email ? (
            <p className={styles.errorText}>{errors.email.message}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='password'>
            비밀번호
          </label>
          <input
            id='password'
            className={styles.input}
            type='password'
            autoComplete='new-password'
            {...register('password')}
          />
          {errors.password ? (
            <p className={styles.errorText}>{errors.password.message}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='confirmPassword'>
            비밀번호 확인
          </label>
          <input
            id='confirmPassword'
            className={styles.input}
            type='password'
            autoComplete='new-password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <p className={styles.errorText}>{errors.confirmPassword.message}</p>
          ) : null}
        </div>

        {formMessage ? <p className={styles.message}>{formMessage}</p> : null}

        <button className={styles.button} type='submit' disabled={isSubmitting}>
          {isSubmitting ? '가입 처리 중...' : '회원가입'}
        </button>
      </form>

      <p className={styles.linkArea}>
        이미 계정이 있다면{' '}
        <Link className={styles.link} to={ROUTES.login}>
          로그인
        </Link>
      </p>
    </section>
  );
}
