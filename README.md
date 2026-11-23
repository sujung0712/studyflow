# StudyFlow

대학생이 수강 중인 강의의 진행률, 과제, 학습 질문을 한곳에서 체계적으로 관리할 수 있는 학습관리 웹 애플리케이션입니다.

## 1. 프로젝트 개요

StudyFlow는 학기 중 여러 과목을 동시에 수강하는 대학생의 학습 흐름을 단순화하는 것을 목표로 합니다.

- **강의 관리**: 수강 과목 목록과 과목별 학습 진행률을 시각적으로 확인합니다.
- **과제 관리**: 과목별 과제의 마감일과 진행 상태(시작 전, 진행 중, 완료)를 추적합니다.
- **질문 관리**: 학습 중 생긴 질문과 해결 여부를 기록하고 복습에 활용합니다.
- **학습 요약**: 대시보드에서 전체 진행 현황과 우선 처리해야 할 항목을 한눈에 파악합니다.

## 2. 기술 스택

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Data**: JSON Mock Data (백엔드 연동 없이 로컬 JSON 데이터 사용)

## 3. 디렉터리 구조

```text
studyflow/
├── app/          # Next.js App Router 기반 페이지 및 공통 레이아웃
├── components/   # 재사용 가능한 UI 공통 컴포넌트 (CourseCard, ProgressBar, TaskItem 등)
├── data/         # 강의, 과제, 질문 목업 데이터를 담은 JSON 파일
├── README.md     # 프로젝트 문서
└── DESIGN.md     # 화면, 레이아웃, 컴포넌트, 데이터, 디자인 기준 문서
```

## 4. 설치 방법

```bash
npm install
```

## 5. 실행 방법

개발 서버를 실행합니다.

```bash
npm run dev
```

실행 후 브라우저에서 `http://localhost:3000`으로 접속합니다.

## 6. 환경변수

현재 단계에서는 로컬 JSON Mock Data를 사용하므로 별도의 환경변수 설정이 필요하지 않습니다.

## 7. 아키텍처

StudyFlow는 **페이지(`app/`) — 공통 컴포넌트(`components/`) — 데이터(`data/`)**의 단방향 흐름으로 구성됩니다.

```text
data/ (JSON Mock Data: courses[], tasks[], questions[])
        │
        ▼
app/ (페이지 및 레이아웃: Home, Courses, Course Detail, Tasks, Questions, Dashboard)
        │  props 전달
        ▼
components/ (공통 컴포넌트: CourseCard, ProgressBar, TaskItem 등)
```

- **공통 레이아웃 (`app/layout`)**: 240px 고정 사이드바와 64px 상단 헤더를 모든 화면에서 일관되게 유지합니다.
- **페이지 (`app/`)**: `data/`의 목업 데이터를 불러와 각 화면 목적에 맞게 필터링·집계한 뒤 공통 컴포넌트에 전달합니다.
- **공통 컴포넌트 (`components/`)**:
  - `CourseCard`: `Home`, `Courses`, `Dashboard` 화면에서 과목 요약과 진행률을 표시합니다.
  - `ProgressBar`: `CourseCard`, `Course Detail`, `Dashboard`에서 학습 진도율을 시각화합니다.
  - `TaskItem`: `Home`, `Course Detail`, `Tasks`, `Dashboard`에서 과제 상태와 마감 정보를 일관된 형태로 렌더링합니다.
