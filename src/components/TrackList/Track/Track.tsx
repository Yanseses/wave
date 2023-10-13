import styles from './track.module.css';
import classNames from 'classnames';
import { useDispatch } from '../../../services/hooks';
import { ITrackData } from '../../../services/types/types';
import { playPause, setActiveSong } from '../../../services/features/playerSlice';
import { BanIcon, PlayIcon, StopIcon, WaveIcon } from '../../../media/Icons';
import { FC, useCallback } from "react";
import { Text } from '../../Text/Text';
import { Avatar } from '../../Player/Avatar/Avatar';
import { useMediaQuery } from 'react-responsive';

interface ITrack {
  index: number,
  activeSong: ITrackData | null,
  isPlaying: boolean,
  song: ITrackData,
  data: ITrackData[]
}

export const Track: FC<ITrack> = ({ song, isPlaying, activeSong, data, index }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1200px)' });
  const dispatch = useDispatch();
  const classes = classNames(
    styles.track,
    song.hub.actions 
      ? song.key === activeSong?.key && styles.status_selected
      : styles.status_inactive
  )

  const handlePlay = useCallback(() => {
    if(song && song.hub.actions){
      if(activeSong && activeSong.key === song.key){
        dispatch(playPause(!isPlaying))
      } else {
        dispatch(playPause(true))
      }
      dispatch(setActiveSong({
        song: song,
        list: data,
        index: index
      }))
    }
  }, [activeSong, data, dispatch, index, isPlaying, song]);
  
  return (
    <li 
      onClick={handlePlay}
      className={classes}>
      <div className={styles.container}>
        <Text As={'span'} color='inherit' size={26}>
          { index >= 9 ? index + 1 : `0${index + 1 }`}
        </Text>
        <Avatar 
          name={song.share.text} 
          image={ song.share.avatar ? song.share.avatar : song.share.image } 
          activeClass={activeSong && activeSong.key === song.key && song.hub.actions ? styles.avatar_active: ''}
          />
        <Text As={'p'} color='inherit' extraClass={styles.text} size={16}>
          {`${song.subtitle} - ${song.title}`}
        </Text>
      </div>
      { !isTablet && (        
        <div>
          { activeSong && song.key === activeSong.key && isPlaying && ( <WaveIcon size={50}/> ) }
        </div>
        ) 
      }
      { !song.hub.actions 
        ? ( <BanIcon size={25} color={ 'grey' } /> )
        : activeSong 
          ? song.key === activeSong.key && isPlaying
            ? ( <StopIcon size={25} color={ song.key === activeSong.key ? 'purple' : 'white' } /> ) 
            : ( <PlayIcon size={25} color={ song.key === activeSong.key ? 'purple' : 'white' } /> )
          : ( <PlayIcon size={25} /> )
      }
    </li>  
  )
}