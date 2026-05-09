# 기록 웹 애플리케이션 보안 기준

## 절대 하지 않을 것

- service_role key를 프론트엔드에 노출하지 않는다.
- 기록 본문을 localStorage에 저장하지 않는다.
- 사진 URL을 localStorage에 저장하지 않는다.
- PDF URL을 localStorage에 저장하지 않는다.
- 개인정보성 데이터를 Zustand persist에 저장하지 않는다.
- 관리자 페이지를 UI guard만으로 보호하지 않는다.
- Supabase Storage public bucket에 사용자 사진을 저장하지 않는다.

## 반드시 지킬 것

- Supabase DB 테이블은 RLS를 기준으로 권한을 설계한다.
- 사용자는 본인 소유 데이터만 접근 가능해야 한다.
- 관리자 권한은 DB/RLS/RPC/Edge Function 레벨에서 검증한다.
- 파일 업로드 시 MIME type, 확장자, 용량을 검증한다.
- 사용자가 입력한 HTML은 그대로 렌더링하지 않는다.
- 커뮤니티 본문 출력 시 XSS를 고려한다.
- PDF export는 접근 권한 확인 후 생성한다.

## Zustand persist 허용 범위

허용:

- 폰트 크기
- 테마
- 사이드바 상태
- UI 옵션

금지:

- 기록 본문
- 사진 URL
- PDF URL
- 사용자 개인정보
- 권한 정보
- 인증 토큰
