import CheckBox from "../../components/ui/checkbox"
import { DropdownMenu } from "../../components/ui/drop-down-menu/drop-down-menu";
import { HamburgerVerticalIcon } from "../../components/ui/icons/hamburger-vertical-icon";
import styles from './asset-manager.module.css';

export const columns = [
    {
      id: 'select',
      size: 35,
      header: ({ table }:any) => (
        <CheckBox
          label=''
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }:any) => (
        <div className={styles['checkboxCol']}>
          <CheckBox
            label=''
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      id: 'IPAddress',
      header: 'IP Address',
      accessorKey: 'IPAddress',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
     {
      id: 'model',
      header: 'Model',
      accessorKey: 'model',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'firmware',
      header: 'Firmware',
      accessorKey: 'firmware',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'series',
      header: 'Series',
      accessorKey: 'series',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'class',
      header: 'Class',
      accessorKey: 'class',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'hardware',
      header: 'Hardware',
      accessorKey: 'hardware',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'action',
      header: 'action',
      cell: (ctx:any) => {
        return <div className={styles['kebab-menu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />} menu={[{
          title:'Edit',
          onClick:() => console.log('handle edit'),
        },
        // {
        //   title:'Delete',
        //   onClick:() => console.log('handle delete'),
        // },
       ]} /></div>
      },
    },
  ];     
export const data = [
  {
    model: 'Ident MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  },
  {
    model: 'eeex MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  },
  {
    model: 'addd MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  },
  {
    model: 'Ident MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  },
  {
    model: 'aaa MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  }, {
    model: 'dddd MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  }, {
    model: 'Ident MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  }, {
    model: 'Ident MV420',
    firmware: 'v7.0.5',
    series:'SIMATIC',
    type:'Controller',
    class: 'Controller',
    hardware:'Siemens',
    zone:'PLCs',
    lastseen:'02/13/2018 8:26 AM PT'
  }, 
  ];