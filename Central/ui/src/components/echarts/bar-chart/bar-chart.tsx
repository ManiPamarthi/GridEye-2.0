import ReactEChart from "echarts-for-react";
import styles from './bar-chart.module.css';

export const BarChart = () => {
    const eChartsoption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
  return (
    <div style={{ width: "100%", height: "70%" }}>
      <ReactEChart style={{ width: "100%", height: "100%" }}
          option={eChartsoption} />
    </div>
  );
}
