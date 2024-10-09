import { IIconProps } from "./types";

export const NotificationIcon = (props:IIconProps) => {
    const {fill = '#5734A3', width="32", height="32"} = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 24 24"
        >
        <path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a1.999 1.999 0 01-3.46 0">
        </path>
    </svg>
    )
}