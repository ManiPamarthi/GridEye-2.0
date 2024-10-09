import { NavLink } from "react-router-dom";
import { menuItems } from "./menu-items";
import styles from './sidebar.module.css';
export const Menu = () => {
  const handleActiveLink = (isActive:boolean) => isActive ? styles['menuLinkActive'] : styles['menuLink'];
  return (
    <div className={styles['menu']}>
      {menuItems?.map(({ path, id, Component }: any) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) => handleActiveLink(isActive)}
        >
          {({ isActive }) => <Component isActive={isActive} />}
        </NavLink>
      ))}
    </div>
  );
};
