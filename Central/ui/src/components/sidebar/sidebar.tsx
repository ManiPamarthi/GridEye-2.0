import { GridEyeLogoSm, HamburgerMenu, Utiltyx_logo_lg } from './icons';
import styles from './sidebar.module.css';
import classnames from 'classnames';
import { isSidebarExpandedAtom } from './config';
import { useAtom } from 'jotai';
import { Menu } from './menu';
import { GridEyeLogoFull } from '../../assets/grid-eye-logo-full';
import { GridEyeLogoClipped } from '../../assets/grid-eye-logo-clipped';
import { HamburgerIcon } from '../ui/icons';

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useAtom(isSidebarExpandedAtom);
    return (
    <div className={classnames(styles['sidebar'], {
      [styles['isExpanded']]: isExpanded
    })}>
    <div className={styles['branding']}>
    <div className={styles['logo']}>
         {isExpanded ? <GridEyeLogoFull/> : <GridEyeLogoClipped/> }
         </div>
        <button className={styles['hamburgerMenu']} onClick={() => setIsExpanded(!isExpanded)}>
        <HamburgerIcon fill={'var(--color-monochrome-contrast)'} width={isExpanded ? '24' : '12'} />
         </button>
    </div>
    <Menu />
    </div>);
}