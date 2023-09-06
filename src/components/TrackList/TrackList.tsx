import styles from './trackList.module.css';
import { FC, useEffect } from "react";
import { Track } from "./Track/Track";
import { ITrackData, useGetTracks } from '../../hooks/useGetTracks';
import { Text } from '../Text/Text';
import { useDispatch, useSelector } from '../../services/hooks';
import { setActiveSong } from '../../services/actions/player';
import { getCookie } from '../../utils/cookie';

interface ITrackList {
  listId: string
}

export const TrackList: FC<ITrackList> = ({ listId }) => {
  const dispatch = useDispatch();
  const { data, request, failed, error } = useGetTracks(listId || `ip-country-chart-${getCookie('country')}`);
  const { isPlaying, activeSong } = useSelector(store => store.player);

  useEffect(() => {
    if(!activeSong && data){
      dispatch(setActiveSong(data[0], data, 0))
    }
  }, [ data, activeSong, dispatch ]);

  return (
    <ul className={styles.list}>
      { request && ( 
        <Text As='p' size={20} color='secondary'>Loading...</Text>
      )}

      { !request && failed && (
        <Text As='p' size={20} color='secondary'>{ error }</Text> 
      )}

      { !failed && !request && data && data.map((el: ITrackData, i: number) => (
        <Track 
          activeSong={activeSong} 
          key={el.key} 
          song={el} 
          data={data} 
          index={i}
          isPlaying={isPlaying} />
      ))}
    </ul>
  )
}