import styles from './player.module.css';
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "../../services/hooks";
import { Text } from "../Text/Text";
import { 
  PlayIcon, 
  SpeakerOffIcon, 
  SpeakerOnIcon, 
  StopIcon, 
  PrevTrackIcon, 
  NextTrackIcon, 
  RepeatIcon } from "../../media/Icons";
import { useDispatch } from "react-redux";
import { prevTrack, nextTrack } from '../../services/actions/player';
import { Avatar } from "./Avatar/Avatar";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { IArtists } from '../../utils/types';
import { playPause } from '../../services/actions/player';
import { containTrack } from '../../utils/containTrack';

export const Player: FC = () => {
  const dispatch = useDispatch();
  const { isPlaying, currentSongs, activeSong, currentIndex } = useSelector(store => store.player);
  const [ currentTime, setCurrentTime ] = useState({
    min: '0',
    sec: '00'
  });
  const [ duration, setDuration ] = useState<number>(0);
  const [ isRepeat, setIsRepeat ] = useState<boolean>(false);
  const [ isMuted, setIsMuted ] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleSpeaking = useCallback(() => {
    setIsMuted(!isMuted);
    if(audioRef.current){
      if(isMuted){
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 1;
      }
    }
  }, [ isMuted ]);

  const handlePlay = useCallback(() => {
    if(audioRef.current){
      if(isPlaying){
        dispatch(playPause(false))
      } else {
        dispatch(playPause(true))
      }
    }
  }, [ isPlaying, dispatch ]);

  const handleRepeat = useCallback(() => {
    if(audioRef.current){
      if(isRepeat){
        audioRef.current.play()
      }
    }
  }, [ isRepeat ]);

  const handlePrevTrack = useCallback(() => {
    dispatch(prevTrack(containTrack(currentIndex, currentSongs, 'prev')))
  }, [ currentIndex, currentSongs, dispatch ])

  const handleNextTrack = useCallback(() => {  
    dispatch(nextTrack(containTrack(currentIndex, currentSongs, 'next')))
  }, [ currentIndex, currentSongs, dispatch ])

  const handleLoadedAudio = useCallback(() => {
    if(audioRef.current){
      setDuration(audioRef.current?.duration)
    }
  }, [ audioRef ]);

  const handleProgress = useCallback(() => {
    if(audioRef.current && progressRef.current){
      const min = Math.floor(audioRef.current.currentTime / 60).toFixed();
      const sec = Math.floor(audioRef.current.currentTime % 60) < 10 ? `0${Math.floor(audioRef.current.currentTime % 60)}` : Math.floor(audioRef.current.currentTime % 60).toFixed();
      if(currentTime.sec !== sec){
        setCurrentTime({
          ...currentTime,
          sec: sec
        })
      }
      if(currentTime.min !== min){
        setCurrentTime({
          ...currentTime,
          min: min
        })
      }
      progressRef.current.style.width = `${((audioRef.current?.currentTime) * (100 / audioRef.current.duration)).toFixed(4)}%`
    }
  }, [ currentTime ])


  useEffect(() => {
    if(audioRef.current){
      if(isPlaying){
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [ isPlaying, activeSong ]);

  return (
    <>
      { activeSong && (
        <div className={styles.player}>
          <div className={styles.timeline}>
            <div className={styles.timelineWrapper}>
              <div ref={progressRef} className={styles.progress}></div>
            </div>
            <div className={styles.timelineText}>
              <Text As="p" size={12}>{ `${currentTime.min}:${currentTime.sec}` }</Text>
              <Text As="p" size={12}>{ `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}` }</Text>
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.controls}>
              <Button onClick={handlePrevTrack}>
                <PrevTrackIcon />
              </Button>
              <Button onClick={handlePlay}>
                { isPlaying ? ( <StopIcon /> ) : ( <PlayIcon /> ) }
              </Button>
              <Button onClick={handleNextTrack}>
                <NextTrackIcon />
              </Button>
            </div>
            
            <div className={styles.about}>
              <Avatar image={activeSong.share.avatar ? activeSong.share.avatar : activeSong.share.image} name={activeSong.share.text} size={68} activeClass={ isPlaying ? styles.avatarActive : '' } />
              <div className={styles.aboutWrapper}>
                <Link 
                  to={`/home/track/${activeSong.key}`}
                  className={styles.title} 
                  state={{ 
                    name: activeSong.title,
                    key: activeSong.key
                }}>
                  { activeSong.title }
                </Link>
                { activeSong.artists && activeSong.artists.length > 0 ? (
                  <div className={styles.artists}>
                    { activeSong.artists.map((el: IArtists, i: number, arr: IArtists[]) => {
                      const name = decodeURI(el.alias).split('-').join(' ');
                      if((arr.length - 1) === i){
                        return ( 
                          <Link 
                            key={el.adamid} to={`/artists/${el.alias}`} 
                            className={styles.artist} 
                            state={{ id: el.adamid }}>
                            { name }
                          </Link>
                        )
                      }
                      return (
                        <span key={el.adamid}>
                          <Link 
                            to={`/artists/${el.alias}`} 
                            className={styles.artist} 
                            state={{ id: el.adamid }}>
                            { name }
                          </Link>
                          <Text As='span' size={12}> & </Text>
                        </span>  
                      )
                      })
                    }
                  </div>
                ) : ( <Text As='p' size={12}>{activeSong.subtitle}</Text> ) 
                }
              </div>
            </div>

            <div className={styles.additionally}>
              <Button onClick={handleSpeaking}>
                { isMuted ? ( <SpeakerOnIcon /> ) : ( <SpeakerOffIcon /> ) }
              </Button>
              <Button onClick={() => setIsRepeat(!isRepeat)}>
                <RepeatIcon color={isRepeat ? 'purple' : 'white'} />
              </Button>
            </div>
            <audio 
              ref={audioRef}
              onLoadedMetadata={handleLoadedAudio} 
              onTimeUpdate={handleProgress}
              onEnded={ isRepeat ? handleRepeat : handleNextTrack} 
              src={activeSong && activeSong.hub.actions && activeSong.hub.actions[1].uri}>
            </audio>
          </div>
        </div>
        )
      }
    </>
  )
}