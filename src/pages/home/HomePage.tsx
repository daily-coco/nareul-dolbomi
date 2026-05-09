import { Link } from 'react-router-dom';
import { PagePlaceholder } from '@/shared/ui/PagePlaceholder';

export const HomePage = () => {
  return (
    <PagePlaceholder
      title='기록 웹 애플리케이션'
      description='기록 작성, 기록 목록, 사진 업로드, 알림, PDF 출력을 위한 보안 중심 웹앱입니다.'
    >
      <nav style={{ marginTop: '1rem', display: 'grid', gap: '0.5rem' }}>
        <Link to='/records'>기록 목록</Link>
        <Link to='/records/new'>기록 작성</Link>
        <Link to='/community'>커뮤니티</Link>
        <Link to='/notifications'>알림 메세지함</Link>
        <Link to='/settings'>설정</Link>
      </nav>
    </PagePlaceholder>
  );
};
