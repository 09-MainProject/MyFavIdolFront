import React from 'react';

function useImageFallback() {
    return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/img/defaulImg.jpg';
    };
}

export default useImageFallback;