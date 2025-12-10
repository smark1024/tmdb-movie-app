import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/Modal.scss';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL + '/original';

const Modal = ({ movie, onClose }) => {
  const modalRef = useRef();
  const [isImageLoaded, setIsImageLoaded] = useState(false); // 이미지 로딩 상태

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef} role="dialog" aria-modal="true">
        <button className="modal-content__close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {movie.backdrop_path ? (
          <>
            {/* 이미지가 로딩되지 않았을 때 스켈레톤 표시 */}
            {!isImageLoaded && <div className="modal-content__backdrop-skeleton" />}
            
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="modal-content__backdrop"
              onLoad={() => setIsImageLoaded(true)} // 로딩 완료 시 상태 변경
              style={{ display: isImageLoaded ? 'block' : 'none' }} // 로딩 전에는 숨김
            />
          </>
        ) : (
          <div style={{ height: '200px', background: '#333' }} />
        )}

        <div className="modal-content__body">
          <h2 className="modal-content__title">{movie.title}</h2>
          
          <div className="modal-content__meta">
            <span>📅 {movie.release_date}</span>
            <span>⭐️ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            <span>💬 리뷰 {movie.vote_count}개</span>
          </div>

          <p className="modal-content__overview">
            {movie.overview ? movie.overview : "상세 정보가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
