import styles from './trackList.module.css';
import { FC } from "react";
import { Track } from "./Track/Track";
import { ITrackData } from '../../utils/types';

interface ITrackList {
  tracks: ITrackData[] | any
}

export const TrackList: FC<ITrackList> = ({ tracks }) => {
  return (
    <ul className={styles.list}>
      { tracks && tracks.map((el: ITrackData, i: number) => {
        return (
          <Track key={el.key} data={el} index={i} />
          )
        })
      }
    </ul>
  )
}