import styles from './button.module.css';
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface IButton {
  onClick?: () => void,
  extraClass?: string
}

export const Button: FC<PropsWithChildren<IButton>> = ({ 
  onClick, 
  extraClass,
  children
}) => {
  const classname = classNames(
    extraClass,
    styles.button
  )

  return (
    <button onClick={onClick} className={classname}>
      { children }
    </button>  
  )
}