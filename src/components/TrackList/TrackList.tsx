import styles from './trackList.module.css';
import { FC, useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ paginator, setPaginator ] = useState<number>(0);
  const { data: tracks, isFetching, isError } = useGetTracksByKeyQuery({listId, paginator});
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && !isFetching && !isError){
        setPaginator((prevState) => prevState + 20)
      }
    }, {
      rootMargin: '10px'
    })

    if(scrollRef.current) observer.observe(scrollRef.current);

    return () => {
      if(scrollRef.current) observer.unobserve(scrollRef.current);
    }
  }, [isError, isFetching, paginator]);

  console.log(tracks)

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

      { isFetching && (
        <TrackLoader size={6}/>
        )
      }

      <div ref={scrollRef} />

      { !isFetching && isError && (
        <Text As='p' size={20} color='secondary'>{'You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/apidojo/api/shazam'}</Text> 
        ) 
      }
    </ul>
  )
}