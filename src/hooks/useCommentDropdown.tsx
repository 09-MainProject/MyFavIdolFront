import {useCallback, useEffect, useRef, useState} from 'react';

function useCommentDropdown() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isIdolDropdownOpen, setIsIdolDropdownOpen] = useState<string | null>(
        null
    );

    const handleToggleIdolDropdown = useCallback((commentId: string) => {
        setIsIdolDropdownOpen(prev => (prev === commentId ? null : commentId));
    }, []);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsIdolDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handle);

        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, []);
    return {isIdolDropdownOpen, handleToggleIdolDropdown, ref};
}

export default useCommentDropdown;