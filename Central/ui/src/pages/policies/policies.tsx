import CheckBox from '../../components/ui/checkbox';
import styles from './policies.module.css';
import { IPoliciesProps } from './types';
import Title from '../../components/ui/typography/title';
import Header from '@/components/header';

export const Policies = () => {
    const policyList = [{label:'Trojan'},{label:'Botnets'},{label:'Backdoors'},{label:'Vulnerabilities'},{label:'Exploits'},{label:'Rogue Endpoints'},{label:'Networks Reconnaissance'},
                        {label:'Access Point Spoofing'},{label:'Suspicious OT operation Commands'},{label:'~Net-Worms'},{label:'DDOS'},{label:'Ransomware'},{label:'UnAuthorized Access'}];
    const policyListInspection = [{label:'DNP3'},{label:'MODBUS'},{label:'IEC 61850'},{label:'IEEE 2030.5'}]

    return(
    <>
        <div className={styles['Container']}>
                <Header title='Policies' />
        <section className={styles['topCard']}>
            <Title variant='T3' className={styles['subTitle']} children="Detection Policies" />
                    <div className={styles['checkList']} >
{policyList.map(({label}) => <p className={styles['CheckboxWrapper']}> <CheckBox className={styles['CheckboxContainer']} label={label} /></p>)}
                    </div>
        </section>
        <section className={styles['bottomCard']}>
            <Title variant='T1' className={styles['subTitle']} children="Deep Packet Inspection" />
                <div className={styles['checkList']} >
{policyListInspection.map(({label}) => <p className={styles['CheckboxWrapper']}><CheckBox className={styles['CheckboxContainer']} label={label} /></p>)}
                </div>
        </section>
    </div>
    </>
    )
}