import { IIconProps } from "./types"

export const SkipIcon = (props:IIconProps) => {
const {fill = '#5734A3', width="24", height="24"} = props;
 return( <svg
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
      strokeWidth="1.778"
      d="M15.5 12l-9.778 7.111V4.89L15.5 12z"
    ></path>
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.778"
      d="M18.167 4.889L18.167 19.111"
    ></path>
  </svg>)
}