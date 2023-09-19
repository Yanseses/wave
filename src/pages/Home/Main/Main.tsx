import styles from './main.module.css';
import { FC } from "react";
import { GenresList } from '../../../components/GenresList/GenresList';
import { TrackList } from '../../../components/TrackList/TrackList';
import { Text } from '../../../components/Text/Text';
import { HeadsetIcon } from '../../../media/Icons';
import { Wrapper } from '../../../components/Wrapper/Wrapper';
import { getCookie } from '../../../utils/cookie';

export const Main: FC = () => {
  const country = getCookie('country')!.length > 3 
    ? getCookie('country')?.split('-')[1] 
    : getCookie('country')?.toUpperCase();

  return (
    <Wrapper extraClass={styles.wrapper}>
      <GenresList type='country'/>
      <section className={styles.container}>
        <Text As={'h2'} size={26} extraClass={styles.heading}>
          <HeadsetIcon />
          Top Charts
        </Text>
        <TrackList listId={`ip-country-chart-${country}`} />
      </section>
    </Wrapper>
  )
}