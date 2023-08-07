import { FC } from "react";
import styles from './aside.module.css';
import { Text } from "../Text/Text";

export const Aside: FC = () => {
  return (
    <aside className={styles.aside}>
      <Text As='h2' size={20} color={'secondary'}>Top Artists</Text>
    </aside>
  )
}