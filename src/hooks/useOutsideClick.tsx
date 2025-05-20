import {RefObject, useCallback, useEffect} from 'react';

function useOutsideClick<T extends HTMLElement>(
    domRef: RefObject<T>,
    onClick: () => void,
    isOpen?: boolean,
) {
    const handleClickAnywhere = useCallback(
        (e: MouseEvent) => {
            const {target} = e;
            if (!(target instanceof HTMLElement) || !(domRef?.current instanceof HTMLElement)) return;

            if (domRef.current.contains(target)) return;
            onClick();
        },
        [domRef, onClick],
    );

    useEffect(() => {
        if (isOpen === true || isOpen === undefined) {
            document.addEventListener('click', handleClickAnywhere);
        }
        return () => {
            document.removeEventListener('click', handleClickAnywhere);
        };
    }, [handleClickAnywhere, isOpen]);
}

export default useOutsideClick;