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
import { activePlayer, inactivePlayer, nextTrack, prevTrack } from "../../services/actions/main";
import { Avatar } from "./Avatar/Avatar";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { IArtists } from '../../utils/types';

export const Player: FC = () => {
  const dispatch = useDispatch();
  const [ currentTime, setCurrentTime ] = useState({
    min: '0',
    sec: '00'
  });
  const [ duration, setDuration ] = useState<number>(0);
  const [ isRepeat, setIsRepeat ] = useState<boolean>(false);
  const [ isMuted, setIsMuted ] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const data = useSelector(store => store.main.player);

  const handleSpeaking = useCallback(() => {
    setIsMuted(!isMuted);
    if(audioRef.current){
      if(isMuted){
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 1;
      }
    }
  }, [isMuted]);

  const handlePlay = useCallback(() => {
    if(audioRef.current){
      if(data.isPlaying){
        dispatch(inactivePlayer(data.key))
      } else {
        dispatch(activePlayer(data.key))
      }
    }
  }, [dispatch, data]);

  const handleRepeat = useCallback(() => {
    if(audioRef.current){
      if(isRepeat){
        audioRef.current.play()
      }
    }
  }, [isRepeat]);

  const handlePrevTrack = useCallback(() => {
    dispatch(prevTrack(data.key))
  }, [data, dispatch])

  const handleNextTrack = useCallback(() => {
    dispatch(nextTrack(data.key))
  }, [data, dispatch])

  const handleLoadedAudio = () => {
    if(audioRef.current){
      setDuration(audioRef.current?.duration)
    }
  }

  const handleProgress = () => {
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
  }


  useEffect(() => {
    if(audioRef.current){
      if(data.isPlaying){
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [data]);

  return (
    <>
      { data && (
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
                { data.isPlaying ? ( <StopIcon /> ) : ( <PlayIcon /> ) }
              </Button>
              <Button onClick={handleNextTrack}>
                <NextTrackIcon />
              </Button>
            </div>
            
            <div className={styles.about}>
              <Avatar image={data.image} name={data.title} size={68} activeClass={ data.isPlaying ? styles.avatarActive : '' } />
              <div className={styles.aboutWrapper}>
                <Link to={`/sound/${data.key}`} className={styles.title} state={{ name: data.title }}>
                  { data.title }
                </Link>
                { data.artists && data.artists.length > 0 ? (
                  <div className={styles.artists}>
                    { data.artists.map((el: IArtists, i: number, arr: IArtists[]) => {
                      const name = decodeURI(el.alias).split('-').join(' ');
                      if((arr.length - 1) === i){
                        return ( 
                          <Link key={el.adamid} to={`/artists/${el.alias}`} className={styles.artist} state={{ artist: el.alias }}>
                            { name }
                          </Link>
                        )
                      }
                      return (
                        <span key={el.adamid}>
                          <Link to={`/artists/${el.alias}`} className={styles.artist} state={{ artist: el.alias }}>
                            { name }
                          </Link>
                          <Text As='span' size={12}> & </Text>
                        </span>  
                      )
                      })
                    }
                  </div>
                ) : ( <Text As='p' size={12}>{data.subtitle}</Text> ) 
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
              src={data.audio}>
            </audio>
          </div>
        </div>
        )
      }
    </>
  )
}