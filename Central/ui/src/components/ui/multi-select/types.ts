import { Props } from "react-select"
interface IOptions {
    value:string;
    label:string;
}
interface ILabelInfo {
    id: string;
    label: string;
}
export interface IMultiselectProps extends Props {
    options:IOptions[];
    containerClassName?:string;
    className?: string;
    customStyle?: any;
    isMulti?: boolean;
    labelInfo?: ILabelInfo;
}