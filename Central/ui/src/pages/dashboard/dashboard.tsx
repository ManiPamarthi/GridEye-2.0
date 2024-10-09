import Header from '@/components/header';
import { useState } from 'react';
import { DashboardIcon } from '../../components/sidebar/icons';
import styles from './dashboard.module.css';
import Title from '@/components/ui/typography/title';
import Chart from '@/components/ui/chart';
import Widget from '@/components/ui/widget';
import Table from '@/components/ui/table';
import Input from '../../components/ui/input-field';
import { KebabHorizontalIcon, NotificationIcon, SearchIcon } from '../../components/ui/icons';
import { columns, data } from '../asset-manager/config';
import { DropdownMenu } from '@/components/ui/drop-down-menu/drop-down-menu';
import Label from '@/components/ui/typography/label';
import Badge from '@/components/ui/badge';
import Paragraph from '@/components/ui/typography/paragragh';
import BarChart from '@/components/echarts/bar-chart';
import CurrentChart from '@/components/echarts/current-chart';
import CriticalChart from '@/components/echarts/critical-chart';

export const DashboardPage = () => {
    const text = [{children:'24 May,2020'},]
    const textName = [{children:'Where to grow your business as a photographer: site or social media?'},]
    const [globalFilter, setGlobalFilter] = useState('');
 const data = [
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   },
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   },
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   },
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   },
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   },
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   }, {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   }, 
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   }, 
   {
    ip:'192.168.1.33',
    hostname:'tech-ws-18',
    alerts:'123',
    totaltraffic:'79.55kb'
   }, 
    ];
const columns = [
       {
        id: 'IP',
        header: 'IP',
        accessorKey: 'ip',
        cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
      },
      {
        id: 'Hostname',
        header: 'Hostname',
        accessorKey: 'hostname',
        cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
      },
      {
        id: 'alerts',
        header: 'Alerts',
        accessorKey: 'alerts',
        cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
      },
      {
        id: 'totaltraffic',
        header: 'Total Traffic',
        accessorKey: 'totaltraffic',
        cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
      },
     
    ];    
     
 return(
 <>
 <div className={styles['pageWrapper']}>
    <Header title={'Hey Jerome'} />
    <div className={styles['container']}>
    <div className={styles['subContainer']}>
        <div className={styles['subBoxStyle']}>
          <Label className={styles['subText']} children='Dashboard' />
          <div className={styles['kebab-horizental-menu']}>
            <DropdownMenu customIcon={<KebabHorizontalIcon fill={'var(--color-gray)'} width="32" height="24" />} 
            menu={[{
          title:'Edit',
          onClick:() => console.log('handle edit'),
        },
        {
          title:'Delete',
          onClick:() => console.log('handle delete'),
        },
       ]} /></div></div>

<div className={styles['content']}>
            <div className={styles['boxStyle']}>
                    <div className={styles['id']}>
                <Label className={styles['smallLabel']} children="Total Assets" />
                <Title variant='T3' className={styles['digiStyle']} children="134" />  
                    </div> 
                    <div className={styles['id']}>
                <Label className={styles['smallLabel']} children="Controllers" />
                <Title variant='T3' className={styles['digiStyle']} children="21" />  
                    </div> 
                    <div className={styles['id']}>
                <Label className={styles['smallLabel']} children="HMIs" />
                <Title variant='T3' className={styles['digiStyle']} children="3" />  
                    </div> 
                    <div className={styles['id']}>
                <Label className={styles['smallLabel']} children="Traffic" />
                <Title variant='T3' className={styles['digiStyle']} children="73.8 MB" />
                    </div> 
                    <div className={styles['idOne']}>
                <Label className={styles['smallLabel']} children="Packets" />
                <Title variant='T3' className={styles['digiStyleText']} children="686.4k" />  
                    </div> 
            </div>
      </div>
            <div className={styles['currentChart']}>
                <CurrentChart/>
            </div>
                <div className={styles['criticalHealth']}>
                    <CriticalChart/>
                </div>
        </div>
 <Widget variant={'wide'} className={styles['alertWidget']} title={'Alerts'} body={<Chart style={{width:400, height:400, margin:'auto'}} option={{
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['Severity', 'Type', 'Category', 'Daily']
    },
    series: [
        {
            name: 'Pie Chart',
            type: 'pie',
            radius: ['50%', '70%'],
         
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: 'One'},
                {value: 310, name: 'Two'},
                {value: 234, name: 'Three'},
                {value: 135, name: 'Four'},
                {value: 1548, name: 'Five'}
            ]
        }
    ]
}} />} />
            <div className={styles['tableWidgetStyle']}>
                <Widget title='Top IPs at Risk' body={<Table data={data} columns={columns} />} variant={''} className={styles['topTableWidget']} />
            </div>
    <div className={styles['bandwidthWidgetStyle']}>
        <Widget title='Bandwidth' className={styles['bandwidthWidget']} variant='' body={<BarChart/>} />
    </div>
            <div className={styles['protocolsWidgetStyle']}>
            <Widget title='Protocols' className={styles['protocolsWidget']} variant='' body={<Chart style={{width:400, height:400, margin:'auto'}} option={{
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['Severity', 'Type', 'Category', 'Daily']
                },
                series: [
                    {
                        name: 'Pie Chart',
                        type: 'pie',
                        radius: ['50%', '70%'],
                    
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 335, name: 'One'},
                            {value: 310, name: 'Two'},
                            {value: 234, name: 'Three'},
                            {value: 135, name: 'Four'},
                            {value: 1548, name: 'Five'}
                        ]
                    }
                ]
            }} />} />
            </div>
 </div>
 </div>
 <div className={styles['']}>
 <div className={styles['searchBox']}>
          <Input  className={styles['searchField']} prefixIcon={<SearchIcon width='18' height='18' fill={'var(--color-monochrome-contrast)'} />} placeholder="Search"
           value={globalFilter ?? ''}
           onChange={value => setGlobalFilter(String(value))}
           suffixIcon={<NotificationIcon width='18' height='18' fill={'var(--color-monochrome-contrast)'} />}
          />
          </div>
 <div className={styles['leftBox']}>
 <div className={styles['subStyleBox']}>
<Title variant="T3" className={styles['subTitleOne']} children="Top Alerts" />
<div className={styles['cardIcon']}>
            <DropdownMenu customIcon={<KebabHorizontalIcon fill={'var(--color-gray)'} width="32" height="24" />} 
            menu={[{
          title:'Edit',
          onClick:() => console.log('handle edit'),
        },
        {
          title:'Delete',
          onClick:() => console.log('handle delete'),
        },
       ]} /></div></div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {/*<Badge className={styles['badgeStyle']} children variant='custom'/>*/}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
      
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
            <div className={styles['leftBoxStyle']}>
       {text.map(({children}) => <Label className={styles['mr']} children={children} />)}
       {textName.map(({children}) => <Paragraph variant='P6' className={styles['rm']} children={children} />)}
            </div>
</div>
</div>
 </>
 )
};
