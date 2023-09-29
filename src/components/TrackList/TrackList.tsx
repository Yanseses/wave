import styles from './trackList.module.css';
import { FC, useEffect } from "react";
import { Track } from "./Track/Track";
import { ITrackData } from '../../services/types/types';
import { Text } from '../Text/Text';
import { useDispatch, useSelector } from '../../services/hooks';
import { setActiveSong } from '../../services/features/playerSlice';
import { containTrack } from '../../utils/containTrack';
import { TrackLoader } from '../Loader';
import { useGetTracksByKeyQuery } from '../../services/query/shazamApi';

export const TrackList: FC<{ listId: string }> = ({ listId }) => {
  const dispatch = useDispatch();
  const { data: tracks, isFetching, isError } = useGetTracksByKeyQuery(listId);
  const { isPlaying, activeSong } = useSelector(store => store.player);
  
  useEffect(() => {
    if(!activeSong && tracks){
      const correctIndex = containTrack(0, tracks, 'current');
      dispatch(setActiveSong({
        song: tracks[correctIndex], 
        list: tracks, 
        index: correctIndex 
      }))
    }
  }, [ tracks, activeSong, dispatch ]);

  if(isFetching){
    return (
      <ul className={styles.list}>
        <TrackLoader size={6}/>
      </ul>
    )
  }

  if(!isFetching && isError){
    return (
      <Text As='p' size={20} color='secondary'>{ 'Ошибка запроса' }</Text> 
    )
  }

  return (
    <ul className={styles.list}>
      { tracks && tracks.map((el: ITrackData, i: number) => (
        <Track 
          activeSong={activeSong} 
          key={el.key} 
          song={el} 
          data={tracks} 
          index={i}
          isPlaying={isPlaying} />
      ))}
    </ul>
  )
}