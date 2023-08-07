import styles from './trackList.module.css';
import { FC } from "react";
import { Track } from "./Track/Track";

interface ITrackList {
  tracks: any
}

export const TrackList: FC<ITrackList> = ({ tracks }) => {
  return (
    <ul className={styles.list}>
      { tracks && tracks.map((el: any, i: number) => {
        return (
          <Track key={el.id} data={el} index={i} />
          )
        })
      }
    </ul>
  )
}