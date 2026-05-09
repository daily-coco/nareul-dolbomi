import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, validateSupabaseEnv } from '@/shared/config/env';
let supabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  validateSupabaseEnv();

  supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      /**
       * 보안 우선 MVP 기준:
       * 브라우저 localStorage에 Supabase 세션을 오래 보관하지 않기 위해 false로 시작한다.
       *
       * 단점:
       * 새로고침 시 로그인 유지 UX가 약해질 수 있다.
       *
       * 나중에 "로그인 유지" 기능이 필요하면 보안 위험을 다시 검토하고 변경한다.
       */
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return supabaseClient;
};
