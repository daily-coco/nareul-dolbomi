import { useState } from 'react';

import { checkSupabaseConnection } from '@/shared/api/checkSupabaseConnection';

export function SupabaseCheck() {
  const [message, setMessage] = useState('아직 연결 확인 전입니다.');

  const handleCheckConnection = async () => {
    const result = await checkSupabaseConnection();

    if (result.ok) {
      setMessage(
        result.hasSession
          ? 'Supabase 연결 성공: 로그인 세션이 있습니다.'
          : 'Supabase 연결 성공: 아직 로그인 세션은 없습니다.'
      );
      return;
    }

    setMessage(`Supabase 연결 실패: ${result.message}`);
  };

  return (
    <aside style={{ padding: '2rem' }}>
      <strong>기록 웹 애플리케이션</strong>
      <p>Day 2: Supabase 연결 확인</p>

      <button type='button' onClick={handleCheckConnection}>
        Supabase 연결 확인
      </button>

      <p>{message}</p>
    </aside>
  );
}
