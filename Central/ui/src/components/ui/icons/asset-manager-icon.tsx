import { IIconProps } from "./types";

export const AssetManagerIcon = (props:IIconProps) => {
    const {fill = '#5734A3', width="20", height="20"} = props;

    return(
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 20 20"
      >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.75 7.833l-7.5-4.325M17.5 13.333V6.667a1.667 1.667 0 00-.833-1.442l-5.834-3.333a1.666 1.666 0 00-1.666 0L3.333 5.225A1.667 1.667 0 002.5 6.667v6.666a1.667 1.667 0 00.833 1.442l5.834 3.333a1.666 1.666 0 001.666 0l5.834-3.333a1.668 1.668 0 00.833-1.442z"
        ></path>
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.725 5.8L10 10.008 17.275 5.8M10 18.4V10"
        ></path>
    </svg>
    )
}