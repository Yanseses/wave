import styles from './timeLine.module.css';
import { ChangeEvent, FC } from "react"
import { Text } from '../../Text/Text';

interface ITimeLine {
  duration: number,
  timeLine: number,
  onChange(e: ChangeEvent<HTMLInputElement>): void
}

export const TimeLine: FC<ITimeLine> = ({ duration, timeLine, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <input 
        type="range"
        step='any'
        min={0}
        max={duration} 
        value={timeLine}
        onChange={onChange} 
        className={styles.input}/>
      <Text As="p" size={12} extraClass={styles.currentTime}>
        { `${Math.floor(timeLine / 60)}:${Math.floor(timeLine % 60) < 10 ? '0' + Math.floor(timeLine % 60) : Math.floor(timeLine % 60)}` }
      </Text>
      <Text As="p" size={12} extraClass={styles.duration}>{ `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}` }</Text>
  </div>
  )
}