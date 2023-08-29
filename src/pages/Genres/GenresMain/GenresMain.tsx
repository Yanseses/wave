import styles from './genresMain.module.css';
import { FC } from "react";
import { Text } from '../../../components/Text/Text';
import { GenresList } from '../../../components/GenresList/GenresList';
import { Wrapper } from '../../../components/Wrapper/Wrapper';

export const GenresMain: FC = () => {
  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      <Text As='h2' size={26}>Genres List</Text>
      <GenresList />
    </Wrapper>
  )
}