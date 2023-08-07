import styles from './genresList.module.css';
import { FC } from "react";
import { coverGenres } from "../../utils/coverGenres";
import { Text } from '../Text/Text';
import { PlayIcon } from '../../media/Icons/Navigate/PlayIcon';
import { Link } from 'react-router-dom';

export const GenresList: FC<any> = ({ genres }) => {
  return (
    <div className={styles.genres}>
      { genres?.map((genre: any) => (
        <Link 
          to={`/genres/${genre.urlPath}`} 
          key={genre.listid}
          className={styles.item} 
          style={{ backgroundImage: `url(${coverGenres[genre.name]})` }}
          state={{
            listId: genre.listid,
            name: genre.name
          }}>
          <div className={styles.bottomWrapper}>
            <Text As='p' size={18}>
              { genre.name }
            </Text>
            <PlayIcon />
          </div>
        </Link>
        )) 
      }
    </div>
  )
}