import styles from './attack-surface-monitoring.module.css';
import Header from '@/components/header';
import Table from '../../components/ui/table';
import Title from '../../components/ui/typography/title';
import { DropdownMenu } from '../../components/ui/drop-down-menu/drop-down-menu';
import { KebabHorizontalIcon, RefreshIcon } from '../../components/ui/icons';
import { columns, data, widgetcolumns, widgetdata } from './config';
import Label from '@/components/ui/typography/label';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import {PieChart} from '@/components/echarts/pie-chart/pie-chart';
import LineChart from '@/components/echarts/line-chart';

export const AttackSurfaceMonitoring = () => {

 return(
        <>
        <div className={styles['container']}>
        <Header title="Attack Surface Monitoring" />

        <div className={styles['subContainer']}> 
                <div className={styles['subBoxStyle']}>
          <Label className={styles['subText']} children='Overview' />

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
            <Label className={styles['smallLabel']} children="Total Scans" />
            <Title variant='T3' className={styles['digiStyle']} children="154" />
            </div>
            <div className={styles['boxStyle']}>
            <Label className={styles['smallLabel']} children="Last Scan Assets" />
            <Title variant='T3' className={styles['digiStyle']} children='71'/>
            </div>
            <div className={styles['boxStyle']}>
            <Label className={styles['smallLabel']} children="Last scan issues" />
            <Title variant='T3' className={styles['digiStyle']} children='96'/>
            </div>
            <div className={styles['boxStyleFour']}>
            <Label className={styles['smallLabel']} children="Last Scan Severity" />
            <Title variant='T3' className={styles['badgeTitle']}>
            <Badge className={styles['badgeTextColorTop']} children="High"/></Title>
            </div>
      </div></div>
       


      <div className={styles['colBoxCard']}>
      <div className={styles['subStyleBox']}>
<Title variant="T3" className={styles['subTitleOne']} children="Last 5 Scan Assets & issues" />
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
       <LineChart />
</div>

<div className={styles['colBoxCard']}>
<div className={styles['subStyleBox']}>
<Title variant="T3" className={styles['subTitleOne']} children="Last Finished Scan Assets" />
<div className={styles['cardIconTopTwo']}>
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
       <PieChart/>
</div>

        <div className={styles['tableWrapper']}>
              <div className={styles['attackButton']}>
        <Title variant="T3" children={'Last 5 Scans'} />
        <Label className={styles['restartIconStyle']}><RefreshIcon fill={'var(--color-text-high)'} width="32" height="24" /></Label>
            </div>
        <Table className={styles['tableStyle']} columns={columns} data={data} />
              <div className={styles['showButton']}>
        <Button variant='PRIMARY' children="Show All" />
        <Label className={styles['fontStyleLabel']}  children='Total Scans:154' />
              </div>
        </div>

<div className={styles['rightBox']}>
<div className={styles['subStyleBox']}>
<Title variant="T4" className={styles['subTitle']} children="Top Vulnerable Assets" />
<div className={styles['cardIconOne']}>
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
       <Table containerClassName={styles['noBorder']} columns={widgetcolumns} data={widgetdata} />
</div>

<div className={styles['rightBox']}>
<div className={styles['subStyleBox']}>
<Title variant="T3" className={styles['subTitle']} children="Top Exposed Ports" />
<div className={styles['cardIconTwo']}>
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
       <Table containerClassName={styles['noBorder']} columns={widgetcolumns} data={widgetdata} />
</div>

<div className={styles['rightBox']}>
<div className={styles['subStyleBox']}>
<Title variant="T3" className={styles['subTitle']} children="Top Issues" />
<div className={styles['cardIconThree']}>
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
        <Table containerClassName={styles['noBorder']} columns={widgetcolumns} data={widgetdata} />
  </div>
</div>
        </>
 )
};