import { IIconProps } from "./types";

export const CaretIcon = (props:IIconProps) =>{
  const {fill = '#D9DADB', width="32", height="32"} = props;

    return (
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
          strokeWidth="2"
          d="M4 6l4 4 4-4"
        ></path>
    </svg>
    )
}