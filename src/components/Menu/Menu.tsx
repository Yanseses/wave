import { FC } from "react";
import styles from './menu.module.css';
import { Text } from "../Text/Text";
import { Link } from "react-router-dom";
import { Logo } from "../../media/Logo";
import { ArtistsIcon, HomeIcon, LikeIcon } from "../../media/Icons";
import { MenuItem } from "./MenuItem/MenuItem";

export const Menu: FC = () => {
  const menu = [
    { id: '1', name: 'Home', icon: HomeIcon, link: '/home' },
    { id: '2', name: 'Genres', icon: LikeIcon, link: '/genres' },
    { id: '3', name: 'Artists', icon: ArtistsIcon, link: '/artists' },
  ];

  return (
    <nav className={styles.layout}>
      <Link to='/home'>
        <Logo />
      </Link>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <Text As='h2' size={20} color={'secondary'} extraClass={styles.heading}>
            Menu
          </Text>
          <div className={styles.menuList}>
            { menu.map((el, i) => 
              <MenuItem key={i} text={el.name} Icon={el.icon} link={el.link} />
              ) 
            }
          </div>
        </div>
      </div>
    </nav>
  )
}