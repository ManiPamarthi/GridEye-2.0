import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { DropdownMenu } from '../../components/ui/drop-down-menu/drop-down-menu';
import { CloseIcon, SearchIcon } from '../../components/ui/icons';
import Input from '../../components/ui/input-field';
import Table from '../../components/ui/table';
import Title from '../../components/ui/typography/title';
import styles from './asset-manager.module.css';
import { useAssetsMutation, useAssetsQuery } from '@/api/lib/assets';
import { HamburgerVerticalIcon } from '@/components/ui/icons/hamburger-vertical-icon';
import CheckBox from '@/components/ui/checkbox';
import { Modal } from '@/components/ui/modal/modal';
import { useFormik } from 'formik';
import Button from '@/components/ui/button';
export const AssetManager = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const  {data, status, refetch:refetchAssets} = useAssetsQuery.getAssets();
  const [activeAsset, setActiveAsset] = useState<[] | any>(null);
  const { mutate:updateAssets, isSuccess, isLoading } = useAssetsMutation.updateAssets();
const formatedData = [] as any;
const temp = data?.data;
temp?.forEach(({_source:data, _id}:any) => {
  formatedData.push({
    id:_id,
    IPAddress:data?.IPAddress,
    VendorName:data?.VendorName,
    Version: data?.Version,
    ProductCode: data?.ProductCode,
    Cpe: data?.Cpe,
    DeviceName:data?.DeviceName,
    Substation:data?.Substation,
  })
});
const formik = useFormik({
  initialValues: {
    ProductCode: activeAsset?.ProductCode,
    IPAddress: activeAsset?.IPAddress,
    VendorName: activeAsset?.VendorName,
    Version:activeAsset?.Version,
    Cpe:activeAsset?.Cpe,
    DeviceName:activeAsset?.DeviceName,
    substation:activeAsset?.Substation
  },
  enableReinitialize:true,
  onSubmit: (values:any) => {
    handleSubmit(values);
  },
});

const handleSubmit = (data:any) => {
  let _id = activeAsset['id'];
    const payload = {
      id:_id,
    updatedData: data
  }
  updateAssets(payload);
};
useEffect(() => {
if(isSuccess) {
  refetchAssets();
  setActiveAsset(null);
}
},[isSuccess])
const columns = [
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
    id: 'VendorName',
    header: 'Vendor Name',
    accessorKey: 'VendorName',
    cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  },
  {
    id: 'ProductCode',
    header: 'Product Code',
    accessorKey: 'ProductCode',
    cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  },
  {
    id: 'Version',
    header: 'Version',
    accessorKey: 'Version',
    cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  },
  // {
  //   id: 'Cpe',
  //   header: 'Cpe',
  //   accessorKey: 'Cpe',
  //   cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  // },
  {
    id: 'DeviceName',
    header: 'Device Name',
    accessorKey: 'DeviceName',
    cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  },
  {
    id: 'Substation',
    header: 'Substation',
    accessorKey: 'Substation',
    cell: (ctx: { getValue: () => any; }) => ctx.getValue(),
  },
  {
    id: 'action',
    header: 'action',
    cell: (ctx:any) => {
      return <div className={styles['kebab-menu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />} menu={[{
        title:'Edit',
        onClick:() => setActiveAsset(ctx.row.original),
      },
      // {
      //   title:'Delete',
      //   onClick:() => console.log('handle delete'),
      // },
     ]} /></div>
    },
  },
];
 return(
  <>
    <div className={styles['container']}>
        <Header title={'Asset Manager'} />
        {/* <div className={styles['subHeader']}>
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
          <DropdownMenu title="Filters" menu={[{
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
        <div className={styles['searchBox']}>
          <Input  className={styles['searchField']} prefixIcon={<SearchIcon width='18' height='18' fill={'var(--color-border)'} />} placeholder="search"
           value={globalFilter ?? ''}
           onChange={value => setGlobalFilter(String(value))}
          />
        </div>
        </div> */}
        <div className={styles['tableWrapper']}>
        <Title variant="T3" children={'OT assets'} />
        <Table className={styles['table']} columns={columns} data={formatedData} showPagination/>
        </div>
    </div>
     <Modal isOpen={activeAsset !== null} variant="" className={styles['editModal']}>
      <div className={styles['header']}>
     <Title children="Edit Asset" variant="T4" />
     <Button variant="TERTIARY"  startIcon={<CloseIcon color="#000" width="18" height="18" />} children={''} onClick={() => setActiveAsset(null)} />
     </div>
     <div className={styles['body']}>
     <form onSubmit={formik.handleSubmit} className={styles['formContainer']}>
    <Input type="text" name="IPAddress" id="IPAddress" value={formik.values.IPAddress} label="IP Address" onChange={formik.handleChange} />
    <Input type="text" name="VendorName" id="VendorName" value={formik.values.VendorName} label="Vendor Name" onChange={formik.handleChange} />
    <Input type="text" name="ProductCode" id="ProductCode" value={formik.values.ProductCode} label="Product Code" onChange={formik.handleChange} />
    <Input type="text" name="Version" id="Version" value={formik.values.Version} label="Version" onChange={formik.handleChange} />
    <Input type="text" name="DeviceName" id="DeviceName" value={formik.values.DeviceName} label="DeviceName" onChange={formik.handleChange} />
    <Input type="text" name="substation" id="substation" value={formik.values.substation} label="substation" onChange={formik.handleChange} />
    <Input type="text" name="Cpe" id="Cpe" value={formik.values.Cpe} label="Cpe" onChange={formik.handleChange} disabled/>
    <br/>
    <Button variant="PRIMARY" children={'Save'} type="submit" isLoading={isLoading} disabled={isLoading} />
     </form>
     </div>
     {/* {activeAsset?.map((asset:any) => )} */}
   </Modal>
   </>
)
};
