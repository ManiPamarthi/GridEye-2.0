import SideBar from '../../components/sidebar';
import styles from './dashboard-layout.module.css';
import { ViewContainer } from './view-container/view-container';
export const DashboardLayout = () => {
return (<div className={styles['container']}>
<SideBar />
<ViewContainer />
</div>);
};