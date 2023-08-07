import classNames from 'classnames';
import styles from './avatar.module.css';
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
      <img className={styles.image} src={image} alt={name} />
    </div>  
  )
}