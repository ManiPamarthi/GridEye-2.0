import { IIconProps } from "./types";

export const CloseIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;
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
            d="M18 6L6 18M6 6l12 12"
          ></path>
      </svg>
    )
}