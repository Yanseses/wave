import { FC } from "react";
import styles from './header.module.css';

export const Header: FC = () => {
  return (
    <header className={styles.wrapper}>
      <ul className={styles.list}>
        <li>Header</li>
      </ul>
    </header>  
  )
}