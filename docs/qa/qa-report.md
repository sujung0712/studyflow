# StudyFlow QA 및 보안 감사 리포트

- **작성자**: Agent D (`agent-d-qa`, 전체 코드 검증·기능 테스트·품질 및 보안 감사 담당)
- **검증 대상**: `C:\Users\MJC\Desktop\studyflow` (Agent A + Agent B + Agent C 통합 코드베이스, `swarm-qa`)
- **검증 기준 문서**: `README.md`, `DESIGN.md`, `AGENTS.md`
- **최초 감사 / 최종 재검증 일자**: 2026-11-23 (수정 후 재검증 완료)

---

## 1. 종합 요약 (Executive Summary)

### 최종 종합 판정: **PASS (통과 — PR 생성 및 병합 가능)**

초기 감사에서 식별된 **High 2건(`QA-001`, `QA-002`)** 및 **Medium 4건(`QA-003`~`QA-006`)** 전부가 Agent A·B·C에 의해 수정되었으며, Agent D가 수정된 전체 파일과 `Next.js 14.2.35` 기반 `typecheck`·`lint`·`build`를 직접 재검증하여 **모든 Critical·High·Medium 이슈 해결(미해결 0건)**을 확인했습니다.

현재 남아 있는 항목은 기능·보안·접근성 차단 요인이 아닌 **Low 7건(선택 개선 및 후속 백로그)** 뿐입니다.

### 심각도별 이슈 현황 (최종 재검증 기준)

| 심각도 | 최초 발견 | 수정 완료 | 잔여 미해결 | 비고 |
| --- | :---: | :---: | :---: | --- |
| **Critical** | 0 | 0 | **0** | 없음 |
| **High** | 2 | 2 (`QA-001`, `QA-002`) | **0** | 전원 해결 확인 |
| **Medium** | 4 | 4 (`QA-003`~`QA-006`) | **0** | 전원 해결 확인 |
| **Low** | 7 | 0 | **7** (`QA-007`~`QA-013`) | 선택 개선 / 후속 백로그 |
| **합계** | **13** | **6** | **7 (Low 전용)** | **최종 PASS** |

### 영역별 Pass / Fail 매트릭스 (재검증 반영)

| 검증 영역 | 최초 판정 | 최종 판정 | 요약 근거 |
| --- | :---: | :---: | --- |
| **TypeScript 타입 검사 (`typecheck`)** | PASS | **PASS** | `tsc --noEmit` 오류 0건 |
| **ESLint 정적 분석 (`lint`)** | PASS | **PASS** | `next lint` 경고·오류 0건 |
| **Next.js 프로덕션 빌드 (`build`)** | PASS | **PASS** | `Next.js 14.2.35`, 8/8 라우트 정상 빌드 (`First Load JS` 88.1~106 kB) |
| **기술 스택 및 폴더 구조 (`AGENTS.md`)** | PASS | **PASS** | Next.js App Router, Tailwind CSS, JSON Mock Data, `app/`·`components/`·`data/` 준수 |
| **데이터 정합성 (`data/mockData.json`)** | PASS | **PASS** | 4과목·9과제·6질문 참조 무결성 및 진도율(`completedLessons/totalLessons`) 100% 일치 |
| **데스크톱 레이아웃 및 핵심 3색 (`DESIGN.md`)** | PASS | **PASS** | 240px 사이드바(`hidden md:flex`), 64px 헤더(`h-16`), 핵심 3색 적용 |
| **모바일/좁은 뷰포트 반응형 레이아웃** | FAIL | **PASS** | `AppShell` + 모바일 `< md` 오버레이 드로어·햄버거 버튼·ESC/배경/라우트 닫힘 구현 (`QA-001` 해결) |
| **전체 화면 기능 및 라우팅** | PARTIAL | **PASS** | 7개 화면 동작·필터·정렬·하이드레이션 안전·`notFound()` HTTP 404(`QA-003`)·기한초과/날짜검증(`QA-004`) 완료 |
| **웹 접근성 (WCAG AA / ARIA)** | FAIL | **PASS** | `#10B981` 텍스트 전원 `#047857`(5.48:1) 전환(`QA-005`), 필터 `role="group"`+`aria-pressed` 전환(`QA-006`) |
| **보안 감사 (민감정보·XSS)** | PASS | **PASS** | 비밀번호/API 키/토큰 하드코딩 0건, XSS 벡터 0건, `.gitignore` 적정 |
| **의존성 보안 감사 (`package.json`)** | FAIL | **PASS** | `next@14.2.35` / `eslint-config-next@14.2.35` 업그레이드 완료 (`QA-002` 해결) |

---

## 2. 최종 명령어 검증 결과 (`Next.js 14.2.35`)

`C:\Users\MJC\Desktop\studyflow`에서 수정 반영 후 샌드박스 내 읽기 전용 명령어로 재실행한 결과입니다.

### 2.1 `npm.cmd run typecheck` — **PASS**
```text
> studyflow@0.1.0 typecheck
> tsc --noEmit
(Exit code: 0)
```

### 2.2 `npm.cmd run lint` — **PASS**
```text
> studyflow@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
(Exit code: 0)
```

### 2.3 `npm.cmd run build` — **PASS**
```text
> studyflow@0.1.0 build
> next build

  ▲ Next.js 14.2.35

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (8/8)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                              Size     First Load JS
┌ ○ /                                    202 B          99.8 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /courses                             5.35 kB         105 kB
├ ƒ /courses/[id]                        202 B          99.8 kB
├ ○ /dashboard                           5.38 kB         105 kB
├ ○ /questions                           5.99 kB         106 kB
├ ○ /tasks                               5.71 kB         105 kB
└ ƒ /tasks/[id]                          202 B          99.8 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/117-b74c3899e29d85d7.js       31.7 kB
  ├ chunks/fd9d1056-2182e078483b259b.js  53.6 kB
  └ other shared chunks (total)          1.89 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
(Exit code: 0)
```

---

## 3. 수정 후 재검증 결과 (`QA-001` ~ `QA-006`)

| 이슈 ID | 심각도 | 담당 | 최종 상태 | 재검증 확인 내용 |
| --- | :---: | --- | :---: | --- |
| **`QA-001`** | High | Agent A | **해결됨 (Verified)** | `components/AppShell.tsx` 신설, `app/layout.tsx` 연동. 데스크톱 `hidden md:flex w-[240px]` 유지, 모바일 `< md`에서 `Header` 햄버거 버튼(`aria-expanded`, `aria-controls="mobile-sidebar"`) + 슬라이드 드로어(`role="dialog"`, `aria-modal="true"`, 배경 클릭·닫기 버튼·`Escape` 키·`pathname` 변경 시 자동 닫힘) 적용 확인. |
| **`QA-002`** | High | Agent A / Coordinator | **해결됨 (Verified)** | `package.json`의 `next` 및 `eslint-config-next`를 `14.2.25` → **`14.2.35`**로 업그레이드(`CVE-2025-55184`, `CVE-2025-67779`, `CVE-2025-48068` 패치 반영) 및 `Next.js 14.2.35` 빌드 성공 확인. *(단, `eslint@8.57.1` EOL은 `eslint-config-next@14.x` 호환성을 고려해 후속 Next.js 15 / ESLint 9 마이그레이션 백로그로 유지)* |
| **`QA-003`** | Medium | Agent C | **해결됨 (Verified)** | `app/courses/[id]/page.tsx` 및 `app/tasks/[id]/page.tsx`에서 존재하지 않는 ID 요청 시 `next/navigation`의 `notFound()` 호출 확인. `app/courses/[id]/not-found.tsx`, `app/tasks/[id]/not-found.tsx` 신설로 한국어 안내 UI와 HTTP 404 상태 코드 모두 충족. |
| **`QA-004`** | Medium | Agent A / B / C | **해결됨 (Verified)** | `data/index.ts` `parseUtcDate()`에 `ISO_DATE_PATTERN` 정규식 및 UTC 월·일 롤오버 검증 추가(비정상 날짜 시 `"일정 미정"` 반환). `app/page.tsx` `todayTasks`가 `task.dueDate <= TODAY_DATE || task.status === "진행 중"`으로 기한 초과 미완료 과제 포함. `components/TaskItem.tsx` 및 `app/tasks/[id]/page.tsx`에서 `"완료"` 과제는 `"완료됨"`(`text-[#047857]`)으로 표기하고 미완료 `"오늘 마감"`/`"마감 지남"`을 명확히 강조 확인. |
| **`QA-005`** | Medium | Agent A / B / C | **해결됨 (Verified)** | 전체 `app/`·`components/` 전수 스캔 결과 `text-[#10B981]`은 그래픽 아이콘에만 남아 있으며, 모든 Emerald 텍스트(`StatusBadge`, `ProgressBar`, `Sidebar`, `TaskItem`, `Home`, `Dashboard`, `Courses`, `CourseDetail`, `Tasks`, `TaskDetail`, `Questions`, `QuestionListView`)가 `text-[#047857]`(흰 배경 대비 5.48:1, WCAG AA 통과)으로 교체됨을 확인. |
| **`QA-006`** | Medium | Agent B / C | **해결됨 (Verified)** | 전체 코드베이스 스캔 결과 `role="tablist"`, `role="tab"`, `aria-selected` 잔존 0건. `UpcomingTasksPanel`, `CourseListView`, `TaskListView`, `QuestionListView` 4개 컴포넌트 모두 `role="group"` + 설명적 `aria-label` + 버튼별 `aria-pressed` 패턴으로 교체 확인. |

---

## 4. 기준 문서 준수 점검 (`README.md`, `DESIGN.md`, `AGENTS.md`)

| 항목 | 기준 명세 | 구현 현황 | 결과 |
| --- | --- | --- | :---: |
| 프레임워크/스타일 | Next.js (App Router) + Tailwind CSS | Next.js 14.2.35 App Router, Tailwind CSS 3.4.17, TypeScript strict 모드 | PASS |
| 데이터 소스 | `data/` 로컬 JSON Mock Data | `data/mockData.json`(4과목·9과제·6질문), `data/types.ts`, `data/index.ts` | PASS |
| 디렉터리 구조 | `app/`, `components/`, `data/` 분리 | 공통 UI(`components/`), 화면별 하위 컴포넌트(`components/{dashboard,courses,tasks,questions}/`), 라우트(`app/`) | PASS |
| 공통 레이아웃 | Sidebar `240px`, Header `64px`, 반응형 Main | 데스크톱 `w-[240px]`·`h-16` 고정 + 모바일 `< md` 드로어 전환 지원 | PASS |
| 핵심 3색 | `#2563EB`, `#10B981`, `#1E293B` + `#FFFFFF`/`#F8FAFC` | 핵심 3색 적용 및 Emerald 텍스트 `#047857` 명도 보정으로 접근성 충족 | PASS |
| 3단계 상태 체계 | `시작 전` / `진행 중` / `완료` | `StudyStatus` 타입 및 `StatusBadge` 3상태 일관 적용 | PASS |
| 공통 컴포넌트 | `CourseCard`, `ProgressBar`, `TaskItem` | 모두 `components/`에 구현 및 재사용 (`Dashboard` 인라인 카드는 Low `QA-009` 참고) | PASS |
| 한국어 카피라이팅 | 간결하고 명확한 한국어 문구 | `"오늘 마감"`, `"마감 N일 전"`, `"완료됨"`, `"해당 조건의 과제가 없습니다."` 등 기준 부합 | PASS |
| React 하이드레이션 안전 | SSR/CSR 결과 일치 | `new Date()`/`Math.random()` 미사용, 고정 `TODAY_DATE = "2026-11-23"` 사용으로 하이드레이션 불일치 위험 없음 | PASS |

---

## 5. 화면별 기능 테스트 체크리스트 (최종)

### 5.1 공통 내비게이션 (`AppShell`, `Sidebar`, `Header`)
- [x] 5개 메뉴(`Home` `/`, `Dashboard` `/dashboard`, `Courses` `/courses`, `Tasks` `/tasks`, `Questions` `/questions`) 정상 링크 및 `aria-current="page"` 적용
- [x] 동적 경로 활성 강조: `/courses/[id]` → `Courses` 활성, `/tasks/[id]` → `Tasks` 활성
- [x] 동적 경로 헤더 제목: `/courses/[id]` → `Course Detail`, `/tasks/[id]` → `Task Detail`, 미매칭 경로 → `StudyFlow`
- [x] 모바일/좁은 뷰포트(`< md`): `Header` 햄버거 버튼 + 오버레이 드로어(배경·닫기·ESC·라우트 이동 닫힘) 정상 (`QA-001` 해결)

### 5.2 Home (`/`, `app/page.tsx`)
- [x] 상단 요약 카드 4종(전체 진행률 `65%` · `41/66강`, 오늘 마감 과제 `2건`, 진행 중인 강의 `3개`, 미해결 질문 `4건`) 및 대상 페이지 링크 정상
- [x] "오늘 할 일" 섹션: 미완료 과제 중 기한 초과·오늘 마감(`dueDate <= TODAY_DATE`) 또는 진행 중 과제 마감일순 정렬 및 `TaskItem` 렌더링 정상 (`QA-004` 해결)
- [x] "진행 중인 강의" 섹션: `progress < 100`인 3개 과목을 `CourseCard`(과제 수·질문 수 포함)로 표시
- [x] 빈 목록 폴백 UI 및 `/dashboard` 빠른 이동 배너 정상

### 5.3 Dashboard (`/dashboard`, `app/dashboard/page.tsx`, `UpcomingTasksPanel.tsx`)
- [x] 전체 학습 진행률 히어로 카드(`65%`, `41 / 66강`, `1 / 4과목`, `ProgressBar`) 및 핵심 KPI 카드 4종 수치 정확
- [x] 과목별 학습 진행률 4과목 표시, 미완료/전체 과제 수 집계 및 `/courses/[id]` 링크 정상
- [x] 과제 상태 요약(`시작 전` 3건·33% / `진행 중` 3건·33% / `완료` 3건·33%) 누적 바 및 개별 `StatusBadge` 정상
- [x] 다가오는 과제(`UpcomingTasksPanel`): 미완료 6건 마감일순 정렬, `role="group"`+`aria-pressed` 필터(`전체`·`진행 중`·`시작 전`) 및 빈 상태 UI 정상 (`QA-005`, `QA-006` 해결)

### 5.4 Courses (`/courses`, `app/courses/page.tsx`, `CourseListView.tsx`)
- [x] 상단 요약 지표 3종(총 수강 강의 `4과목`, 평균 진행률 `65%`, 완료 강의 `1과목`) 정확
- [x] 상태 필터(`전체(4)`·`진행 중(3)`·`완료(1)`) `role="group"`+`aria-pressed` 적용 및 표시 건수 동기화 정상 (`QA-005`, `QA-006` 해결)
- [x] `CourseCard` 렌더링, `/courses/[id]` 링크 및 빈 상태 초기화 버튼 정상

### 5.5 Course Detail (`/courses/[id]`, `app/courses/[id]/page.tsx`, `not-found.tsx`)
- [x] 유효 ID(`course-1`~`course-4`): 브레드크럼, 학기·학점·상태 배지, 설명, 교수자·시간표·완료 차시, `ProgressBar` 정상
- [x] 연결된 과제(`TaskItem`, 마감일순) 및 연결된 질문(최신순, `answer` 미리보기) 정상, 빈 목록 폴백 확인
- [x] 잘못된 ID(`/courses/invalid-id`): `notFound()` 호출 + `not-found.tsx`로 HTTP 404 및 한국어 안내 화면 반환 (`QA-003` 해결)

### 5.6 Tasks (`/tasks`, `app/tasks/page.tsx`, `TaskListView.tsx`)
- [x] 상단 요약 지표 3종(전체 `9개`, 진행 중 `3개`, 완료 `3개`) 정확
- [x] 상태 필터(`role="group"`+`aria-pressed`) + 강의별 드롭다운 교차 필터링 및 동적 카운트 재계산 정상 (`QA-005`, `QA-006` 해결)
- [x] 마감일 오름차순 정렬, `TaskItem` 완료/오늘 마감/기한 초과 라벨 표시 및 필터 초기화 정상 (`QA-004` 해결)

### 5.7 Task Detail (`/tasks/[id]`, `app/tasks/[id]/page.tsx`, `not-found.tsx`)
- [x] 유효 ID(`task-1`~`task-9`): 브레드크럼, `StatusBadge`, 우선순위 배지, 마감일 및 완료/긴급 상태 라벨, 과제 설명 정상 (`QA-004`, `QA-005` 해결)
- [x] 우측 연결된 강의 카드(`ProgressBar`, `/courses/[id]` 링크) 및 하단 "같은 강의의 다른 과제" 목록 정상
- [x] 잘못된 ID(`/tasks/invalid-id`): `notFound()` 호출 + `not-found.tsx`로 HTTP 404 및 한국어 안내 화면 반환 (`QA-003` 해결)

### 5.8 Questions (`/questions`, `app/questions/page.tsx`, `QuestionListView.tsx`)
- [x] 상단 요약 지표 3종(전체 `6개`, 미해결 `4개`, 해결 완료 `2개`) 정확
- [x] 상태 필터(`role="group"`+`aria-pressed`) + 강의별 드롭다운 교차 필터링 및 최신 등록순 정렬 정상 (`QA-005`, `QA-006` 해결)
- [x] 과목 배지 `/courses/[courseId]` 링크, `answer` 답변 정리 박스(`text-[#047857]`) 및 빈 상태 초기화 정상

---

## 6. 잔여 참고 항목 (Low — 7건, 후속 개선 백로그)

아래 항목은 PR 생성을 차단하지 않는 경미한 개선 사항입니다.

- **`[QA-007]` [Low / 디자인]** `Sidebar` 하단 `2026-2 학기 · 진행 중` 점(`#10B981`)과 `Home` `"진행 중인 강의"` 아이콘(`#10B981`)을 `DESIGN.md` `진행 중` 기준색(`#2563EB`)으로 통일 검토 (`components/Sidebar.tsx`, `app/page.tsx`).
- **`[QA-008]` [Low / 기능·디자인]** `/tasks` 페이지에서도 헤더 우측 `"과제 보기"` 버튼이 `/tasks`로 자기 참조됨 — `/tasks`에서는 숨기거나 타 경로 바로가기로 분기 검토 (`components/Header.tsx`).
- **`[QA-009]` [Low / 품질·디자인]** `app/dashboard/page.tsx`가 공통 `CourseCard` 대신 인라인 과목 카드를 별도 구현함; `tailwind.config.ts`의 `neutral: "#1E293B"`가 기본 `neutral-*` 팔레트를 덮어쓰므로 `brand-neutral` 등으로 명칭 분리 검토.
- **`[QA-010]` [Low / 기능]** `progress === 0` 강의의 `"시작 전"` 분류를 `CourseListView`·`Home`·`Dashboard`와 `CourseDetail` 간 공통 헬퍼로 통일하고, `ProgressBar`에 `Number.isFinite(value)` 방어 추가 검토.
- **`[QA-011]` [Low / 품질·접근성]** `/dashboard`, `/courses/[id]`, `/tasks/[id]` 페이지별 `metadata`/`generateMetadata` 추가, `/courses`·`/questions`의 `h1`→`h3` 건너뜀 보완, `UpcomingTasksPanel` 비활성 필터 숫자(`text-slate-400`)를 `text-slate-500`으로 상향 및 주요 링크/버튼에 `focus-visible:ring-2` 보강 검토.
- **`[QA-012]` [Low / 품질]** 중복 로직(`averageProgress` 계산, `"2026-2 학기"` 상수, `TaskListView`/`QuestionListView` 필터 툴바)의 공통화 및 `.gitattributes`를 통한 CRLF/LF 줄바꿈 통일, 향후 Next.js 15 + ESLint 9(현 `eslint@8.57.1` EOL) 마이그레이션 계획 수립.
- **`[QA-013]` [Low / 보안]** 프로덕션 배포 시 `next.config.mjs` `headers()`에 `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` 보안 응답 헤더 추가 권장.

---

## 7. 보안 감사 최종 확인 (`AGENTS.md` 규칙 9)

| 보안 점검 항목 | 최종 결과 | 근거 |
| --- | :---: | --- |
| 비밀번호·API 키·토큰·개인키 하드코딩 | **이상 없음 (0건)** | `app/`, `components/`, `data/` 및 설정 파일 전수 스캔 결과 민감정보 미검출 |
| 환경변수(`.env*`) 커밋 방지 | **적정** | `.gitignore`에 `.env`, `.env*`, `node_modules/`, `.next/` 등록 확인 |
| XSS / 안전하지 않은 HTML 렌더링 | **이상 없음 (0건)** | `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `javascript:` URL 미사용 |
| 외부 링크 / Open Redirect 위험 | **이상 없음** | 모든 링크가 내부 Next.js `Link` 경로만 사용 |
| 프레임워크 보안 패치 (`package.json`) | **통과** | `next@14.2.35` / `eslint-config-next@14.2.35` 적용 완료 (`CVE-2025-29927`, `CVE-2025-48068`, `CVE-2025-55184`, `CVE-2025-67779` 패치 포함) |
