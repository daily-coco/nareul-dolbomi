# 토이 프로젝트 - 기록 웹 애플리케이션

기록 작성과 관리를 중심으로 하는 React 기반 웹 애플리케이션입니다.  
사용자가 일상, 생활 기록 등을 작성하고 관리할 수 있는 구조를 목표로 합니다.
기록 데이터를 PDF로 묶어 출력할 수 있도록 확장할 예정입니다.

---

## 기술 스택

| 항목                | 버전       | 사용 목적                      |
| ------------------- | ---------- | ------------------------------ |
| **React**           | `^19.2.5`  | UI 컴포넌트 기반 화면 구성     |
| **Vite**            | `^8.0.10`  | 빠른 개발 서버 및 빌드 도구    |
| **TypeScript**      | `~6.0.2`   | 정적 타입 기반 개발            |
| **Vanilla Extract** | `^1.20.1`  | 타입 안전한 CSS-in-TS 스타일링 |
| **Supabase**        | `^2.105.4` | 인증, 데이터베이스, 스토리지   |
| **TanStack Query**  | `^5.100.9` | 서버 상태 관리                 |
| **Zustand**         | `^5.0.13`  | UI 화면 상태 관리              |
| **React Hook Form** | `^7.75.0`  | 폼 상태 관리                   |
| **Zod**             | `^4.4.3`   | 입력값 스키마 검증             |

---

## 핵심 기능 계획

- 홈
- 회원가입
- 로그인
- 기록 목록 / 상세 / 작성(수정, 삭제)
- 사진 업로드
- 커뮤니티
- 알림 메세지함
- 광고 배너
- 정보 제공 페이지
- 관리자 페이지

---

## 개발 기준

이 프로젝트는 기록 데이터, 사진, 알림, 권한 정보를 다룰 수 있으므로 보안을 가장 중요한 기준으로 둡니다.

## 보안 원칙

- 프론트엔드 UI만으로 보안을 처리하지 않는다.
- Supabase RLS를 기준으로 권한을 설계한다.
- `service_role key`를 프론트엔드에 절대 노출하지 않는다.
- 기록 본문, 사진 URL, 개인정보성 데이터는 `localStorage`에 저장하지 않는다.
- Zustand persist는 폰트 크기, UI 옵션 같은 비민감 정보에만 사용한다.
- Supabase Storage는 private bucket을 기본으로 설계한다.
- 관리자 페이지는 UI guard뿐 아니라 DB/RLS/RPC/Edge Function에서 권한을 검증한다.
- XSS, 입력값 검증, 파일 업로드 검증을 항상 고려한다.
- 비용이 발생하지 않는 개발 방식을 우선한다.

---

## 프로젝트 구조

```txt
src/
├─ app/
│  ├─ providers/
│  ├─ routes/
│  └─ App.tsx
├─ pages/
│  ├─ home/
│  ├─ auth/
│  ├─ records/
│  ├─ community/
│  ├─ notifications/
│  ├─ info/
│  ├─ admin/
│  └─ settings/
├─ features/
│  ├─ auth/
│  ├─ record-create/
│  ├─ record-photo-upload/
│  ├─ community-write/
│  ├─ community-like/
│  ├─ notification-read/
│  ├─ ad-management/
│  └─ pdf-export/
├─ entities/
│  ├─ profile/
│  ├─ care-subject/
│  ├─ record/
│  ├─ record-photo/
│  ├─ community-post/
│  ├─ notification/
│  └─ ad-banner/
└─ shared/
   ├─ api/
   ├─ config/
   ├─ lib/
   ├─ stores/
   ├─ styles/
   └─ ui/
```

## 로컬 실행 방법

1. 패키지 설치

```
  npm install
```

2. 환경 변수 설정
   .env.local.example 파일을 참고하여 .env.local 파일을 생성합니다.

```
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
```

🚨 주의: `service_role key`는 절대 프론트엔드 환경 변수에 넣지 않습니다.

3. 개발 서버 실행

```
   npm run dev
```

## 환경 변수

- VITE_SUPABASE_URL : Supabase 프로젝트 URL ➡️ 프론트 노출 가능✅
- VITE_SUPABASE_ANON_KEY : Supabase anon key ➡️ 프론트 노출 가능✅
- SUPABASE_SERVICE_ROLE_KEY : Supabase service role key ➡️ 프론트 노출 금지❌

## 상태 관리 기준

### TanStack Query

서버 상태 관리에만 사용합니다.

예시:

- 기록 목록/상세 조회
- 알림 목록 조회
- 커뮤니티 글 조회
- 광고 배너 조회

### Zustand

화면 상태 관리에만 사용합니다.

예시:

- 폰트 크기
- 테마
- 모달 열림 여부
- 사이드바 상태

🚨 민감한 기록 데이터, 사진 URL, PDF URL, 개인정보는 Zustand persist에 저장하지 않습니다.

## Git 커밋 컨벤션 초안

feat: 새로운 기능 추가
fix: 버그 수정
chore: 설정, 패키지, 빌드 관련 작업
docs: 문서 수정
style: 스타일 코드 수정
refactor: 리팩토링
test: 테스트 추가 또는 수정
