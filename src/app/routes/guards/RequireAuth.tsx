import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/app/routes/paths';
import { useAuthSession } from '@/features/auth/hooks/useAuthSession';

export function RequireAuth() {
  const location = useLocation();
  const { session, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <main>
        <p role='status'>인증 상태를 확인하는 중입니다.</p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
