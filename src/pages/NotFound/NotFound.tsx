import styles from './notFound.module.css';
import { FC } from "react";
import { Text } from "../../components/Text/Text";

export const NotFound: FC = () => {
  return (
    <main className={styles.notFound}>
      <Text As={'h1'} size={26}>
        Page Not found
      </Text>
    </main>
  )
}