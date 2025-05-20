import {useCallback, useEffect, useRef, useState} from 'react';

function useCommentDropdown() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [commentDropdownOpen, setCommentDropdownOpen] = useState<string | null>(
        null
    );

    const handleCommentDropdownToggle = useCallback((commentId: string) => {
        setCommentDropdownOpen(prev => (prev === commentId ? null : commentId));
    }, []);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setCommentDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handle);

        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, []);
    return {commentDropdownOpen, handleCommentDropdownToggle, ref};
}

export default useCommentDropdown;