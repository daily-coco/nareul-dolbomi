import { signOut } from '@/features/auth/api/auth.api';

export function RecordsListPage() {
  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>기록 목록</h1>
      <p>로그인한 사용자만 접근할 수 있는 보호 페이지입니다.</p>

      <button type='button' onClick={handleSignOut}>
        로그아웃
      </button>
    </main>
  );
}
