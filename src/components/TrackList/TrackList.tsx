import styles from './trackList.module.css';
import { FC } from "react";
import { Track } from "./Track/Track";
import { ITrack } from '../../utils/types';

interface ITrackList {
  tracks: ITrack[] | any
}

export const TrackList: FC<ITrackList> = ({ tracks }) => {
  return (
    <ul className={styles.list}>
      { tracks && tracks.map((el: ITrack, i: number) => {
        return (
          <Track key={el.key} data={el} index={i} />
          )
        })
      }
    </ul>
  )
}