import Badge from "@/components/ui/badge";
import CheckBox from "../../components/ui/checkbox"
import { DropdownMenu } from "../../components/ui/drop-down-menu/drop-down-menu";
import styles from './attack-surface-monitoring.module.css';
import { DeleteIcon, DownloadIcon, RefreshIcon } from "@/components/ui/icons";

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
      id: 'scan_id',
      header: 'Scan ID',
      accessorKey: 'scan_id',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'scan_name',
      header: 'Scan Name',
      accessorKey: 'scan_name',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'severity',
      header: 'Severity',
      accessorKey: 'severity',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'assets',
      header: 'Assets',
      accessorKey: 'assets',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
        id: 'issues',
        header: 'Issues',
        accessorKey: 'issues',
        cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
      },
    {
      id: 'action',
      header: 'Action',
      cell: (ctx:any) => {
        return <div className={styles['kebab-menu']}><DownloadIcon fill={'var(--color-text-high)'} width="16" height="14" />
        <DropdownMenu customIcon={<RefreshIcon fill={'var(--color-text-high)'} width="16" height="14" />} menu={[{
          title:'Edit',
          onClick:() => console.log('handle edit'),
        },
        {
          title:'Delete',
          onClick:() => console.log('handle delete'),
        },
       ]} /><DeleteIcon fill={'var(--color-text-high)'} width="16" height="14" /></div>
      },
    },
  ];     
export const data = [
  {
    scan_id: '1-00166',
    scan_name: 'Sheet 1',
    date:'Dec 30,2019 07:52',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgeTextColor']} children="High" />,
    assets: '24',
    issues: '0',
  },
  {
    scan_id: '1-00165',
    scan_name: 'Book',
    date:'Dec 7,2019 23:26',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgefontColor']} children="N/A" />,
    assets: '24',
    issues: '0',
  },
  {
    scan_id: '1-00164',
    scan_name: 'DF_ASKD_UED_changed_2393',
    date:'Dec 30,2019 05:18',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgefontColor']} children="N/A" />,
    assets: '141',
    issues: '1',
  },
  {
    scan_id: '1-00163',
    scan_name: 'Scann_158',
    date:'Dec 4,2019 21:42',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgeTextColor']} children="High" />,
    assets: '28',
    issues: '0',
  },
  {
    scan_id: '1-00162',
    scan_name: 'ATTACHEMENT 836128956',
    date:'Mar 20,2019 23:14',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgeTextColor']} children="High" />,
    assets: '18',
    issues: '51',
  },
  {
    scan_id: '1-00161',
    scan_name: 'Draft1-changes-in.red-from-Simon',
    date:'Dec 30,2019 07:52',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgefontColor']} children="N/A"  variant="base"/>,
    assets: '23',
    issues: '19',
  },
  {
    scan_id: '1-00160',
    scan_name: 'picture1',
    date:'Feb 2,2019 19:28',
    status:<Badge className={styles['badgeBorderColor']} variant="success" children="Finished" />,
    type: 'ASSET',
    severity:<Badge className={styles['badgeTextColor']} children="High" />,
    assets: '80',
    issues: '3',
  },
  ];




  export const widgetcolumns = [
   
     {
      id: 'top_assets',
      header: 'Assets',
      accessorKey: 'top_assets',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
    {
      id: 'top_count',
      header: 'Count',
      accessorKey: 'top_count',
      cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
    },
  ];     

  export const widgetdata = [
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    {
      top_assets: 'https://github.com/dsgjsdngj',
      top_count: '265',
    },
    ];