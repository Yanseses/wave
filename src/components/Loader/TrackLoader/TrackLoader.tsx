import styles from './trackLoader.module.css';
import { IListLoader } from '../../../utils/types';
import { FC } from 'react'

export const TrackLoader: FC<IListLoader> = ({ size = 6 }) => {
  const tracks = new Array(size).fill('');

  return (
    <>
      { tracks.map((el, i) => (
        <li className={styles.track} key={i}>
          <div className={styles.container}>
            <div className={styles.number}></div>
            <div className={styles.avatar}></div>
            <div className={styles.text}></div>
          </div>
        </li>   
      )) }
    </>
  )
}