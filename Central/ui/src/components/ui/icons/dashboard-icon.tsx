import { IIconProps } from "./types";

export const DashboardIcon = (props:IIconProps) => {
    const {fill = "#5734A3", width="20", height="20"} = props;
    return(
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
            opacity="0.8"
          >
          <path d="M8.333 2.5H2.5v5.833h5.833V2.5zM17.5 2.5h-5.833v5.833H17.5V2.5zM17.5 11.666h-5.833V17.5H17.5v-5.834zM8.333 11.666H2.5V17.5h5.833v-5.834z"></path>
        </g>
      </svg>
    )
}