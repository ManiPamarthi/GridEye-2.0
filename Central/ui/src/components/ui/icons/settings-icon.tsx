import { IIconProps } from "./types";

export const SettingsIcon = (props:IIconProps) => {
  const {fill = '#5734A3', width="20", height="20"} = props;
    
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
          clipPath="url(#clip0_28_460)"
        >
        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
        <path d="M16.166 12.5a1.375 1.375 0 00.275 1.517l.05.05a1.666 1.666 0 01-1.179 2.847 1.667 1.667 0 01-1.179-.489l-.05-.05a1.374 1.374 0 00-1.517-.275 1.375 1.375 0 00-.833 1.258v.142a1.667 1.667 0 01-3.333 0v-.075a1.375 1.375 0 00-.9-1.258 1.375 1.375 0 00-1.517.275l-.05.05a1.667 1.667 0 11-2.358-2.359l.05-.05a1.375 1.375 0 00.275-1.516 1.375 1.375 0 00-1.259-.834H2.5a1.667 1.667 0 110-3.333h.075a1.375 1.375 0 001.258-.9 1.375 1.375 0 00-.275-1.516l-.05-.05a1.667 1.667 0 112.358-2.359l.05.05a1.375 1.375 0 001.517.275H7.5a1.375 1.375 0 00.833-1.258V2.5a1.667 1.667 0 113.333 0v.075a1.376 1.376 0 00.834 1.258 1.375 1.375 0 001.516-.275l.05-.05a1.666 1.666 0 012.72 1.818 1.666 1.666 0 01-.361.54l-.05.05a1.375 1.375 0 00-.275 1.518V7.5a1.375 1.375 0 001.258.834h.142a1.667 1.667 0 010 3.333h-.075a1.375 1.375 0 00-1.259.833v0z"></path>
      </g>
      <defs>
        <clipPath id="clip0_28_460">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
    )
}