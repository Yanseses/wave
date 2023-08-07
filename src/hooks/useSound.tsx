import { useState } from "react"

export const useSound = (audioRef: any) => {
  const [ duration, setDuration ] = useState<string>();
  const [ isMuted, setIsMuted ] = useState<boolean>(false);
  const [ isRepeat, setIsRepeat ] = useState<boolean>(false);
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

  const handleLoaded = () => {
    if(audioRef.current){
      setDuration((Math.floor(audioRef.current?.duration) / 60).toFixed(2))
    }
  }

  return { isPlaying };
}