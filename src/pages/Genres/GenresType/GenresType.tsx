import styles from './genresType.module.css';
import { FC, useEffect } from "react";
import { Text } from '../../../components/Text/Text';
import { useLocation, useNavigate } from 'react-router';
import { TrackList } from '../../../components/TrackList/TrackList';
import { Aside } from '../../../components/Aside/Aside';
import { useDispatch, useSelector } from '../../../services/hooks';
import { getGenresTrack } from '../../../services/thunks/main';

export const GenresType: FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { request, failed, data } = useSelector(store => store.main.tracks);
  const { state } = useLocation();

  useEffect(() => {
    if(!state){
      navigator('/home')
    }
  }, [state, navigator]);

  useEffect(() => {
    dispatch(getGenresTrack(state.listId))
  }, [dispatch, state.listId])

  return (
    <main className={styles.type}>
      <section className={styles.wrapper}>
        <Text As='h2' size={26}>{ `Genre: ${state && state.name}` }</Text>
        { !failed ?
          !request ? (
            <TrackList tracks={data} />
            ) : (
            <div>Loading...</div>  
          ) : (
            <div>Error</div>
          )
        }
      </section>
      <Aside />
    </main>
  )
}