import styles from './track.module.css';
import { PlayIcon, StopIcon } from '../../../media/Icons';
import { FC, useCallback } from "react";
import { Text } from '../../Text/Text';
import { useDispatch } from '../../../services/hooks';
import { activePlayer, addToPlayer, inactivePlayer } from '../../../services/actions/main';
import { Avatar } from '../../Player/Avatar/Avatar';
import { Button } from '../../Button/Button';

interface ITrack {
  index: number
  data: any
}

export const Track: FC<ITrack> = ({ data, index }) => {
  const dispatch = useDispatch();

  const handlePlay = useCallback(() => {
    if(!data.isPlaying){
      dispatch(addToPlayer(data.key))
      dispatch(activePlayer(data.key))
    } else {
      dispatch(inactivePlayer(data.key))
    }
  }, [data, dispatch]);
  
  return (
    <li className={styles.track} onClick={handlePlay}>
      <div className={styles.container}>
        <Text As={'span'} color='inherit' extraClass={data.isPlaying ? styles.active : ''} size={26}>
          {index >= 9 ? index + 1 : `0${index + 1}`}
        </Text>
        <Avatar name={data.image} image={data.image} activeClass={data.isPlaying ? styles.avatarActive : ''} />
        <Text As={'p'} color='inherit' extraClass={`${data.isPlaying ? styles.active : ''} ${styles.text}`} size={16}>
          {`${data.title} - ${data.subtitle}`}
        </Text>
      </div>
      <Button>
        { data.isPlaying ? ( <StopIcon size={25} color={'purple'} /> ) : ( <PlayIcon size={25} /> ) }
      </Button>
    </li>  
  )
}