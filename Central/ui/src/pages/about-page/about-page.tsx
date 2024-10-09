import styles from './about-page.module.css';
import { GridEyeLogoFull } from '../../assets/grid-eye-logo-full';
import SecureIcon from '../../assets/secureicon.png';
export const AboutPage = () => {
    return(
        <div className={styles['logoContainer']}>
            <div className={styles['logo']}>
            <GridEyeLogoFull />
            </div>
            <img src={SecureIcon} className={styles['secureIcon']} alt='' />
        </div>
    )
}