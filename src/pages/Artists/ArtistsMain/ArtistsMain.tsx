import styles from './artisrsMain.module.css';
import { FC } from "react";
import { Text } from '../../../components/Text/Text';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../../components/Wrapper/Wrapper';
import { useGetArtistsQuery } from '../../../services/query/shazamApi';

export const ArtistsMain: FC = () => {
  const { data: artists, isFetching, isError } = useGetArtistsQuery('');

  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      <Text As='h2' size={26}>Top Artists</Text>
      <div className={styles.list}>
        { isFetching && (
          <Text size={16} color={'secondary'}>Loading...</Text>
          ) 
        }

        { !isFetching && isError && (
          <Text size={16} color={'secondary'}>Ошибка сервера</Text>
          )   
        }

        { artists && artists.map((el: any) => {
          return (
            <Link 
              key={el.artist.adamid}
              to={`./${el.artist.alias}`}
              className={styles.artist}
              state={{ id: el.artist.adamid, name: el.name }}>
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