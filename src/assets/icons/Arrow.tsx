import { IconProps } from '@ts/icon.ts';

function Arrow({ width = 48, height = 48, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 72"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.75 18L26.25 36L15.75 54" stroke="#A4A4A4" />
    </svg>
  );
}

export default Arrow;
