export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
};
export const validateSupabaseEnv = () => {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error(
      'Supabase 환경 변수가 없습니다. .env.local에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 설정해주세요.'
    );
  }
};
