import classnames from "classnames";
import Button from "../button";
import Body from "../typography/body";
import { IWidget } from "./type";
import styles from './widget.module.css';
import { CaretIcon } from "../icons";
import { DropdownMenu } from "../drop-down-menu/drop-down-menu";
export const Widget = ({
 variant,
 className,
 title,
 body,
}:IWidget) => <div className={classnames(styles['widgetContainer'],className, styles[variant])}>
<div className={styles['header']}>
    <Body children={title} variant={"B1"} className={styles['title']} />
    <DropdownMenu menu={[
            {
                title:'Remove Widget',
                onClick:() => console.log('handle edit'),
              },
              {
                title:'Change Widget',
                onClick:() => console.log('handle delete'),
              },
    ]} />
</div>
<div className={styles['container']}>
    {body}
</div>
</div>;
 