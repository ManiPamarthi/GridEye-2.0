import { IIconProps } from "./types";

export const NetworkIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="20", height="20"} = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 20 18"
          >
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M10.885 14C12.11 13.614 13 12.447 13 11.068 13 9.374 11.657 8 10 8s-3 1.374-3 3.068c0 1.374.883 2.537 2.101 2.928M10.143 4.676a1.555 1.555 0 100-3.111 1.555 1.555 0 000 3.111zM17.054 16.386a1.555 1.555 0 100-3.11 1.555 1.555 0 000 3.11zM2.946 16.436a1.555 1.555 0 100-3.111 1.555 1.555 0 000 3.11zM10.142 7.817V4.676M7 12.5l-2.665 1.687M13 12.5l2.708 1.548"
          ></path>
      </svg>
    )
}