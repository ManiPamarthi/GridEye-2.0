import { IIconProps } from "./types";

export const MenuIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 16 29"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 19l4 4 4-4M4 10l4-4 4 4"
        ></path>
    </svg>
    )
}