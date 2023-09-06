import styles from './player.module.css';
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "../../services/hooks";
import { useDispatch } from "react-redux";
import { prevTrack, nextTrack } from '../../services/actions/player';
import { Avatar } from "./Avatar/Avatar";
import { playPause } from '../../services/actions/player';
import { containTrack } from '../../utils/containTrack';
import { useMediaQuery } from 'react-responsive';
import { VolumeBar } from './VolumeBar/VolumeBar';
import { TimeLine } from './TimeLine/TimeLine';
import { About } from './About/About';
import { Controls } from './Сontrols/Controls';

export const Player: FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const { isPlaying, currentSongs, activeSong, currentIndex } = useSelector(store => store.player);
  const [ timeLine, setTimeLine ] = useState<number>(0);
  const [ seekTime, setSeekTime ] = useState<number>(0);
  const [ duration, setDuration ] = useState<number>(0);
  const [ isRepeat, setIsRepeat ] = useState<boolean>(false);
  const [ isShuffle, setIsShuffle ] = useState<boolean>(false);
  const [ volume, setVolume ] = useState<number>(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeaking = useCallback(() => {
    if(audioRef.current){
      if(volume === 0){
        setVolume(0.8)
      } else {
        setVolume(0)
      }
    }
  }, [ volume ]);

  const handlePlay = useCallback(() => {
    if(audioRef.current){
      if(isPlaying){
        dispatch(playPause(false))
      } else {
        dispatch(playPause(true))
      }
    }
  }, [ isPlaying, dispatch ]);

  const handlePrevTrack = useCallback(() => {
    if(isShuffle && currentSongs){
      dispatch(prevTrack(containTrack(Math.floor(Math.random() * currentSongs.length), currentSongs, 'prev')))
    } else {
      dispatch(prevTrack(containTrack(currentIndex, currentSongs, 'prev')))
    }
  }, [currentIndex, currentSongs, dispatch, isShuffle])

  const handleNextTrack = useCallback(() => {
    if(isShuffle && currentSongs){
      dispatch(nextTrack(containTrack(Math.floor(Math.random() * currentSongs.length), currentSongs, 'next')))
    } else {
      dispatch(nextTrack(containTrack(currentIndex, currentSongs, 'next')))
    }
  }, [ currentIndex, isShuffle, currentSongs, dispatch ])

  const handleLoadedAudio = useCallback(() => {
    if(audioRef.current){
      setDuration(audioRef.current?.duration)
    }
  }, [ audioRef ]);

  const handleProgress = useCallback(() => {
    if(audioRef.current){
      setTimeLine(audioRef.current.currentTime);
    }
  }, []);

  useEffect(() => {
    if(audioRef.current){
      if(isPlaying){
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [ isPlaying, activeSong ]);

  useEffect(() => {
    if(audioRef.current){
      audioRef.current.volume = volume
    }
  }, [ volume ]);

  useEffect(() => {
    if(audioRef.current){
      audioRef.current.currentTime = seekTime;
    }
  }, [ seekTime ])

  return (
    <div className={styles.main}>
      { !isMobile && (
        <TimeLine 
          duration={duration} 
          timeLine={timeLine} 
          onChange={(e) => setSeekTime(Number(e.target.value))}/>
        )
      }

      <div className={styles.wrapper}>         
        <div className={styles.about}>
          <Avatar 
            image={activeSong ? activeSong.share.avatar ? activeSong.share.avatar : activeSong.share.image : ''} 
            name={activeSong ? activeSong.share.text : ''} 
            size={ isMobile ? 48 : 68 } 
            activeClass={ isPlaying ? styles.avatarActive : '' } />
          <About activeSong={activeSong} isMobile={isMobile} />
        </div>

        <Controls 
          isMobile={isMobile}
          isPlaying={isPlaying}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onPlay={handlePlay}
          onRepeat={() => setIsRepeat(!isRepeat)}
          onShuffle={() => setIsShuffle(!isShuffle)}
          onPrevTrack={handlePrevTrack}
          onNextTrack={handleNextTrack}
        />

        <VolumeBar 
          volume={volume} 
          onInput={(e) => setVolume(Number(e.target.value))} 
          onSpeaking={handleSpeaking}/>

        <audio 
          ref={audioRef}
          onLoadedMetadata={handleLoadedAudio} 
          onTimeUpdate={handleProgress}
          loop={isRepeat}
          onEnded={handleNextTrack} 
          src={activeSong && activeSong.hub.actions && activeSong.hub.actions[1].uri}>
        </audio>
      </div>
    </div>
  )
}