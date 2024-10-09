import { ReactNode } from "react";

type TBadgeVariants = 'base' | 'success' | 'warning' | 'danger' | 'custom';
export interface IBadgeProps {
    variant?:TBadgeVariants;
    className?:string;
    customColor?:string;
    children: ReactNode;
    }