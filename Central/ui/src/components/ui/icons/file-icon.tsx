import { IIconProps } from "./types";

export const FileIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 100 100"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M58.334 8.334H25a8.333 8.333 0 00-8.333 8.333v66.666A8.334 8.334 0 0025 91.668h50a8.333 8.333 0 008.334-8.334v-50l-25-25z"
        ></path>
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M58.333 8.334v25h25M66.666 54.166H33.333M66.666 70.834H33.333M41.666 37.5h-8.333"
        ></path>
    </svg>
    )
}