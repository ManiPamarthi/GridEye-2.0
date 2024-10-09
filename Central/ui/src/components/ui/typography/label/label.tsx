import classNames from "classnames";
import { ReactNode } from "react";
import styles from './label.module.css';
interface ILabelProps {
    children:ReactNode;
    className?: string;
    htmlFor?: string;
};
export const Label = ({
    children, 
    className,
    htmlFor,
    ...rest
}:ILabelProps) => {
 const classes = classNames(styles['label'], className);   
 return(<label htmlFor={htmlFor} className={classes} {...rest}>{children}</label>)
};