import { useCallback, useRef } from 'react';

function useDebouncedFn<T extends (...args: T[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default useDebouncedFn;
