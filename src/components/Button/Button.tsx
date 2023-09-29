import styles from './button.module.css';
import classNames from "classnames";
import { FC, PropsWithChildren, SyntheticEvent } from "react";

export const Button: FC<PropsWithChildren<{ onClick?: () => void, extraClass?: string }>> = ({ 
  onClick, 
  extraClass,
  children
}) => {
  const classname = classNames(
    extraClass,
    styles.button
  )

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    if(typeof onClick === 'function') onClick()
  }

  return (
    <button onClick={handleClick} className={classname}>
      { children }
    </button>  
  )
}