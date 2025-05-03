import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

function useDropdownToggle() {
  const ref = useRef<null | HTMLDivElement>(null);
  const location = useLocation();
  const [isIdolDropdownOpen, setIsIdolDropdownOpen] = useState<boolean>(false);

  const handleToggleIdolDropdown = useCallback(() => {
    setIsIdolDropdownOpen(prev => !prev);
  }, []);

  const handleCloseIdolDropdown = useCallback(() => {
    setIsIdolDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handle = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (isIdolDropdownOpen && ref.current && !ref.current.contains(target)) {
        setIsIdolDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, [isIdolDropdownOpen]);

  useEffect(() => {
    setIsIdolDropdownOpen(false);
  }, [location.pathname]);

  return {
    isIdolDropdownOpen,
    handleToggleIdolDropdown,
    handleCloseIdolDropdown,
    ref,
  };
}

export default useDropdownToggle;
