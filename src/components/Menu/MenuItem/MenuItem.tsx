import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../../Text/Text";
import styles from './menuItem.module.css';

interface IMenuItem {
  link: string;
  Icon: any;
  text: string
}

export const MenuItem: FC<IMenuItem> = ({ link, Icon, text }) => {
  return (
    <NavLink to={link} className={({ isActive }) => isActive ? `${styles.active} ${styles.item}` : styles.item}>
      <Icon />
      <Text As="span" color={'primary'} size={16}>{text}</Text>
    </NavLink>  
  )
}