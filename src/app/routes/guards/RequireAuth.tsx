import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/shared/api/supabaseClient';
import { ROUTES } from '@/app/routes/paths';

type RequireAuthProps = {
  children: ReactNode;
};

type AuthCheckStatus = 'loading' | 'authenticated' | 'unauthenticated';

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const [status, setStatus] = useState<AuthCheckStatus>('loading');

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error || !data.session) {
        setStatus('unauthenticated');
        return;
      }

      setStatus('authenticated');
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      setStatus(session ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === 'loading') {
    return <div>로그인 상태를 확인하는 중입니다.</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
};
