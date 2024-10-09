import { IIconProps } from "./types";

export const AddIcon = (props:IIconProps) => {
    const {fill = '#5734A3', width="32", height="32"} = props;
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 48 48"
        >
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zM24 16v16M16 24h16"
          ></path>
      </svg>
    )
}