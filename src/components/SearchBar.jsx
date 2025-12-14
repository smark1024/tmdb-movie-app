import React, { useState, memo } from "react";
import "../styles/components/SearchBar.scss";

const SearchBar = memo(({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(keyword);
    };

    const handleChange = (e) => {
        setKeyword(e.target.value);
        // 실시간 검색을 원하면 여기서 onSearch(e.target.value) 호출 가능
        // 지금은 엔터/클릭 시 검색되도록 함
    };

    return (
        <div className="search-bar">
            <form className="search-bar__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-bar__input"
                    placeholder="영화 제목을 검색해보세요..."
                    value={keyword}
                    onChange={handleChange}
                />
                <button type="submit" className="search-bar__button" aria-label="검색">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
});

export default SearchBar;
