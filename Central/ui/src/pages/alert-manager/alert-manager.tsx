import styles from './alert-manager.module.css';
import Header from '@/components/header';
import Table from '../../components/ui/table';
import Title from '../../components/ui/typography/title';
import { useState } from 'react';
import { DropdownMenu } from '../../components/ui/drop-down-menu/drop-down-menu';
import { KebabHorizontalIcon, SearchIcon } from '../../components/ui/icons';
import Input from '../../components/ui/input-field';
import { columns, data } from './config';
import Label from '@/components/ui/typography/label';
import Paragraph from '@/components/ui/typography/paragragh';

export const AlertManager = () => {
    const [globalFilter, setGlobalFilter] = useState('');
 return(
        <>
        <div className={styles['container']}>
        <Header title="Alerts Manager" />

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
            <Label className={styles['smallLabel']} children="Total Alerts" />
            <Title variant='T3' className={styles['digiStyle']} children="29" />
            </div>
            <div className={styles['boxStyle']}>
            <Label className={styles['smallLabel']} children="Critical Alerts" />
            <Title variant='T3' className={styles['digiStyle']} children='10'/>
            </div>
            <div className={styles['boxStyle']}>
            <Label className={styles['smallLabel']} children="Prioritized As Now" />
            <Title variant='T3' className={styles['digiStyle']} children='6'/>
            </div>
            <div className={styles['boxStyle']}>
            <Label className={styles['smallLabel']} children="Low/Medium Confidence" />
            <Title variant='T3' className={styles['digiStyle']} children='35%'/>
            </div>
      </div></div>


          <div className={styles['subHeader']}>
        <div className={styles['filtersBox']}>
          <DropdownMenu title="Actions" menu={[
            {
              title:'Edit',
              onClick:() => console.log('handle edit'),
            },
            {
              title:'Delete',
              onClick:() => console.log('handle delete'),
            },
          ]} />
          <DropdownMenu title="Quick Filters" menu={[{
              title:'Filter 1',
              onClick:() => console.log('handle filter'),
            },
            {
              title:'Filter 2',
              onClick:() => console.log('handle filter2'),
            },
            {
              title:'Filter 3',
              onClick:() => console.log('handle filter3'),
            },
            ]} />
          <DropdownMenu title="Group By" menu={[{
              title:'Condition 1',
              onClick:() => console.log('handle filter'),
            },
            {
              title:'Condition 2',
              onClick:() => console.log('handle filter2'),
            },
            {
              title:'Condition 3',
              onClick:() => console.log('handle filter3'),
            },]} />
        </div>

        <div className={styles['filtersBox']}>
          <DropdownMenu title="Export (CSV,PDF)" menu={[
            {
              title:'File-1',
              onClick:() => console.log('handle Fil'),
            },
            {
              title:'File-2',
              onClick:() => console.log('handle delete'),
            },
          ]} />
        </div>

        <div className={styles['searchBox']}>
          <Input  className={styles['searchField']} prefixIcon={<SearchIcon width='18' height='18' fill={'var(--color-border)'} />} placeholder="Search"
           value={globalFilter ?? ''}
           onChange={value => setGlobalFilter(String(value))}
          />
        </div>
        </div>
        <div className={styles['tableWrapper']}>
        <Title variant="T3" children={'All Alerts'} />
        <Table className={styles['tableStyle']} columns={columns} data={data} showPagination/>
        </div>
    </div>
        </>
 )
};