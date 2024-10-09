import { IIconProps } from "./types";

export const AttackSurfaceMonitoringIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="20", height="20"} = props;

    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 20 20"
          >
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M8.2 15.5H2.6A1.6 1.6 0 011 13.9V3.6A1.6 1.6 0 012.6 2h14.8A1.6 1.6 0 0119 3.6v10.3a1.6 1.6 0 01-1.6 1.6h-5.6"
          ></path>
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M16.97 13.63a.1.1 0 11-.141.14.1.1 0 01.141-.14zM11.654 9.611a1.8 1.8 0 01-3.307 0"
          ></path>
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.346 9.612A1.795 1.795 0 018.2 8.9V7.786a1.8 1.8 0 113.6 0V8.9c0 .253-.052.493-.146.712"
          ></path>
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.8 6.444v-.403a1.198 1.198 0 112.4 0v.403M8.2 8.343H7M7 6.045l.078.157c.245.489.724.819 1.268.873M11.654 7.075a1.593 1.593 0 001.268-.873L13 6.045M7 10.641l.078-.156c.245-.49.724-.82 1.268-.874h0M11.653 9.611h0a1.594 1.594 0 011.268.874l.079.156M13 8.343h-1.2M11.532 4.7l-.712.466M8.468 4.7l.712.466M10 5.986V10.7M5.33 11.9H19M1 11.9h3.063"
          ></path>
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M7.6 17.3l.6-1.8h3.6l.6 1.8"
          ></path>
      </svg>
    )
}