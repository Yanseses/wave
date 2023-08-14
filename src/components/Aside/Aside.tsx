import { FC } from "react";
import styles from './aside.module.css';
import { Text } from "../Text/Text";

export const Aside: FC = () => {
  return (
    <aside className={styles.aside}>
      <Text As='h2' size={20} color={'secondary'}>Top Artists</Text>
      <div className={styles.wrapper}>
        <Text As="p" size={16} color={'secondary'} extraClass={styles.error}>Content is empty</Text>
      </div>
    </aside>
  )
}