import React from 'react';
import {IconProps} from '@/types/icon.ts';

function Plus({width = 24, height = 24, fill = 'none'}: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 90 90" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_263_319)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M44.9999 11C63.7748 11 79 26.2251 79 44.9999C79 63.7748 63.7748 79 44.9999 79C26.2251 79 11 63.7748 11 44.9999C11 26.2251 26.2251 11 44.9999 11ZM52.7962 32.3961L44.9999 40.1925L37.2038 32.3964L32.3962 37.2039L40.1924 44.9999L32.3962 52.7962L37.2038 57.6038L44.9999 49.8076L52.7962 57.6038L57.6038 52.7962L49.8076 44.9999L57.6038 37.2038L52.7962 32.3961Z"
                      fill="#FF4B4A"/>
            </g>
            <defs>
                <clipPath id="clip0_263_319">
                    <rect width="90" height="90" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

export default Plus;