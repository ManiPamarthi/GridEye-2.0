import { IInputProps } from "./types";
import styles from "./input-field.module.css";
import classnames from "classnames";
import Label from "../typography/label";
export const Input = ({
  className,
  children,
  isLoading,
  prefixIcon,
  suffixIcon,
  disabled,
  errorMessage,
  label,
  name,
  ...rest
}: IInputProps) => {
  return (
    <div className={classnames(styles["inputWrapper"], className)}>
      {!!label && (
        <Label htmlFor={name} children={label} className={styles["label"]} />
      )}
      <div className={styles["inputGroup"]}>
        {!!prefixIcon && (
          <span className={classnames(styles["prefixIcon"])}>{prefixIcon}</span>
        )}
        <input {...rest} />
        {!!suffixIcon && (
          <span className={classnames(styles["suffixIcon"])}>{suffixIcon}</span>
        )}
      </div>
      {!!errorMessage && (
        <span className={styles["errorMessage"]}>{errorMessage}</span>
      )}
    </div>
  );
};
