import { InputHTMLAttributes, ReactNode } from "react";

export interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement>{
    prefixIcon?: JSX.Element;
    options: IOptionInfo[];
    labelInfo: ILabelInfo;
    className?: string;
    containerClassName?: string;
}
export interface IOptionInfo {
    label: string | ReactNode;
    value: string | null | any;
    isDisabled?: boolean;
  }
  
export interface ILabelInfo {
    label: string;
    id: string;
  }
  