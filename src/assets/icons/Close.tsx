import { IconProps } from '@/types/icon.ts';

function Close({ width = 24, height = 24, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18"
        stroke="#222222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#222222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Close;
