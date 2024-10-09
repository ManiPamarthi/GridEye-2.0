import classnames from 'classnames';
import { Route, Routes } from 'react-router';
import styles from './app.module.css';
import RequireAuth from './components/require-auth-hoc';
import DashboardLayout from './layout/dasboard-layout';
import LoginPage from './pages/login';
function App() {
  return (<>
    <div id="app" className={classnames(styles['app'])}>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='*' element={<RequireAuth><DashboardLayout /></RequireAuth>} />
      </Routes>
    </div>
    <div id="modal-portal" />
    <div id="tooltip-portal" /></>
  );
}

export default App;
