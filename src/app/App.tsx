import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@/app/providers/AppProviders';
import { router } from '@/app/routes/router';
import * as styles from '@/app/App.css';
import { themeClass } from '@/shared/styles/theme.css';
export const App = () => {
  return (
    <AppProviders>
      <div className={`${themeClass} ${styles.appShell}`}>
        <main className={styles.main}>
          <RouterProvider router={router} />
        </main>
      </div>
    </AppProviders>
  );
};
