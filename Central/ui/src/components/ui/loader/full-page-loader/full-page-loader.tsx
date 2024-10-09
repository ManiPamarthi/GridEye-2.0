import styles from './full-page-loader.module.css';
import grideyeLogo from '@/assets/grid-eye-logo-light.svg';
import Body from '../../typography/body';
export const FullPageLoader = () => {
    return(
    <div className={styles['container']}>
        <img src={grideyeLogo} className={styles['loaderText']} />
        <Body variant='B2' className={styles['loaderText']}>
        Credentials being validated...
        </Body>
    </div>);
};