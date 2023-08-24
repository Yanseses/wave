import styles from './genresList.module.css';
import { FC, useEffect, useState } from "react";
import { coverGenres } from "../../utils/coverGenres";
import { Text } from '../Text/Text';
import { PlayIcon } from '../../media/Icons/Navigate/PlayIcon';
import { Link } from 'react-router-dom';
import { TGenresCountry } from '../../utils/types';
import { useSelector } from '../../services/hooks';

interface IGenresList {
  type?: string
}

export const GenresList: FC<IGenresList> = ({ type }) => {
  const [ genres, setGenres ] = useState<any>();
  const { request, failed, error, data } = useSelector(store => store.genres);

  useEffect(() => {
    if(data){    
      switch(type){
        case 'global': {
          setGenres(data.global)
          break;
        }
        case 'country': {
          setGenres(data.country.genres)
          break;
        }
        default: {
          setGenres(data.global)
        }
      }
    }
  }, [data, type])

  return (
    <div className={styles.genres}>
      { request && (
        <Text As='p' size={20} color='secondary'>Loading...</Text>
        ) 
      }

      { !request && failed && (
        <Text As='p' size={20} color='secondary'>{ error }</Text>
        ) 
      }

      { !request && !failed && data && genres && genres.map((genre: TGenresCountry) => (
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