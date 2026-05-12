import { Navigate, Route, Routes } from 'react-router-dom';

import { GuestOnly } from '@/app/routes/guards/GuestOnly';
import { RequireAuth } from '@/app/routes/guards/RequireAuth';
import { ROUTES } from '@/app/routes/paths';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { RecordsListPage } from '@/pages/records/RecordsListPage';
import { CarsSubjectsPage } from '@/pages/care-subjects/CarsSubjectsPage';
function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>기록 웹 애플리케이션</h1>
      <p>Day 2: Supabase 인증과 보안 기반을 준비합니다.</p>
    </main>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />

      <Route element={<GuestOnly />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignupPage />} />
        <Route path={ROUTES.careSubjects} element={<CarsSubjectsPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path={ROUTES.records} element={<RecordsListPage />} />
      </Route>

      <Route path='*' element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
