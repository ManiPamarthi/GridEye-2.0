import { IIconProps } from "./types";

export const DeleteIcon = (props:IIconProps) => {
  const {fill = '#000000', width="32", height="32"} = props;
    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 17 16"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.75 4h12M13.417 4v9.334a1.333 1.333 0 01-1.334 1.333H5.417a1.333 1.333 0 01-1.334-1.333V4m2 0V2.667a1.333 1.333 0 011.334-1.333h2.666a1.333 1.333 0 011.334 1.333V4"
        ></path>
    </svg>
    )
}