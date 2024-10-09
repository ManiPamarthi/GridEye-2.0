import styles from './users.module.css';
import React from 'react';
import Table from '../../components/ui/table';
import Header from '../../components/header';
import { DropdownMenu } from '../../components/ui/drop-down-menu/drop-down-menu';
import { HamburgerVerticalIcon } from '../../components/ui/icons/hamburger-vertical-icon';
import Button from '../../components/ui/button';
import Badge from '../../components/ui/badge';
import Title from '../../components/ui/typography/title';
import { title } from 'process';
export const Users = () => {

  const policyListInspection = [{label:'DNP3'},{label:'MODBUS'},{label:'IEC 61850'},{label:'IEEE 2030.5'}]

    const columns = React.useMemo(
        () => [
          { id: 'name', header: 'Name', accessorKey: 'name', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'email', header: 'Email', accessorKey: 'email', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'password', header: 'Password',accessorKey: 'password', cell: (ctx:any) => {
            return <div className={styles['']}>{<Button children='Edit' className={styles['pwdEdit']}  />}</div>},}, 
          { id: 'role', header: 'Role', accessorKey: 'role', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'permissions', header: 'Permissions',accessorKey: 'permissions', cell: (ctx:any) => {
            return <div className={styles['']}>{<Badge variant='base' children='manage user' className={styles['permissionBox']} />}</div>},}, 
          { id: 'action', header: 'Action', cell: (ctx:any) => {
            return <div className={styles['kebabMenu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />} menu={[{
              title:'Edit',
              onClick:() => console.log('handle edit'),
            },
            {
              title:'Delete',
              onClick:() => console.log('handle delete'),
            }
          ]} /></div>},},
        ],
        []
      );
      
    const data = React.useMemo(
        () => [
          {
            name: "mani",
            email: "mani@utiltyx.com",
            password: "*******",
            role: "org-admin",
          },
          {
            name: "baji",
            email: "baji@gmail.com",
            password: "*******",
            role: "org-admin",
          },
          {
            name: "nick",
            email: "nick@utiltyx.com",
            password: "******",
            role: "org-admin",
          },
          {
            name: "central",
            email: "central@gmail.com",
            password: "******edit",
            role: "org-admin",
          },
          {
            name: "giri",
            email: "giri@gmail.com",
            password: "******",
            role: "org-admin",
          },
        ],
        []
      );
 return(<>
        <div className={styles['container']}>
        <Header  title='Users' actions={[{
              title:'ADD',
              onClick:() => alert('hello'),
              variant:'PRIMARY'
            }]} />
              <div className={styles['userTable']}>
        <Table className={styles['table']} columns={columns} data={data} /></div>
              </div>
 </>
 )
};
