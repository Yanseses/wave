import styles from './artisrsMain.module.css';
import { FC } from "react";
import { Text } from '../../../components/Text/Text';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../../components/Wrapper/Wrapper';
import { useGetArtistsQuery } from '../../../services/query/shazamApi';

export const ArtistsMain: FC = () => {
  const { data: artists, isFetching, isError } = useGetArtistsQuery('');

  if(isFetching){
    return ( <div>Loading...</div> )
  }

  if(!isFetching && isError){
    return ( <div>{ 'Ошибка сервера' }</div> )
  }

  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      <Text As='h2' size={26}>Top Artists</Text>
      <div className={styles.list}>
        { artists && artists.map((el: any) => {
          return (
            <Link 
              key={el.artist.adamid}
              to={`./${el.artist.alias}`}
              className={styles.artist}
              state={{ id: el.artist.adamid }}>
                <img src={el.image} alt={el.name} className={styles.image} />
                <Text As='p' size={20} extraClass={styles.text}>{ el.name }</Text>
            </Link>
            )
          })
        }
      </div>
    </Wrapper>
  )
}