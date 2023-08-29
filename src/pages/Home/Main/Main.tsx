import styles from './main.module.css';
import { FC } from "react";
import { GenresList } from '../../../components/GenresList/GenresList';
import { TrackList } from '../../../components/TrackList/TrackList';
import { useSelector } from '../../../services/hooks';
import { Text } from '../../../components/Text/Text';
import { HeadsetIcon } from '../../../media/Icons';
import { Wrapper } from '../../../components/Wrapper/Wrapper';

export const Main: FC = () => {
  const genres = useSelector(store => store.genres.data);

  return (
    <Wrapper extraClass={styles.wrapper}>
      <GenresList type='country'/>
      <section className={styles.container}>
        <Text As={'h2'} size={26} extraClass={styles.heading}>
          <HeadsetIcon />
          Top Charts
        </Text>
        <TrackList listId={genres && genres.country.listid} />
      </section>
    </Wrapper>
  )
}