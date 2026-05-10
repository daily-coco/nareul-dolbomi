import { supabase } from '@/shared/api/supabaseClient';

export const checkSupabaseConnection = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('[Supabase] connection failed:', error.message);
    return {
      ok: false,
      message: error.message,
    };
  }

  console.info('[Supabase] connection success:', {
    hasSession: Boolean(data.session),
  });

  return {
    ok: true,
    hasSession: Boolean(data.session),
  };
};
