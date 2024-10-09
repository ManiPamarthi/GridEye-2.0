import classNames from "classnames";
import styles from './paragraph.module.css';
type TLabelVariants = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
interface IBodyProps{
    variant:TLabelVariants;
    children:string;
    className: string;
};
export const Paragraph = ({
    children,
    variant,
    className,
    ...rest
}:IBodyProps) => {
 const classes = classNames(styles['paragraph'], styles[variant], styles[className]);   
 return(<p className={classes} {...rest}>{children}</p>)
};