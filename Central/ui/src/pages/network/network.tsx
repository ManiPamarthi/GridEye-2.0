import Header from '@/components/header';
import styles from './network.module.css';
import Chart from '@/components/ui/chart';
import { useAssetsQuery } from '@/api/lib/assets';

export const NetworkPage = () => {
    const {data}  =  useAssetsQuery.getTopology();
    const topologyData = data?.data;
    const topologyChartData = [] as any;
    topologyData?.forEach((data:any, idx:number) => {
        const {_source} = data;
        let topo = [];
        if(_source.topology) {
          topo = _source.topology.map((data:any) => {
            return {name:data.vendor_name+'\n '+data.ipaddress, children:[],symbolSize:13, symbol:'square',
            layout: 'radial',
            itemStyle: {
              color: {
                  type: 'radial',
                  x: 0.4,
                  y: 0.3,
                  r: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(112, 171, 255, 1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(112, 171, 255, 1)'
                    }
                  ]
                }
          },
        }
        });
        }
        const el = {
            name: _source.substation,
            symbolSize:13,
            layout: 'radial',
            children:topo,
            itemStyle: {
                color: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.3,
                    r: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(241, 157, 176, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(241, 157, 176, 1)'
                      }
                    ]
                  }
            },
        }
        topologyChartData.push(el);
    });
    
   const chartOption = {
        series: [
          {
            type: 'tree',
            data: [{name:'',children:topologyChartData}],
            layout: 'radial',
            left:'6%',
            right:'6%',
            bottom:'6%',
            top:'6%',
            label: {
              position:'top',
            },
            zoom:0.8,
            itemStyle: {
                color: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.3,
                    r: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(244, 156, 53, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(244, 156, 53, 1)'
                      }
                    ]
                  }
            },

            symbol: 'circle',
            symbolSize: 50,
            initialTreeDepth: 3,
            animationDurationUpdate: 750,
            emphasis: {
              focus: 'descendant'
            }
          }
        ],
      
      } as any;
 return(<div className={styles['mainContainer']}><Header title='Network Topology' />
 <div className={styles['chartPage']}>
    <Chart option={chartOption} />
</div>
 </div>)
};
