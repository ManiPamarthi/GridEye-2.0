import { IIconProps } from "./types";

export const CopyIcon = (props:IIconProps) => {
  const {fill = '#000000', width="32", height="32"} = props;

    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 16 16"
        >
      <g
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          clipPath="url(#clip0_473_2999)"
        >
        <path d="M13.333 6h-6C6.597 6 6 6.597 6 7.333v6c0 .737.597 1.334 1.333 1.334h6c.737 0 1.334-.597 1.334-1.334v-6c0-.736-.597-1.333-1.334-1.333z"></path>
        <path d="M3.333 10h-.666a1.333 1.333 0 01-1.333-1.333v-6a1.333 1.333 0 011.333-1.333h6A1.333 1.333 0 0110 2.667v.667"></path>
      </g>
      <defs>
        <clipPath id="clip0_473_2999">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
    )
}