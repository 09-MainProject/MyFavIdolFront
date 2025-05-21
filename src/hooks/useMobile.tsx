import { useEffect, useState } from 'react';
import useDebouncedFn from '@/hooks/useDebouncedFn';

const MOBILE_BREAKPOINT = 768;

function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT);

  const handleResize = useDebouncedFn(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return isMobile;
}

export default useMobile;
