import { IIconProps } from "./types";

export const DownloadIcon = (props:IIconProps) =>{
  const {fill = '#5734A3', width="32", height="32"} = props;

    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 16 16"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10v2.667A1.334 1.334 0 0112.667 14H3.333A1.334 1.334 0 012 12.667V10M4.667 6.667L8 10l3.333-3.333M8 10V2"
        ></path>
    </svg>
    )
}