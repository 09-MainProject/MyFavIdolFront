import React from 'react';
import {IconProps} from '@/types/icon.ts';

function Trash({width = 24, height = 24, fill = 'none'}: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 73 73" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M42.5834 33.4583V51.7083M30.4167 33.4583V51.7083M18.25 21.2917V57.7917C18.25 59.4051 18.8909 60.9524 20.0318 62.0932C21.1726 63.2341 22.72 63.875 24.3334 63.875H48.6667C50.2801 63.875 51.8274 63.2341 52.9682 62.0932C54.1091 60.9524 54.75 59.4051 54.75 57.7917V21.2917M12.1667 21.2917H60.8334M21.2917 21.2917L27.375 9.125H45.625L51.7084 21.2917"
                stroke="#FF4B4A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

export default Trash;