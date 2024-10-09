import { IIconProps } from "./types";

export const SearchIcon =  (props:IIconProps) => {
    const {fill = "#5734A3", width="32", height="32"} = props;
    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 24 24"
        >
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      ></path>
    </svg>
    )
}