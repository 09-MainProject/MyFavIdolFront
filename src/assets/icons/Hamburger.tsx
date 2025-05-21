import { IconProps } from '@/types/icon.ts';

function Hamburger({ width = 24, height = 24, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0V3.44333H27.5466V0H0ZM0 10.2267V13.67H27.5466V10.2267H0ZM0 20.5567V24H27.5466V20.5567H0Z"
        fill="black"
      />
    </svg>
  );
}

export default Hamburger;
