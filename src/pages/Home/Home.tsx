import styles from './home.module.css';
import { FC } from "react";
import { Text } from "../../components/Text/Text";
import { Aside } from "../../components/Aside/Aside";
import { GenresList } from "../../components/GenresList/GenresList";
import { TrackList } from "../../components/TrackList/TrackList";
import { useSelector } from '../../services/hooks';

export const Home: FC = () => {
  const chartTracks = useSelector(store => store.main.chart.data);
  const genres = useSelector(store => store.main.genres.data);

  return (
    <main className={styles.home}>
      <section className={styles.wrapper}>
        { genres && (
          <div className={styles.container}>
            <Text As={'h2'} size={26}>Discover genre</Text>
            <GenresList genres={genres.country}/>
          </div>
          ) 
        }
        { chartTracks.length > 0 && (
          <div className={styles.container}>
            <Text As="h2" size={26}>Top Music</Text>
            <TrackList tracks={chartTracks} />
          </div>
          ) 
        }
      </section>
      <Aside />
    </main>
  )
}