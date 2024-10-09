import { IDropdownMenu } from "./types";
import styles from "./drop-down-menu.module.css";
import Body from "../typography/body";
import { CaretIcon } from "../icons";
import { useRef, useState } from "react";
import classnames from "classnames";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
export const DropdownMenu = (props: IDropdownMenu) => {
  const { title, menu, hideIcon = false, customIcon } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div className={styles["dropdownContainer"]} ref={ref}>
      <div
        className={styles["titleWrapper"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Body variant="B4" className={styles["title"]}>
          {title}
        </Body>
        {!hideIcon && !customIcon && <span
            className={classnames(styles["dropdownIcon"], {
              [styles["up"]]: isOpen,
            })}
          >
            <CaretIcon fill={"var(--color-border)"} width="14" height="14" />
          </span> }
          {!hideIcon && customIcon && <span
            className={classnames(styles["dropdownIcon"], {
              [styles["up"]]: isOpen,
            })}
          >
            {customIcon}
          </span> }
      </div>
      {isOpen && (
        <ul className={styles['content']}>
          {menu.map(({ title, onClick }) => (
            <li key={String(title)} onClick={onClick}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
