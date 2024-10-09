interface IActionProps {
    title:string;
    onClick: () => void; 
    variant: TButtonVariant;
}
type TButtonVariant = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
export interface IHeaderProps {
    title:string;
    showSearch?:boolean;
    showNotification?:boolean;
    actions?: IActionProps[];
};