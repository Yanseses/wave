import styles from './artisrsMain.module.css';
import { FC } from "react";
import { useSelector } from "../../../services/hooks";
import { Text } from '../../../components/Text/Text';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../../components/Wrapper/Wrapper';

export const ArtistsMain: FC = () => {
  const { request, failed, error, data } = useSelector(store => store.artists);

  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      <Text As='h2' size={26}>Top Artists</Text>
      <div className={styles.list}>
        { request && (
          <div>Loading...</div>
          ) 
        }

        { !request && failed && (
          <div>{ error }</div>
          ) 
        }

        { !request && !failed && data && data.map((el: any) => {
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