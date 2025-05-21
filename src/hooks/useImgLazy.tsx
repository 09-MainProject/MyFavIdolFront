import {useCallback, useEffect, useRef} from 'react';

function useImgLazy() {
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleImgLoad = useCallback((entry: IntersectionObserverEntry[]) => {
        entry.forEach(entries => {
            if (entries.isIntersecting) {
                const img = entries.target as HTMLImageElement;
                img.src = img.getAttribute('data-src') as string;
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleImgLoad, {threshold: 0.1});

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [handleImgLoad]);
    return imgRef;
}

export default useImgLazy;