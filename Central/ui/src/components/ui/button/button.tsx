import classNames from "classnames";
import { IButtonProps } from "./types";
import styles from './button.module.css';
export const Button = ({
    className,
    variant = 'PRIMARY',
    children,
    isLoading,
    startIcon,
    endIcon, 
    ...rest
}:IButtonProps) => {
const classes = classNames(styles['button'], className, styles[variant])
// TODO: add a loader, disabled state color
 return(<button className={classes} {...rest}>
    <span>{startIcon}</span>{children}<span>{endIcon}</span>
 </button>)
};