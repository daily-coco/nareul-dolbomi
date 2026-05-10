import { LoginForm } from '@/features/auth/ui/LoginForm';
import * as styles from '@/features/auth/ui/AuthForm.css';

export function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
