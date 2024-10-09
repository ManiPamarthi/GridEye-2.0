import { IIconProps } from "./types";

export const RefreshIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;
    
    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 17 16"
        >
      <g
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#clip0_342_5503)"
        >
        <path d="M1.167 2.667v4h4M15.833 13.334v-4h-4"></path>
        <path d="M14.16 6a6 6 0 00-9.9-2.24L1.167 6.667m14.666 2.666L12.74 12.24A6 6 0 012.84 10"></path>
      </g>
      <defs>
        <clipPath id="clip0_342_5503">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(.5)"></path>
        </clipPath>
      </defs>
    </svg>
    )
}