import { useRef, useEffect } from "react";
import { init, getInstanceByDom, ECharts } from "echarts";
import { IReactEChartsProps } from "./type";
import styles from "./chart.module.css";

export const Chart = ({
  option,
  style,
  settings,
  loading,
  theme,
}: IReactEChartsProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%", ...style }} />
  );
};
