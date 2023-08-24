import styles from './genresMain.module.css';
import { FC } from "react";
import { Text } from '../../../components/Text/Text';
import { GenresList } from '../../../components/GenresList/GenresList';

export const GenresMain: FC = () => {
  return (
    <section className={styles.wrapper}>
      <Text As='h2' size={26}>Genres List</Text>
      <GenresList />
    </section>
  )
}