import { IIconProps } from "./types";

export const FolderIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 86 78"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M84.729 68.12a8.333 8.333 0 01-8.334 8.334H9.73a8.333 8.333 0 01-8.333-8.333V9.787a8.333 8.333 0 018.333-8.333h20.833l8.333 12.5h37.5a8.333 8.333 0 018.334 8.333v45.834z"
        ></path>
    </svg>
    )
}