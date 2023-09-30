import styles from './volumeBar.module.css';
import { ChangeEvent, FC, memo } from "react"
import { Button } from "../../Button/Button"
import { SpeakerOffIcon, SpeakerOnIcon } from "../../../media/Icons";

interface IVolumeBar {
  volume: number,
  onInput(e: ChangeEvent<HTMLInputElement>): void,
  onSpeaking(): void
}

export const VolumeBar: FC<IVolumeBar> = memo(({ volume, onInput, onSpeaking }) => {
  return (
    <div className={styles.wrapper}>
      <Button onClick={onSpeaking}>
        { volume === 0 ? ( <SpeakerOffIcon /> ) : ( <SpeakerOnIcon /> )}
      </Button>
      <input 
        step={0.01} 
        value={volume} 
        min={0} 
        max={1} 
        onChange={onInput} 
        type="range" 
        name="volume" 
        id="volume"  
        className={styles.input} />
  </div>
  )
})