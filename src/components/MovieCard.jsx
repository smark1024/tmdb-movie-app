import React from "react";
import "../styles/components/MovieCard.scss";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL + "/w500";

const MovieCard = ({ movie, onClick }) => {
    // 포스터 경로가 있는지 확인
    const hasPoster = !!movie.poster_path;

    return (
        <div className="movie-card" onClick={onClick}>
            <div className="movie-card__poster-wrapper">
                {hasPoster ? (
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-card__poster"
                        loading="lazy"
                    />
                ) : (
                    // 포스터가 없을 때 보여줄 대체 UI
                    <div
                        className="movie-card__poster"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#333",
                            color: "#777",
                            fontSize: "0.8rem",
                        }}
                    >
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div className="movie-card__info">
                <h3 className="movie-card__title">{movie.title}</h3>
                <span className="movie-card__rating">
                    ⭐️ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
