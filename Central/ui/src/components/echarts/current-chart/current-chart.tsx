import ReactEChart from "echarts-for-react";
import styles from './bar-chart.module.css';

export const CurrentChart = () => {
    const eChartsoption = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            itemStyle: {
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 36.61
            },
            pointer: {
              length: '75%',
              width: 16,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              width: '60%',
              lineHeight: 40,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
            },
            data: [
              {
                value: 25
              }
            ]
          }
        ]
      };
  return (
    <div style={{ width: "100%", height: "60%" }}>
      <ReactEChart style={{ width: "100%", height: "230%" }}
          option={eChartsoption} />
    </div>
  );
}
