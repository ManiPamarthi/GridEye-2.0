import ReactEChart from "echarts-for-react";
import styles from './line-chart.module.css';

export const LineChart = () => {
    const eChartsOption = {
        xAxis: {
          type: 'category',
          data: ['1-00162', '1-00163', '1-00164', '1-00165']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };
  return (
    <div style={{ width: "100%", height: "70%" }}>
      <ReactEChart style={{ width: "100%", height: "100%" }}
          option={eChartsOption} />
    </div>
  );
}
