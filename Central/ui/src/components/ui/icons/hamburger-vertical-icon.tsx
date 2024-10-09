import { IIconProps } from "./types";

export const HamburgerVerticalIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 4 20"
          >
        <path
            fill={fill}
            fillOpacity="0.9"
            fillRule="evenodd"
            d="M0 2a2 2 0 114 0 2 2 0 01-4 0zm0 8a2 2 0 114 0 2 2 0 01-4 0zm0 8a2 2 0 114 0 2 2 0 01-4 0z"
            clipRule="evenodd"
          ></path>
      </svg>
    )
}