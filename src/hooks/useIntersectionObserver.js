import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback, options = {}) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            },
            {
                root: null, // 뷰포트 기준
                rootMargin: "0px",
                threshold: 0.1, // 10% 정도 보이면 실행
                ...options,
            }
        );

        const target = targetRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [callback, options]);

    return targetRef;
};

export default useIntersectionObserver;
