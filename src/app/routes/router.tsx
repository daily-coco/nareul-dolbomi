import { createBrowserRouter } from 'react-router-dom';
import { AdminPage } from '@/pages/admin/AdminPage';
import { AuthPage } from '@/pages/auth/AuthPage';
import { CommunityListPage } from '@/pages/community/CommunityListPage';
import { HomePage } from '@/pages/home/HomePage';
import { InfoPage } from '@/pages/info/InfoPage';
import { NotificationsPage } from '@/pages/notifications/NotificationsPage';
import { RecordCreatePage } from '@/pages/records/RecordCreatePage';
import { RecordDetailPage } from '@/pages/records/RecordDetailPage';
import { RecordListPage } from '@/pages/records/RecordListPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/records',
    element: <RecordListPage />,
  },
  {
    path: '/records/new',
    element: <RecordCreatePage />,
  },
  {
    path: '/records/:recordId',
    element: <RecordDetailPage />,
  },
  {
    path: '/community',
    element: <CommunityListPage />,
  },
  {
    path: '/notifications',
    element: <NotificationsPage />,
  },
  {
    path: '/info',
    element: <InfoPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
]);
