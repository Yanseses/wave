import { FC } from "react";
import styles from './aside.module.css';
import { Text } from "../Text/Text";
import { useSelector } from "../../services/hooks";
import { Avatar } from "../Player/Avatar/Avatar";
import { Link } from "react-router-dom";

export const Aside: FC = () => {
  const chart = useSelector(store => store.main.chart.data);

  return (
    <aside className={styles.aside}>
      <Text As='h2' size={20} color={'secondary'}>Top Artists</Text>
      { chart ? (
        <div className={styles.artists}>
          { chart && chart.map((el, i) => {
            if(i < 6){
              return (
              <Link 
                key={el.key}
                to={`/artists/${el.artists ? el.artists[0].alias : ''}`} 
                className={styles.artist}
                state={{ artist: el.artists && el.artists[0].alias }}>
                <Avatar image={el.avatar} name={el.subtitle}/>
                <Text As="p" size={18}>{el.subtitle.split('&')[0]}</Text>
              </Link>
              )
            }
          }) }
        </div>
      ) : (
      <div className={styles.wrapper}>
        <Text As="p" size={16} color={'secondary'} extraClass={styles.error}>Content is empty</Text>
      </div>
      ) }
    </aside>
  )
}