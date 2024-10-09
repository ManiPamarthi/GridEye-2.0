import { IIconProps } from "./types";

export const MaximizeIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="32", height="32"} = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 10 10"
          >
        <g clipPath="url(#clip0_342_3362)">
          <path
              stroke={fill}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.333 1.25h-1.25a.833.833 0 00-.833.833v1.25m7.5 0v-1.25a.833.833 0 00-.833-.833h-1.25m0 7.5h1.25a.833.833 0 00.833-.833v-1.25m-7.5 0v1.25a.833.833 0 00.833.833h1.25"
            ></path>
        </g>
        <defs>
          <clipPath id="clip0_342_3362">
            <path fill="#fff" d="M0 0H10V10H0z"></path>
          </clipPath>
        </defs>
      </svg>
    )
}