import { FC, PropsWithChildren } from "react";
import styles from './header.module.css';

interface IHeader {
  color?: string
}

export const Header: FC<PropsWithChildren<IHeader>> = ({ color, children }) => {
  return (
    <section className={styles.wrapper} style={{ background: color ? `linear-gradient(180deg, ${ color } 0, var(--background-main) 100%)` : `linear-gradient(180deg, #fff0 0, var(--background-main) 100%), var(--background-gradient)` }}>
      { children }
    </section>
  )
}