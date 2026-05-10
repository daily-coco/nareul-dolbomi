import { createClient } from '@supabase/supabase-js';

import { env } from '@/shared/config/env';
import type { Database } from '@/shared/api/database.types';

const getAuthStorage = (): Storage | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.sessionStorage;
};

export const supabase = createClient<Database>(
  env.supabaseUrl,
  env.supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: getAuthStorage(),
    },
  }
);
