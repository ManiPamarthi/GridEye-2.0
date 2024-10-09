import classnames from 'classnames';
import Select from 'react-select'
import Label from '../typography/label';
import styles from './multi-select.module.css';
import { IMultiselectProps } from './types';

export const MultiSelect = ({options, labelInfo, className, containerClassName, customStyle = {}, isMulti = false, ...rest}: IMultiselectProps) => {
    const containerClass = classnames(styles['multi-select'], containerClassName);
    return(<div className={containerClass}>
        {!!labelInfo && <Label children={labelInfo.label}/>}
        <Select id={labelInfo?.id} options={options} styles={customStyle} isMulti={isMulti} className={className} {...rest} /></div>);
}