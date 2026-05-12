import { supabase } from '@/shared/api/supabaseClient';

import type {
  LoginFormValues,
  SignupFormValues,
} from '@/features/auth/model/auth.schemas';

export interface AuthApiResultMessage {
  message: string;
}

/**
 * 이메일 회원가입
 *
 * 주의:
 * Supabase Auth 설정에서 Confirm email이 ON이면,
 * 회원가입 직후 바로 로그인 세션이 생기지 않을 수 있다.
 * 사용자는 이메일 인증 후 로그인하는 흐름으로 안내한다.
 */
export const signUpWithEmail = async (
  valuse: Omit<SignupFormValues, 'confirmPassword'>
): Promise<AuthApiResultMessage> => {
  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/login`
      : undefined;

  const { error } = await supabase.auth.signUp({
    email: valuse.email,
    password: valuse.password,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw new Error(getSafeAuthErrorMessage(error.message));
  }

  return {
    message: '회원가입 요청이 완료되었습니다. 이메일을 확인해 주세요.',
  };
};

/**
 * 이메일 로그인
 */
export const signInWithEmail = async (
  values: LoginFormValues
): Promise<AuthApiResultMessage> => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    throw new Error(getSafeAuthErrorMessage(error.message));
  }

  return {
    message: '로그인되었습니다.',
  };
};

/**
 * 로그아웃
 */
export const signOut = async (): Promise<AuthApiResultMessage> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('로그아웃 중 문제가 발생했습니다.');
  }

  return {
    message: '정상적으로 로그아웃 되었습니다.',
  };
};

/**
 * 현재 세션 조회
 *
 * route guard에서 사용하기 좋다.
 */

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error('인증 상태를 확인하지 못했습니다.');
  }

  return data.session;
};

/**
 * 현재 사용자 조회
 *
 * 세션보다 사용자 정보가 필요할 때 사용한다.
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error('사용자 정보를 확인하지 못했습니다.');
  }

  return data.user;
};

/**
 * Supabase 원본 에러 메시지를 그대로 화면에 노출하지 않기 위한 처리.
 * 보안상 상세 원인은 콘솔/로그에서만 확인하고,
 * 사용자에게는 안전한 문장으로 안내한다.
 */

const getSafeAuthErrorMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  if (
    lowerMessage.includes('invalid login credentials') ||
    lowerMessage.includes('email not confirmed')
  ) {
    return '이메일 또는 비밀번호를 확인해 주세요.';
  }

  if (lowerMessage.includes('user already registered')) {
    return '이미 가입된 이메일입니다.';
  }

  if (lowerMessage.includes('password')) {
    return '비밀번호 조건을 확인해 주세요.';
  }

  return '인증 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
};
