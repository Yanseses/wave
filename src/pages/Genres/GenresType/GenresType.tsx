import styles from './genresType.module.css';
import { FC, useEffect } from "react";
import { Text } from '../../../components/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import { TrackList } from '../../../components/TrackList/TrackList';

export const GenresType: FC = () => {
  const navigator = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if(!state){
      navigator('/genres')
    }
  }, [navigator, state])

  return (
    <main className={styles.type}>
      <section className={styles.wrapper}>
        <Text As='h2' size={26}>{ `Genre: ${state && state.name}` }</Text>
        <TrackList listId={ state && state.listId} />
      </section>
    </main>
  )
}