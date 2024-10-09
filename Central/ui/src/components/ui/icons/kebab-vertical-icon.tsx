import { IIconProps } from "./types";

export const KebabHorizontalIcon = (props:IIconProps) => {
  const {fill = '#858585', width="32", height="32"} = props;
    return (
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
          d="M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"
        ></path>
      </svg>
    )
}