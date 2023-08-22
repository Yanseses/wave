import styles from './trackList.module.css';
import { FC } from "react";
import { Track } from "./Track/Track";
import { ITrackData } from '../../utils/types';
import { useGetTracks } from '../../hooks/useGetTracks';
import { Text } from '../Text/Text';
import { useSelector } from '../../services/hooks';

interface ITrackList {
  listId?: string
}

export const TrackList: FC<ITrackList> = ({ listId }) => {
  const { data, request, failed, error } = useGetTracks(listId);
  const { isPlaying, activeSong } = useSelector(store => store.player);

  return (
    <ul className={styles.list}>
      { request && ( 
        <Text As='p' size={20} color='secondary'>Loading...</Text>
      )}

      { failed && (
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