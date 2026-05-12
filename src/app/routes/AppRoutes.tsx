// src/app/routes/AppRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom';

import { GuestOnly } from '@/app/routes/guards/GuestOnly';
import { RequireAuth } from '@/app/routes/guards/RequireAuth';
import { ROUTES } from '@/app/routes/paths';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { CareSubjectsPage } from '@/pages/care-subjects/CarsSubjectsPage';
import { RecordsCreatePage } from '@/pages/records/RecordsCreatePage';
import { RecordsListPage } from '@/pages/records/RecordsListPage';

function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>기록 웹 애플리케이션</h1>
      <p>Day 4: records 기본 CRUD와 care_subject 선택 연결을 진행합니다.</p>
    </main>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />

      <Route
        path={ROUTES.login}
        element={
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        }
      />

      <Route
        path={ROUTES.signup}
        element={
          <GuestOnly>
            <SignupPage />
          </GuestOnly>
        }
      />

      <Route
        path={ROUTES.careSubjects}
        element={
          <RequireAuth>
            <CareSubjectsPage />
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.records}
        element={
          <RequireAuth>
            <RecordsListPage />
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.recordsNew}
        element={
          <RequireAuth>
            <RecordsCreatePage />
          </RequireAuth>
        }
      />

      <Route path='*' element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
