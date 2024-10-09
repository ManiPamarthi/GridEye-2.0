import Title from "../ui/typography/title";
import { IHeaderProps } from "./types";
import styles from './header.module.css';
import Input from "../ui/input-field";
import { SearchIcon } from "../ui/icons";
import Button from "../ui/button";
export const Header = ({title, showSearch = false, showNotification = false, actions = []}:IHeaderProps) => {
return(<div className={styles['header']}>
    <Title variant="T1" className={styles['title']}>{title}</Title>
    <div>
    {actions?.map(({title, onClick, variant = "PRIMARY"}:any) => <Button onClick={onClick} children={title} variant={variant} />)}
    {showSearch && <div><Input type="text" prefixIcon={<SearchIcon fill={'var(--color-monochrome-contrast)'} />} /></div>}
    {showNotification && <></>}
    </div>
</div>);
};