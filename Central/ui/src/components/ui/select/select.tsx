import { ISelectProps } from "./types";
import styles from './select.module.css';
import classnames from "classnames";
import Label from "../typography/label";
export const Select = ({options, className, labelInfo, containerClassName}:ISelectProps) => {
        const {id, label} = labelInfo;
        const containerClasses = classnames(styles['container'], containerClassName);
        const classes = classnames(styles['select'], className);
        return(
        <div className={containerClasses}>
        {!!label && <Label className={styles['label']} children={label} />}
        <select className={classes} id={id} >
            {options && options?.map(({label, value}) => <option value={value}>{label}</option>)}
        </select>
        </div>
        )
};