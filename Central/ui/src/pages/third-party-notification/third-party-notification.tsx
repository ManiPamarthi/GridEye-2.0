import styles from './third-party-notification.module.css';
import React from 'react';
import Table from '../../components/ui/table';
import Header from '../../components/header';
import Button from '../../components/ui/button';
import { DropdownMenu } from "../../components/ui/drop-down-menu/drop-down-menu";
import { HamburgerVerticalIcon } from "../../components/ui/icons/hamburger-vertical-icon";
import Title from '@/components/ui/typography/title';
export const ThirdPartyNotification = () => {

    const columns = React.useMemo(
        () => [
          { id: 'name', header: 'Name', accessorKey: 'name', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, { id: 'server_url', header: 'Server URL', accessorKey: 'server_url', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, { id: 'protocol', header: 'Protocol', accessorKey: 'protocol', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, { id: 'port', header: 'Port', accessorKey: 'port', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, { id: 'format', header: 'Format', accessorKey: 'format', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), },
          { id: 'action', header: 'Action', cell: (ctx:any) => {
            return <div className={styles['kebab-menu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />} menu={[{
              title:'Edit',
              onClick:() => console.log('handle edit'),
            },
            {
              title:'Delete',
              onClick:() => console.log('handle delete'),
            },
           ]}  /></div>},},
        ],
        []
      );
      
    const data = React.useMemo(
        () => [
          {
            name: "ARCSI",
            server_url: "192.168.0.245",
            protocol: "TCP",
            port: "514",
            format: "JSON",
          },
          {
            name: "ARCSIEM",
            server_url: "192.168.0.245",
            protocol: "TCP",
            port: "514",
            format: "JSON",
          },
          {
            name: "local-siem",
            server_url: "127.0.0.1",
            protocol: "UDP",
            port: "514",
            format: "JSON",
          },
        ],
        []
      );

      const Apicolumns = React.useMemo(
        () => [
          { id: 'name', header: 'Name', accessorKey: 'name', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'server_url', header: 'Server URL', accessorKey: 'server_url', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'api', header: 'Api', accessorKey: 'api', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'method', header: 'Method', accessorKey: 'method', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'format', header: 'Format', accessorKey: 'format', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
          { id: 'user_agent', header: 'User Agent', accessorKey: 'user_agent', cell: (ctx: { getValue: () => any; }) => ctx.getValue(), }, 
           { id: 'action', header: 'Action', cell: (ctx:any) => {
              return <div className={styles['kebab-menu']}><DropdownMenu customIcon={<HamburgerVerticalIcon fill={'var(--color-gray)'} width="4" height="14" />}menu={[{
                title:'Edit',
                onClick:() => console.log('handle edit'),
              },
              {
                title:'Delete',
                onClick:() => console.log('handle delete'),
              },
             ]} /></div>},},
        ],
        []
      );
      
    const Apidata = React.useMemo(
        () => [
          {
            name: "new_response-ticket",
            server_url: "192.168.0.240",
            api: "a4db08b7-5729-8c08-f2df493465a1",
            method: "POST",
            format: "JSON",
            user_agent: "utilty-agent",
          },
          {
            name: "ARCSIEM",
            server_url: "192.168.0.240",
            api: "a4db08b7-5729-8c08-f2df493465a1",
            method: "POST",
            format: "JSON",
            user_agent: "utilty-agent",
          },
        ],
        []
      );
    return(
        <div className={styles['container']}>
        <Header title={'Third party Notification'} actions={[{
              title:'Add',
              onClick:() => alert('hello'),
              variant:'PRIMARY'
            }]} />
        <Title variant='T2' className={styles['subTitle']} children="Syslog/SIEM" />
    <Table className={styles['siemTable']} columns={columns} data={data} />
    
            <Title variant='T2' className={styles['subTitle']} children="API Integration" />
        <Table className={styles['apiTable']} columns={Apicolumns} data={Apidata} />
    </div>
    )
};