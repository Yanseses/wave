import { NextTrackIcon, PlayIcon, PrevTrackIcon, RepeatIcon, StopIcon, SuffleIcon } from '../../../media/Icons';
import { Button } from '../../Button/Button';
import styles from './controls.module.css';
import { FC } from "react";

interface IControls {
  isMobile: boolean,
  isPlaying: boolean,
  isShuffle: boolean,
  isRepeat: boolean,
  onPlay(): void,
  onShuffle(): void,
  onRepeat(): void,
  onPrevTrack(): void,
  onNextTrack(): void
}

export const Controls: FC<IControls> = ({ 
  isMobile, 
  isPlaying, 
  isShuffle, 
  isRepeat, 
  onPlay, 
  onShuffle, 
  onRepeat, 
  onPrevTrack, 
  onNextTrack 
}) => {
  return (
    <div className={styles.controls}>
      { isMobile ? (
        <Button onClick={onPlay}>
          { isPlaying ? ( <StopIcon /> ) : ( <PlayIcon /> ) }
        </Button>
        ) : (
        <>
          <Button onClick={onShuffle}>
            <SuffleIcon color={isShuffle ? 'purple' : 'white'} />
          </Button>
          <Button onClick={onPrevTrack}>
            <PrevTrackIcon />
          </Button>
          <Button onClick={onPlay}>
            { isPlaying ? ( <StopIcon size={50}/> ) : ( <PlayIcon size={50} /> ) }
          </Button>
          <Button onClick={onNextTrack}>
            <NextTrackIcon />
          </Button>
          <Button onClick={onRepeat}>
            <RepeatIcon color={isRepeat ? 'purple' : 'white'} />
          </Button>
        </>
        )
      }
    </div>  
  )
}