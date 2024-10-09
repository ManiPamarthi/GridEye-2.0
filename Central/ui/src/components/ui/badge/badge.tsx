import classNames from "classnames";
import { IBadgeProps } from "./type";
import styles from './badge.module.css';

export const Badge = ({
    variant = 'base',
    className,
    children,
    }:IBadgeProps) => {
    const classes = classNames(styles['badge'],styles[variant], className);
    return(
    <span  className={classes}>
    {children}
    </span>)
}