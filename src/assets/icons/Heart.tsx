import { IconProps } from '@/types/icon.ts';

function Heart({ width = 24, height = 24, fill = 'none' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 27"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.6667 8.96181C27.6667 11.0238 26.8749 13.0043 25.4611 14.4694C22.2065 17.8429 19.0499 21.3606 15.6737 24.6118C14.8999 25.3462 13.6723 25.3194 12.9317 24.5518L3.20501 14.4694C0.264996 11.4218 0.264996 6.50182 3.20501 3.45427C6.17392 0.376774 11.0106 0.376774 13.9795 3.45427L14.3331 3.82074L14.6864 3.45448C16.1099 1.97817 18.0485 1.14551 20.0737 1.14551C22.0989 1.14551 24.0375 1.97809 25.4611 3.45427C26.8751 4.91944 27.6667 6.89987 27.6667 8.96181Z"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Heart;
