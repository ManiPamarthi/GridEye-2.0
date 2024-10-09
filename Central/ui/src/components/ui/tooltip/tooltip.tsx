import classNames from "classnames";
import { ITooltipProps } from "./type";
import styles from './tooltip.module.css';

export const Tooltip = ({
    className,
    children,
    }:ITooltipProps) => {
    const classes = classNames(styles['tooltip'], className);
    return(
    <span className={classes}>
        <div className={styles['tooltip-arrow']} ></div>
        <div className={styles['tooltip-inner']}>ToolTip Component</div>
    </span>)
}