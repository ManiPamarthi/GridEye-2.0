import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import { CSSProperties } from "react";
export interface IReactEChartsProps {
    option: EChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
  }