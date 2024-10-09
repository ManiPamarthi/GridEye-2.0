import ReactEChart from "echarts-for-react";
import styles from './pie-chart.module.css';

export const PieChart = () => {

  const eChartsOption = {
    legend: {
    orient: 'vertical',
    left: 'right'
  },
series: [
      {
          name: 'Pie Chart',
          type: 'pie',
          radius: ['50%', '70%'],
       
          avoidLabelOverlap: true,
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  name: 'Pie Chart',
                  text:'mani',
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          },
          data: [
              {value: 1548, name: 'Domain Alias'},
              {value: 1548, name: 'Code Repo Group'},
              {value: 434, name: 'SubDomain'},
              {value: 135, name: 'Associated Domain'},
              {value: 1548, name: 'Android App'},
              {value: 135, name: 'Domain'},
              {value: 1548, name: 'Social Media'}
          ]
      }
  ]
};
  return (
    <div style={{ width: "85%", height: "70%" }}>
      <ReactEChart style={{ width: "100%", height: "100%" }}
          option={eChartsOption} />
    </div>
  );
}
