import styles from './home.module.css';
import { FC } from "react";
import { Text } from "../../components/Text/Text";
import { Aside } from "../../components/Aside/Aside";
import { GenresList } from "../../components/GenresList/GenresList";
import { TrackList } from "../../components/TrackList/TrackList";
import { useSelector } from '../../services/hooks';
import { Input } from '../../components/Input/Input';
import { useForm } from '../../hooks/useForm';
import { SearchIcon } from '../../media/Icons/Navigate/SearchIcon';
import { Loader } from '../../components/Loader/Loader';

export const Home: FC = () => {
  const { values, handleChange } = useForm({
    search: {
      error: false,
      data: ''
    }
  });
  const chartTracks = useSelector(store => store.main.chart.data);
  const genres = useSelector(store => store.main.genres.data);

  return (
    <>
      { genres && chartTracks ? (
        <main className={styles.home}>
          <section className={styles.wrapper}>
            <Input 
              value={values.search.data} 
              name={'search'} 
              placeholder='Search music, artist, genre'
              onChange={handleChange} 
              error={values.search.error} 
              Icon={SearchIcon}/>
            { genres && (
              <div className={styles.container}>
                <Text As={'h2'} size={26}>Discover genre</Text>
                <GenresList genres={genres.country}/>
              </div>
              ) 
            }
            { chartTracks && (
              <div className={styles.container}>
                <Text As="h2" size={26}>Top Charts</Text>
                <TrackList tracks={chartTracks} />
              </div>
              ) 
            }
          </section>
          <Aside />
        </main>
      ) : (
        <Loader />
      ) 
      }
    </>
  )
}