import { IIconProps } from "./types"

export const UploadsIcon = (props:IIconProps) => {
const {fill = '#5734A3', width="32", height="32"} = props;
 return( <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 90 90"
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M78.75 56.25v15a7.5 7.5 0 01-7.5 7.5h-52.5a7.5 7.5 0 01-7.5-7.5v-15M63.75 30L45 11.25 26.25 30M45 11.25v45"
    ></path>
  </svg>)
}