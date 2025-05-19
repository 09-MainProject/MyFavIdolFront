import { IconProps } from '@/types/icon.ts';

function Comment({ width = 24, height = 24, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2238 19.3898L4.84745 24V19.3898H2.42372C1.08514 19.3898 0 18.3046 0 16.9661V2.42372C0 1.08514 1.08514 0 2.42372 0H21.8135C23.1521 0 24.2372 1.08514 24.2372 2.42372V16.9661C24.2372 18.3046 23.1521 19.3898 21.8135 19.3898H12.2238ZM7.27117 19.627L11.5287 16.9661H21.8135V2.42372H2.42372V16.9661H7.27117V19.627Z"
        fill="black"
      />
    </svg>
  );
}

export default Comment;
