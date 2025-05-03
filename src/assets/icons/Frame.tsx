import React from 'react';
import { IconProps } from '@ts/icon.ts';

function Frame({ width = 24, height = 24, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33366 8.00065C7.33366 8.36884 7.63214 8.66732 8.00033 8.66732C8.36852 8.66732 8.66699 8.36884 8.66699 8.00065C8.66699 7.63246 8.36852 7.33398 8.00033 7.33398C7.63214 7.33398 7.33366 7.63246 7.33366 8.00065Z"
        stroke="#868AA3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9997 8.00065C11.9997 8.36884 12.2982 8.66732 12.6663 8.66732C13.0345 8.66732 13.333 8.36884 13.333 8.00065C13.333 7.63246 13.0345 7.33398 12.6663 7.33398C12.2982 7.33398 11.9997 7.63246 11.9997 8.00065Z"
        stroke="#868AA3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 8.00065C2.66667 8.36884 2.96514 8.66732 3.33333 8.66732C3.70152 8.66732 4 8.36884 4 8.00065C4 7.63246 3.70152 7.33398 3.33333 7.33398C2.96514 7.33398 2.66667 7.63246 2.66667 8.00065Z"
        stroke="#868AA3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Frame;
