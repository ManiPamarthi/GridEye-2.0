import { IIconProps } from "./types";

export const ComplianceReportsIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="20", height="20"} = props;
    return(
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 21 21"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16.52 3.125H4.855c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.747 1.667 1.667 1.667h11.667c.92 0 1.666-.746 1.666-1.667V4.792c0-.92-.746-1.667-1.666-1.667z"
        ></path>
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.438 13.375h-5.5v-.5h5.5v.5zM10.104 7.542H7.938v-.5h2.166v.5z"
        ></path>
    </svg>
    )
}