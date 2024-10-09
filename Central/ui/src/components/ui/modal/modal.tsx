import classnames from "classnames";
import { useCallback, useMemo } from "react";
import styles from "./modal.module.css";
const _appElementId = "app";
const _portalElementId = "modal-portal";
import ReactModal from 'react-modal';

export const Modal = ({
  children,
  overlayClassName: parentOverlayClassName,
  parentClassName,
  className: parentContentClassName,
  appElement: parentAppElement,
  appElementId,
  portalElementId,
  variant,
  ...rest
}: any) => {
  const appElement = useMemo(
    () =>
      parentAppElement ||
      (document.getElementById(appElementId || _appElementId) as HTMLElement),
    [parentAppElement, appElementId]
  );
  const portalSelector = useCallback(
    () =>
      document.getElementById(
        portalElementId || _portalElementId
      ) as HTMLElement,
    [portalElementId]
  );
  const overlayClassName = classnames(
    styles["overlay"],
    styles[`overlay--${variant}`],
    parentOverlayClassName
  );
  const contentClassName = classnames(
    styles["content"],
    styles[`content--${variant}`],
    parentContentClassName
  );

  return (
    <ReactModal
      appElement={appElement}
      parentSelector={portalSelector}
      overlayClassName={overlayClassName}
      className={contentClassName}
      {...rest}
    >
      {children}
    </ReactModal>
  );
};
