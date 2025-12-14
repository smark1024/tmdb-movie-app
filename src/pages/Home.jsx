import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import requests, { fetchMovies, searchMovies } from "../api/requests";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "../styles/pages/Home.scss";

const Home = () => {
    // 영화 목록 저장
    const [movies, setMovies] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(false);
    // 페이지 번호
    const [page, setPage] = useState(1);
    // 더 불러올 영화가 있는지 여부
    const [hasMore, setHasMore] = useState(true);
    // 검색 상태
    const [isSearching, setIsSearching] = useState(false);
    // 검색어 저장
    const [searchKeyword, setSearchKeyword] = useState("");
    // 선택된 영화 저장
    const [selectedMovie, setSelectedMovie] = useState(null);

    // 검색 시 초기화
    const handleSearch = useCallback((keyword) => {
        setSearchKeyword(keyword);
        setPage(1);
        setMovies([]);
        setHasMore(true);
        setIsSearching(!!keyword.trim());
    }, []);

    // 페이지나 검색어가 바뀔 때 데이터 로드
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                let data;
                const currentKeyword = isSearching ? searchKeyword : "";

                if (currentKeyword) {
                    data = await searchMovies(currentKeyword, page);
                } else {
                    data = await fetchMovies(requests.fetchPopular, page);
                }

                setMovies((prev) => {
                    if (page === 1) return data.results;
                    const newMovies = data.results.filter(
                        (newMovie) => !prev.some((m) => m.id === newMovie.id)
                    );
                    return [...prev, ...newMovies];
                });

                setHasMore(data.page < data.total_pages);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [page, isSearching, searchKeyword]);

    // 무한 스크롤 트리거
    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [loading, hasMore]);

    const observerOptions = useMemo(
        () => ({
            root: null,
            rootMargin: "0px 0px 100px 0px",
            threshold: 0.1,
        }),
        []
    );

    const targetRef = useIntersectionObserver(loadMore, observerOptions);

    // 영화 클릭 핸들러
    const handleMovieClick = useCallback((movie) => {
        setSelectedMovie(movie);
    }, []);

    // 모달 닫기 핸들러
    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="main-content">
            <h1 className="main-content__title">
                {isSearching ? `Search Results: "${searchKeyword}"` : "Trending Movies"}
            </h1>

            <SearchBar onSearch={handleSearch} />

            <div className="main-content__grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={`${movie.id}-${movie.release_date}`}
                        movie={movie}
                        onClick={handleMovieClick}
                    />
                ))}

                {loading &&
                    Array.from({ length: 20 }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))}
            </div>

            {!loading && hasMore && (
                <div ref={targetRef} style={{ height: "50px", margin: "20px 0" }} />
            )}

            {!loading && !hasMore && movies.length > 0 && (
                <div className="main-content__no-result">모든 영화를 불러왔습니다. 🎉</div>
            )}

            {!loading && movies.length === 0 && (
                <div className="main-content__no-result">검색 결과가 없습니다. 😢</div>
            )}

            {/* 모달 렌더링 (selectedMovie가 있을 때만) */}
            {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
        </div>
    );
};

export default Home;
