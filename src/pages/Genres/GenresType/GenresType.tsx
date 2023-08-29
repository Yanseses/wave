import styles from './genresType.module.css';
import { FC, useEffect } from "react";
import { Text } from '../../../components/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import { TrackList } from '../../../components/TrackList/TrackList';
import { Wrapper } from '../../../components/Wrapper/Wrapper';

export const GenresType: FC = () => {
  const navigator = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if(!state){
      navigator('/genres')
    }
  }, [navigator, state]);

  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      <Text As='h2' size={26}>{ `Genre: ${state && state.name}` }</Text>
      <TrackList listId={ state && state.listId} />
    </Wrapper>
  )
}