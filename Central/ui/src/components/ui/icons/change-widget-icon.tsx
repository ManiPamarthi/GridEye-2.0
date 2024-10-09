import { IIconProps } from "./types";

export const ChangeWidgetIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 14 14"
        >
      <path
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.955 1h4.666a1.333 1.333 0 011.334 1.333v9.334A1.334 1.334 0 0111.62 13H6.955m0-12H2.288A1.333 1.333 0 00.955 2.333v9.334A1.333 1.333 0 002.288 13h4.667m0-12v12"
        ></path>
    </svg>
    )
}