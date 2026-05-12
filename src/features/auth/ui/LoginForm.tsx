import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInWithEmail } from '@/features/auth/api/auth.api';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/model/auth.schemas';
import * as styles from '@/features/auth/ui/AuthForm.css';
import { ROUTES } from '@/app/routes/paths';

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const locationState = location.state as LocationState | null;
  const redirectPath = locationState?.from?.pathname ?? ROUTES.records;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormMessage(null);

    try {
      await signInWithEmail(values);
      navigate(redirectPath, { replace: true });
    } catch {
      setFormMessage('이메일 또는 비밀번호를 확인해 주세요.');
    }
  };
  return (
    <section className={styles.card} aria-labelledby='login-title'>
      <h1 id='login-title' className={styles.title}>
        로그인
      </h1>

      <p className={styles.description}>
        기록은 로그인한 사용자 본인만 접근할 수 있도록 관리합니다.
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
            autoComplete='current-password'
            {...register('password')}
          />
          {errors.password ? (
            <p className={styles.errorText}>{errors.password.message}</p>
          ) : null}
        </div>

        {formMessage ? <p className={styles.message}>{formMessage}</p> : null}

        <button className={styles.button} type='submit' disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p className={styles.linkArea}>
        아직 계정이 없다면{' '}
        <Link className={styles.link} to={ROUTES.signup}>
          회원가입
        </Link>
      </p>
    </section>
  );
}
