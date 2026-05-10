import { SignupForm } from '@/features/auth/ui/SignupForm';
import * as styles from '@/features/auth/ui/AuthForm.css';

export function SignupPage() {
  return (
    <main className={styles.page}>
      <SignupForm />
    </main>
  );
}
