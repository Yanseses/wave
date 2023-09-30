import classNames from 'classnames';
import styles from './avatar.module.css';
import { Unknown } from '../../../media/Unknown';
import { FC, memo } from "react";

interface IAvatar {
  image?: string,
  name: string,
  size?: 48 | 58 | 68,
  activeClass?: string
}

export const Avatar: FC<IAvatar> = memo(({ image, name, size = 58, activeClass }) => {
  const classname = classNames(
    styles.wrapper,
    activeClass,
    styles[`s${size}`]
  )

  return (
    <div className={classname}>
      { image ? ( 
        <img className={styles.image} src={image} alt={name} />
      ) : (
        <Unknown />
      ) }
    </div>  
  )
})