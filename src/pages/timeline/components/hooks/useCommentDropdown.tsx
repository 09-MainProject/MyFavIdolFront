import {useCallback, useRef, useState} from 'react';
import useClickOutside from '@hooks/useOutsideClick.tsx';

function useCommentDropdown() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [commentDropdownOpen, setCommentDropdownOpen] = useState<string | null>(null);

    const handleCommentDropdownToggle = useCallback((commentId: string) => {
        setCommentDropdownOpen(prev => (prev === commentId ? null : commentId));
    }, []);

    useClickOutside(ref, () => setCommentDropdownOpen(null), Boolean(commentDropdownOpen));

    return {commentDropdownOpen, handleCommentDropdownToggle, ref};
}

export default useCommentDropdown;