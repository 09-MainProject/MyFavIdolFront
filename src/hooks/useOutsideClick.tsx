import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router';

function useOutsideClick() {
    const ref = useRef<null | HTMLDivElement>(null);
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleToggleDropdown = useCallback(() => {
        setDropdownOpen(prev => !prev);
    }, []);

    const handleCloseDropdown = useCallback(() => {
        setDropdownOpen(false);
    }, []);

    useEffect(() => {
        const handle = (e: globalThis.MouseEvent) => {
            const target = e.target as Node;
            if (dropdownOpen && ref.current && !ref.current.contains(target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handle);
        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        setDropdownOpen(false);
    }, [location.pathname]);

    return {
        dropdownOpen,
        handleToggleDropdown,
        handleCloseDropdown,
        ref,
    };
}

export default useOutsideClick;
