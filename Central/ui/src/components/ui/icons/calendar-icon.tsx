import { IIconProps } from "./types";

export const CalendarIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 17 16"
          >
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.167 2.667H3.833C3.097 2.667 2.5 3.263 2.5 4v9.333c0 .737.597 1.333 1.333 1.333h9.334c.736 0 1.333-.596 1.333-1.333V4c0-.737-.597-1.333-1.333-1.333zM11.167 1.333V4M5.833 1.333V4M2.5 6.667h12"
          ></path>
      </svg>
    )
}