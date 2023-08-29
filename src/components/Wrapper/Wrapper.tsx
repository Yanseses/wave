import classNames from 'classnames';
import styles from './wrapper.module.css';
import { FC, PropsWithChildren } from "react";

interface IWrapper {
  As?: 'section' | 'div' | 'main',
  extraClass?: string
}

export const Wrapper: FC<PropsWithChildren<IWrapper>> = ({ children, As = 'div', extraClass }) => {
  const classname = classNames(
    styles.wrapper,
    extraClass
    )
    
  return (
    <As className={classname}>
      { children }
    </As>
    )
}