import styles from './genresMain.module.css';
import { FC } from "react";
import { Text } from '../../../components/Text/Text';
import { useSelector } from '../../../services/hooks';
import { GenresList } from '../../../components/GenresList/GenresList';
import { Aside } from '../../../components/Aside/Aside';

export const GenresMain: FC = () => {
  const genres = useSelector(store => store.chart.genres.data);

  return (
    <main className={styles.genres}>
      <section className={styles.wrapper}>
        <Text As='h2' size={26}>Genres List</Text>
        { genres && (
          <GenresList genres={genres.global}/>
          ) 
        }
      </section>
      <Aside />
    </main>
  )
}