# 🎬 TMDB Movie App (Trending Movies)

TMDB(The Movie Database) Open API를 활용한 영화 탐색 및 정보 제공 웹 애플리케이션입니다.
**대규모 데이터 렌더링 시 성능 최적화**와 **사용자 경험(UX) 중심의 UI 개발**에 중점을 둔 포트폴리오 프로젝트입니다.

## 🛠 Tech Stack

-   **Core**: React, Vite
-   **Styling**: SCSS (BEM Methodology, Flexbox Layout, Responsive Design)
-   **State Management**: React Hooks (useState, useEffect, useRef, useCallback)
-   **Network**: Axios
-   **Optimization**: Intersection Observer API (Infinite Scroll), Skeleton UI

## 📌 Features & Highlights

### ✅ Implemented Features (구현 기능)

#### 1. Home & Movie List

-   [x] **Responsive Layout**: Flexbox와 `calc()`를 활용하여 모바일(2열), 태블릿(3열), 데스크톱(5열)에 대응하는 반응형 그리드 시스템 구현
-   [x] **Infinite Scroll**: `IntersectionObserver`를 활용한 커스텀 훅으로 무한 스크롤 구현 (페이지네이션 최적화)
-   [x] **Skeleton UI**: 데이터 로딩 중 레이아웃 이동(CLS)을 방지하고 사용자 경험을 높이는 Shimmer 애니메이션 적용

#### 2. Search

-   [x] **Real-time Search**: 영화 제목 검색 기능 구현
-   [x] **Search UX**: 검색 결과가 없을 때의 예외 처리 및 검색어 유지

#### 3. Detail View (Modal)

-   [x] **Modal Overlay**: 영화 클릭 시 상세 정보를 보여주는 팝업 모달 구현
-   [x] **Body Scroll Lock**: 모달 활성화 시 배경 스크롤 방지 처리
-   [x] **Image Optimization**: 고화질 백드롭 이미지 로딩 시 스켈레톤 UI 적용으로 시각적 끊김 최소화

### 🚀 Optimization Details (최적화 사례)

-   **Custom Hook**: `useIntersectionObserver` 훅을 직접 구현하여 재사용성 확보 및 DOM 접근 최소화
-   **CLS 방지**: 이미지 로딩 전 `aspect-ratio`와 `padding-bottom` 기법을 사용하여 영역 높이를 미리 확보, 레이아웃 덜컹거림 방지
-   **Event Handling**: `useCallback`을 사용하여 불필요한 함수 재생성 방지 및 메모리 최적화

## 📂 Folder Structure

```
src/
├── api/          # Axios 인스턴스 및 API 요청 함수
├── components/   # 재사용 가능한 UI 컴포넌트 (MovieCard, Modal, SearchBar, SkeletonCard)
├── hooks/        # 커스텀 훅 (useIntersectionObserver)
├── pages/        # 페이지 컴포넌트 (Home)
└── styles/       # SCSS 스타일 (BEM, Variables, Mixins)
```

## 🏃‍♂️ How to Run

1. **Clone the repository**

    ```bash
    git clone https://github.com/smark1024/tmdb-movie-app.git
    ```

2. **Install dependencies**

    ```bash
    cd tmdb-movie-app
    npm install
    ```

3. **Set Environment Variables**
   Create a `.env` file in the root directory:

    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
    VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
    ```

4. **Start Development Server**
    ```bash
    npm run dev
    ```
