import { IIconProps } from "./types";
export const AlertManagerIcon = (props:IIconProps) => {
    const {fill = '#5734A3', width="20", height="20"} = props;
    return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 20 20"
        >
      <g
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
        <path d="M6.55 1.667h6.9l4.884 4.883v6.9l-4.884 4.883h-6.9L1.667 13.45v-6.9L6.55 1.667zM10 6.667V10M10 13.334h.008"></path>
      </g>
      <defs>
        <clipPath id="clip0_28_454">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
    )
};