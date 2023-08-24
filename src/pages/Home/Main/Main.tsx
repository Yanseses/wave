import styles from './main.module.css';
import { FC } from "react";
import { GenresList } from '../../../components/GenresList/GenresList';
import { Input } from '../../../components/Input/Input';
import { TrackList } from '../../../components/TrackList/TrackList';
import { useForm } from '../../../hooks/useForm';
import { SearchIcon } from '../../../media/Icons/Navigate/SearchIcon';
import { useSelector } from '../../../services/hooks';
import { Text } from '../../../components/Text/Text';
import { HeadsetIcon, NoteIcon } from '../../../media/Icons';

export const Main: FC = () => {
  const genres = useSelector(store => store.genres.data);
  const { values, handleChange } = useForm({
    search: {
      error: false,
      data: ''
    }
  });

  return (
    <section className={styles.wrapper}>
      <Input
        value={values.search.data} 
        name={'search'} 
        placeholder='Search music, artist, genre'
        onChange={handleChange}
        error={values.search.error} 
        Icon={SearchIcon}/>
      <div className={styles.container}>
        <Text As={'h2'} size={26} extraClass={styles.heading}>
          <NoteIcon />
          Discover genre
        </Text>
        <GenresList type='country'/>
      </div>
      <div className={styles.container}>
        <Text As={'h2'} size={26} extraClass={styles.heading}>
          <HeadsetIcon />
          Top Charts
        </Text>
        <TrackList listId={genres && genres.country.listid} />
      </div>
    </section>
  )
}