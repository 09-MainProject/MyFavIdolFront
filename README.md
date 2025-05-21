# Wistar – 아이돌 스케줄 관리 플랫폼

> Wistar는 다양한 아이돌의 공식 일정을 한눈에 확인하고, 관심 있는 아이돌을 팔로우할 수 있는 웹 애플리케이션입니다.  
> 본 프로젝트는 프론트엔드와 백엔드로 나뉘어 팀 협업으로 진행되었습니다.
 
---

## 🙋‍♀️ 팀원용 가이드

프로젝트 아래 가이드를 먼저 확인해주세요.

👉 [팀원용 Notion 가이드 바로가기]([https://www.notion.so/1d89cc6146f38093ba65ff84fe08977a?pvs=4](https://grey-ghost-508.notion.site/1e09cc6146f380228218f51e08edd8a4?v=1e09cc6146f3804f8ffa000c7b0c5ead)

## 🚀 기술 스택

- React + TypeScript
- Vite
- Zustand
- Tailwind CSS
- React Router v6
- ESLint (Airbnb 스타일 가이드)

---

## 📁 폴더 구조

MyFavIdolFront/

├── src/

├── assets/ # 이미지, 아이콘, 폰트 등 정적 자원

├── components/ # 재사용 가능한 컴포넌트

│ ├── common/ # 공통 컴포넌트 (버튼, 입력 필드 등)

│ └── layouts/ # 레이아웃 관련 컴포넌트 (헤더, 푸터 등)

├── pages/ # 페이지 컴포넌트

│ ├── home/ # 홈 페이지

│ ├── artists/ # 아티스트 페이지

│ ├── schedule/ # 스케줄 페이지

│ ├── signup/ # 회원가입/로그인 페이지

│ └── timeline/ # 타임라인 페이지

├── hooks/ # 커스텀 훅

├── store/ # 상태 관리 (Zustand)

├── api/ # API 통신 관련 코드

├── constants/ # 상수 값 정의

├── utils/ # 유틸리티 함수

├── ts/ # 타입스크립트 타입 정의

├── App.tsx # 앱의 메인 컴포넌트

└── main.tsx # 앱의 진입점

├── public/ # 정적 파일

├── .eslintrc.json # ESLint 설정

├── .prettierrc # Prettier 설정

├── tsconfig.json # TypeScript 설정

├── tsconfig.app.json # 앱 관련 TypeScript 설정

├── tsconfig.node.json # Node 관련 TypeScript 설정

├── vite.config.ts # Vite 설정

└── package.json # 프로젝트 의존성 및 스크립트


---

## 🔗 경로 별칭 (Alias)

| 별칭           | 경로                                      |
|----------------|-------------------------------------------|
| `@/*`          | `src/*`                                   |
| `@components/*`| `src/components/*`                        |
| `@assets/*`    | `src/assets/*`                            |
| `@constants/*` | `src/constants/*`                         |
| `@hooks/*`     | `src/hooks/*`                             |
| `@pages/*`     | `src/pages/*`                             |
| `@store/*`     | `src/store/*`                             |
| `@ts/*`        | `src/ts/*`                                |
| `@api/*`       | `src/api/*`                               |
| `@utils/*`     | `src/utils/*`                             |
| `@Schedule`    | `src/pages/schedule/Schedule.tsx`         |

## ⚙️ 실행 방법

1. 레포지토리 클론
- git clone https://github.com/your-team/wistar.git
- - cd 해당폴더로 이동
- npm i, npm install 패키지 설치
- npm run dev 실행

## 배포 링크
https://wistar.o-r.kr/

## 문서
- 사용자 요구사항 정의서
  https://docs.google.com/spreadsheets/d/1j6LmhFHiRqi9j7MlOIx9FTuPqTV3b5InJgEGm05m4CI/edit?gid=428803499#gid=428803499
- 플로우차트
  https://www.figma.com/board/DhHUijQ0Eh2ARjevUpieAz/Untitled?node-id=0-1&p=f&t=a8DJjTxh9arxrNxm-0
- 화면정의서(와이어프레임)
  https://www.figma.com/design/ItmTtXoVbTqDyUwyAjsnNe/%EC%98%A4%EC%A6%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8idol?node-id=112-10866&p=f&t=R695bky0Iwba2lG6-0
- ERD 명세서
  https://www.erdcloud.com/d/eNoew4DpdgWtb9dn4
- 테이블 명세서
  https://docs.google.com/spreadsheets/d/12pDVQs0daAvF2T8SBJ7TGTXsyEkNbVAuEVa_CjuTdoo/edit?usp=sharing
- API 명세서
  https://docs.google.com/spreadsheets/d/1iRFoYlJupYTs26U1PBsnsIMU6Yf5ulGjj6_-FxASFGc/edit?usp=sharing


