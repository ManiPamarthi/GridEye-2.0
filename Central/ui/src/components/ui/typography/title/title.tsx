import classNames from "classnames";
import styles from './title.module.css';
type TTitleVariant = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';
interface ITitleProps {
    variant?:TTitleVariant;
    children:React.ReactNode;
    className?: string;
};
export const Title = ({
    children,
    variant = 'T1',
    className,
    ...rest
}:ITitleProps) => {
 const classes = classNames(styles['title'], styles[variant], className);
 if(variant === 'T1') {
    return(<h1 className={classes} {...rest}>{children}</h1>)
 }
 if(variant === 'T2') {
    return(<h2 className={classes} {...rest}>{children}</h2>)
 }
 if(variant === 'T3') {
    return(<h3 className={classes} {...rest}>{children}</h3>)
 }
 if(variant === 'T4') {
    return(<h4 className={classes} {...rest}>{children}</h4>)
 }
 if(variant === 'T5') {
    return(<h5 className={classes} {...rest}>{children}</h5>)
 }
 if(variant === 'T6') {
    return(<h6 className={classes} {...rest}>{children}</h6>)
 }
 return(<h6 className={classes} {...rest}>{children}</h6>)
};