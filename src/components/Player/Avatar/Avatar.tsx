import classNames from 'classnames';
import styles from './avatar.module.css';
import { Unknown } from '../../../media/Unknown';
import { FC } from "react";

interface IAvatar {
  image: string,
  name: string,
  size?: 58 | 68,
  activeClass?: string
}

export const Avatar: FC<IAvatar> = ({ image, name, size = 58, activeClass }) => {
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
}