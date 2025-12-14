import React from "react";
import "../styles/components/SkeletonCard.scss";

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-card__poster" />
            <div className="skeleton-card__info">
                <div className="skeleton-card__text skeleton-card__text--title" />
                <div className="skeleton-card__text skeleton-card__text--rating" />
            </div>
        </div>
    );
};

export default SkeletonCard;
