import {useCallback, useEffect, useRef} from 'react';

function useInfiniteObserver(fetchNextPage: () => void, hasNextPage: boolean) {
    const observerRef = useRef<HTMLDivElement | null>(null);

    const handleIntersect = useCallback((entry: IntersectionObserverEntry[]) => {
        entry.forEach(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
    }, [fetchNextPage, hasNextPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {threshold: 0.5});
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [handleIntersect]);
    return observerRef;
}

export default useInfiniteObserver;