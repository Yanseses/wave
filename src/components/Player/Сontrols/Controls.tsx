import { NextTrackIcon, PlayIcon, PrevTrackIcon, RepeatIcon, StopIcon, SuffleIcon } from '../../../media/Icons';
import { Button } from '../../Button/Button';
import { FC, memo } from "react";

interface IControls {
  isTrack: boolean,
  isPlaying: boolean,
  isShuffle: boolean,
  isRepeat: boolean,
  onPlay: () => void,
  onShuffle: () => void,
  onRepeat: () => void,
  onPrevTrack: () => void,
  onNextTrack: () => void
}

export const Controls: FC<IControls> = memo(({ 
  isTrack,
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
    <>
      <Button onClick={onShuffle}>
        <SuffleIcon color={ isShuffle ? 'purple' : 'white' } />
      </Button>
      { isTrack ? (
        <>
          <Button onClick={onPrevTrack}>
            <PrevTrackIcon />
          </Button>
          <Button onClick={onPlay}>
            { isPlaying ? ( <StopIcon size={50}/> ) : ( <PlayIcon size={50} /> ) }
          </Button>
          <Button onClick={onNextTrack}>
            <NextTrackIcon />
          </Button>
        </>
      ) : (
        <>
          <Button>
            <PrevTrackIcon color='grey' />
          </Button>
          <Button>
            <PlayIcon size={50} color='grey'/>
          </Button>
          <Button>
            <NextTrackIcon color='grey' />
          </Button>
        </>
        ) 
      }
      <Button onClick={onRepeat}>
        <RepeatIcon color={ isRepeat ? 'purple' : 'white' } />
      </Button>
    </>
  )
})