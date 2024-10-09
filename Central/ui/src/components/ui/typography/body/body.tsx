import classNames from "classnames";
import styles from './body.module.css';
type TLabelVariants = 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6';
interface IBodyProps{
    variant:TLabelVariants;
    children:React.ReactNode;
    className: string;
};
export const Body = ({
    children,
    variant,
    className,
    ...rest
}:IBodyProps) => {
 const classes = classNames(styles['body'], styles[variant], className);   
 return(<p className={classes} {...rest}>{children}</p>)
};