import Badge from "@/components/ui/badge";
import CheckBox from "../../components/ui/checkbox"
import { DropdownMenu } from "../../components/ui/drop-down-menu/drop-down-menu";
import { HamburgerVerticalIcon } from "../../components/ui/icons/hamburger-vertical-icon";
import styles from './alert-manager.module.css';

export const columns = [
    {
      id: 'select',
      size: 35,
      header: ({ table }:any) => (
        <CheckBox className={styles['checkboxCol']}
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
      id: 'risk_level',
      header: 'Risk Level',
      accessorKey: 'risk_level',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'timestamp',
      header: 'Timestamp',
      accessorKey: 'timestamp',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'type_id',
      header: 'Type ID',
      accessorKey: 'type_id',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'protocol',
      header: 'Protocol',
      accessorKey: 'protocol',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'ip_src',
      header: 'IP Src',
      accessorKey: 'ip_src',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'ip_dst',
      header: 'IP Dst',
      accessorKey: 'ip_dst',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'action',
      header: 'Action',
      cell: (ctx:any) => {
        return <div className={styles['kebab-menu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />} menu={[{
          title:'Edit',
          onClick:() => console.log('handle edit'),
        },
        {
          title:'Delete',
          onClick:() => console.log('handle delete'),
        },
       ]} /></div>
      },
    },
  ];     
export const data = [
  {
    risk_level: <Badge children="High - 4" variant="warning"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  },
  {
    risk_level: <Badge children="High - 4" variant="warning"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  },
  {
    risk_level: <Badge children="Medium - 3" variant="custom"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  },
  {
    risk_level: <Badge children="Low - 2" variant="success"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  },
  {
    risk_level: <Badge children="High - 4" variant="warning"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  }, 
  {
    risk_level: <Badge children="High - 4" variant="warning"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  },
  {
    risk_level: <Badge children="Critical - 5" variant="danger"/>,
    timestamp: '2020/02/14 19:03',
    type_id:'SIGN:MALWARE-DETECTED',
    description:'Suspicious transferring of malware...',
    protocol: 'http',
    ip_src:'10.41.132.168',
    ip_dst: '10.41.132.187',
  }, 
  ];