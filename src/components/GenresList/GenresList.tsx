import styles from './genresList.module.css';
import { FC, useEffect, useState } from "react";
import { coverGenres } from "../../utils/coverGenres";
import { Text } from '../Text/Text';
import { PlayIcon } from '../../media/Icons/Navigate/PlayIcon';
import { Link } from 'react-router-dom';
import { IGenresGlobal, TGenresItem } from '../../services/actions/genres';
import { useSelector } from '../../services/hooks';
import { GenreLoader } from '../Loader/GenreLoader/GenreLoader';

interface IGenresList {
  type?: string
}

export const GenresList: FC<IGenresList> = ({ type }) => {
  const [ genres, setGenres ] = useState<TGenresItem[] | IGenresGlobal[]>();
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
    <section className={styles.section}>
      { request && (
        <GenreLoader size={type === 'country' ? 3 : 6}/>
        ) 
      }

      { !request && failed && (
        <Text As='p' size={20} color='secondary'>{ error }</Text>
        ) 
      }

      { !request && !failed && data && genres && genres.map((genre: TGenresItem | IGenresGlobal) => (
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
    </section>
  )
}