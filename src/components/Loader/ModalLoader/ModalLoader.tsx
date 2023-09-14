import styles from './modalLoader.module.css';
import { FC } from 'react'
import { ModalOverlay } from '../../Modal/ModalOverlay/ModalOverlay';

export const ModalLoader: FC = () => {
  return (
    <ModalOverlay>
      <section className={styles.modal}>
        <div className={styles.modal__spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </ModalOverlay>
  )
}