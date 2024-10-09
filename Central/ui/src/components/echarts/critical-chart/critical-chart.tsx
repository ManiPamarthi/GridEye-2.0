import ReactEChart from "echarts-for-react";
import styles from './critical-chart.module.css';

export const CriticalChart = () => {
    const eChartsoption = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20
          },
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: '#FD7347'
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: 20
            }
          ]
        }
      ]
    };
  return (
    <div style={{ width: "100%", height: "70%" }}>
      <ReactEChart style={{ width: "100%", height: "170%" }}
          option={eChartsoption} />
    </div>
  );
}
