import { PlayIcon } from '../../../media/Icons/Navigate/PlayIcon';
import styles from './genreLoader.module.css';
import { FC } from "react";

export const GenreLoader: FC<{ size: number }> = ({ size = 3 }) => {
  const genres = new Array(size).fill('');
  return (
    <>
      { genres.map((el, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.bottomWrapper}>
            <div></div>
            <PlayIcon />
          </div>
        </div>  
        )) }
    </>
  )
}