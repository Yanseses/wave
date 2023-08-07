import styles from './genresType.module.css';
import { FC, useEffect } from "react";
import { Text } from '../../../components/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import { TrackList } from '../../../components/TrackList/TrackList';
import { countryChartRuPop } from '../../../utils/mocks/charts';
import { Aside } from '../../../components/Aside/Aside';

export const GenresType: FC = () => {
  const navigator = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if(!state){
      navigator('/home')
    }
  }, [state, navigator]);

  return (
    <main className={styles.type}>
      <section className={styles.wrapper}>
      { state && (
        <>
          <Text As='h2' size={26}>{ `Genre: ${state && state.name}` }</Text>
          <TrackList tracks={countryChartRuPop.tracks} />
        </>
        ) 
      }
      </section>
      <Aside />
    </main>
  )
}