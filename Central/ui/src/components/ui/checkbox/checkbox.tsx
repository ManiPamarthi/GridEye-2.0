import { InputHTMLAttributes } from "react"
import styles from './checkbox.module.css';
import classNames from "classnames";
interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string;
}
export const CheckBox = ({label, name, className, ...rest}:ICheckboxProps) => {
    return (<div className={classNames(styles['checkbox'],className)}>
    <input type="checkbox" name={name} {...rest} />
    {label && <label htmlFor={name}>{label}</label>}
    </div>)
}