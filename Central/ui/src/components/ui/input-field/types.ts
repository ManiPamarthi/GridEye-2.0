import { InputHTMLAttributes } from "react";
export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: string;
    isLoading?:boolean,
    prefixIcon?: JSX.Element,
    suffixIcon?: JSX.Element,
    errorMessage?: string;
    label?:string;
}