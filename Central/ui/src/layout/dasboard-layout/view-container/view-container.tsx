import classnames from 'classnames';
import { useAtomValue } from 'jotai';
import { Outlet, Route, Routes } from 'react-router-dom';
import { isSidebarExpandedAtom } from '../../../components/sidebar/config';
import AlertManager from '../../../pages/alert-manager';
import AssetManager from '../../../pages/asset-manager';
import AttackSurfaceMonitoring from '../../../pages/attack-surface-monitoring';
import ComplianceReports from '../../../pages/compliance-reports';
import DashboardPage from '../../../pages/dashboard';
import NetworkPage from '../../../pages/network';
import SettingsPage from '../../../pages/settings';
import ThirdPartyNotification  from '../../../pages/third-party-notification';
import VulnerabilityManager from '../../../pages/vulnerability-manager';
import AboutPage from '../../../pages/about-page';
import Policies from '../../../pages/policies';
import styles from './view-container.module.css';
import Users from '../../../pages/users';
import Updates from '../../../pages/updates';
import GridEyeEdge from '../../../pages/grid-eye-edge';

export const ViewContainer = () => {
 const isSideBarExpanded = useAtomValue(isSidebarExpandedAtom);
 return (
 <div className={classnames(styles['viewContainer'],{
    [styles['expanded']]: isSideBarExpanded
 })} >
<Outlet />
<div className={styles['viewContainerInner']}>
    <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path="/alert-manager" element={<AlertManager />} />
        <Route path="/asset-manager" element={<AssetManager />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/vulnerabilities-manager" element={<VulnerabilityManager />} />
        <Route path="/attack-surface-monitoring" element={<AttackSurfaceMonitoring />} />
        <Route path="/compliance-reports" element={<ComplianceReports />} />
        <Route path="/settings" element={<Policies />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/policies" element={<Policies />} />
        <Route path="/users" element={<Users />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/edge-device" element={<GridEyeEdge />} />
        <Route path="/third-party-notification" element={<ThirdPartyNotification />} />
        <Route path="/about" element={<AboutPage />} />
    </Routes>
</div>
 </div>)
};
