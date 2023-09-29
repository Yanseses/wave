import styles from './modalPlayer.module.css';
import { FC } from "react";

export const ModalPlayer: FC = () => {
  // style={{ backgroundColor: `#${activeSong?.images.joecolor.split(':')[activeSong?.images.joecolor.split(':').length - 1]}f2`}}
  return (
    <section className={styles.modalPlayer}>
      Modal Player
    </section>
  )
}