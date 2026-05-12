import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/shared/api/supabaseClient';
import { fa } from 'zod/locales';

interface UseAuthSessionResult {
  session: Session | null;
  isLoading: boolean;
}

export const useAuthSession = (): UseAuthSessionResult => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }
      if (error) {
        setSession(null);
        setIsLoading(false);
        return;
      }
      setSession(data.session);
      setIsLoading(false);
    };
    void initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);
  return {
    session,
    isLoading,
  };
};
