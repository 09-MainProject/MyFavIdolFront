import { useEffect, useState } from 'react';
import useDebouncedFn from '@/hooks/useDebouncedFn';

function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = useDebouncedFn(() => {
    setIsMobile(window.innerWidth < 768);
  }, 300);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return isMobile;
}

export default useMobile;
