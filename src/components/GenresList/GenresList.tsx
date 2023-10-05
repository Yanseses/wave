import styles from './genresList.module.css';
import { FC, useEffect, useState } from "react";
import { coverGenres } from "../../utils/coverGenres";
import { Text } from '../Text/Text';
import { PlayIcon } from '../../media/Icons/Navigate/PlayIcon';
import { Link } from 'react-router-dom';
import { IGenresGlobal, TGenresItem } from '../../services/types/types';
import { GenreLoader } from '../Loader/GenreLoader/GenreLoader';
import { useGetGenresQuery } from '../../services/query/shazamApi';

export const GenresList: FC<{ type?: string }> = ({ type }) => {
  const [ genres, setGenres ] = useState<TGenresItem[] | IGenresGlobal[]>();
  const { isFetching, isError, data: genre } = useGetGenresQuery('');

  useEffect(() => {
    if(genre){    
      switch(type){
        case 'global': {
          setGenres(genre.global)
          break;
        }
        case 'country': {
          setGenres(genre.country.genres)
          break;
        }
        default: {
          setGenres(genre.global)
        }
      }
    }
  }, [genre, type]);

  if(isFetching){
    return (
      <section className={styles.section}>
        <GenreLoader size={type === 'country' ? 3 : 6}/>
      </section>
    )
  }

  if(!isFetching && isError){
    return (
      <section className={styles.error}>
        <Text As='p' size={20} color='secondary'>{ 'You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/apidojo/api/shazam' }</Text>
      </section>  
    )
  }

  return (
    <section className={styles.section}>
      { genres && genres.map((genre: TGenresItem | IGenresGlobal) => (
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