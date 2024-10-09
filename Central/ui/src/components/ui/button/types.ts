import { ButtonHTMLAttributes, ReactNode } from "react";

type TButtonVariant = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: TButtonVariant;
    isLoading?: boolean;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    style?: React.CSSProperties;
    startIconClassname?:string;
    endIconClassname?:string;
    children:ReactNode;
};

