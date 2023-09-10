import styles from './genresType.module.css';
import { FC, useEffect } from "react";
import { Text } from '../../../components/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import { TrackList } from '../../../components/TrackList/TrackList';
import { Wrapper } from '../../../components/Wrapper/Wrapper';
import { Header } from '../../../components/Header/Header';

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
      <Header>
        <Text As='h2' size={40}>{state && state.name}</Text>
      </Header>
      <Wrapper As='div'>
        <TrackList listId={ state && state.listId} />
      </Wrapper>
    </Wrapper>
  )
}