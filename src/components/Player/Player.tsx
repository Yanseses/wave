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
import { activePlayer, inactivePlayer, nextTrack, prevTrack } from "../../services/actions/chart";
import { Avatar } from "./Avatar/Avatar";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const Player: FC = () => {
  const dispatch = useDispatch();
  const [ duration, setDuration ] = useState<string>();
  const [ isRepeat, setIsRepeat ] = useState<boolean>(false);
  const [ isMuted, setIsMuted ] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const data = useSelector(store => store.chart.player);

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
        dispatch(inactivePlayer(data.id))
      } else {
        dispatch(activePlayer(data.id))
      }
    }
  }, [dispatch, data]);

  const handleRepeat = useCallback(() => {
    if(audioRef.current){
      if(isRepeat){
        audioRef.current.play()
      }
    }
  }, [isRepeat])

  const handlePrevTrack = useCallback(() => {
    dispatch(prevTrack(data.id))
  }, [data, dispatch])

  const handleNextTrack = useCallback(() => {
    dispatch(nextTrack(data.id))
  }, [data, dispatch])

  const handleLoadedAudio = () => {
    if(audioRef.current){
      setDuration((Math.floor(audioRef.current?.duration) / 60).toFixed(2))
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
              <div className={styles.progress}></div>
            </div>
            <div className={styles.timelineText}>
              <Text As="p" size={12}>{ audioRef.current?.currentTime ? (Math.floor(audioRef.current?.currentTime) / 60).toFixed(2) : '0.00' }</Text>
              <Text As="p" size={12}>{ duration }</Text>
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
                <Link to={`/sound/${data.id}`} className={styles.title}>
                  { data.title }
                </Link>
                { data.artists && data.artists.length > 0 ? (
                  <div className={styles.artists}>
                    { data.artists.map((el: any, i: number, arr: any) => {
                      const name = decodeURI(el.alias).split('-').join(' ');
                      if((arr.length - 1) === i){
                        return ( 
                          <Link key={el.adamid} to={`/artists/${el.alias}`} className={styles.artist}>
                            { name }
                          </Link>
                        )
                      }
                      return (
                        <>
                          <Link key={el.adamid} to={`/artists/${el.alias}`} className={styles.artist}>
                            { name }
                          </Link>
                          <Text As='span' size={12}> & </Text>
                        </>  
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