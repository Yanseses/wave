import styles from './about.module.css';
import { FC } from "react";
import { Link } from 'react-router-dom';
import { Text } from '../../Text/Text';
import { IArtists, ITrackData } from '../../../services/types/types';

interface IAbout {
  activeSong: ITrackData | null,
  isMobile: boolean
}

export const About: FC<IAbout> = ({ activeSong, isMobile }) => {
  return (
    <>
      { activeSong 
        ? isMobile 
          ? (
          <div className={styles.wrapper}>
            <Text As='span' size={ isMobile ? 14 : 20 } extraClass={styles.title}>
              { activeSong.title || '' }
            </Text>
            <Text As='p' size={12}>{activeSong.subtitle}</Text>
          </div>
          ) : (
          <div className={styles.wrapper}>
            <Link to={`/home/track/${activeSong.key}`} state={{ key: activeSong.key }}>
              <Text As='span' size={ isMobile ? 14 : 20 } extraClass={styles.title}>
                { activeSong.title || '' }
              </Text>
            </Link>
            { activeSong.artists && activeSong.artists.length > 0 
              ? ( <div className={styles.artists}>
                { activeSong.artists.map((el: IArtists, i: number, arr: IArtists[]) => {
                  const name = decodeURI(el.alias).split('-').join(' ');
                  if((arr.length - 1) === i){
                    return ( 
                      <Link 
                        key={el.adamid} to={`/artists/${el.alias}`} 
                        className={styles.artist} 
                        state={{ id: el.adamid }}>
                        { name }
                      </Link>
                    )
                  }
                  return (
                    <span key={el.adamid}>
                      <Link 
                        to={`/artists/${el.alias}`} 
                        className={styles.artist} 
                        state={{ id: el.adamid }}>
                        { name }
                      </Link>
                      <Text As='span' size={12}> & </Text>
                    </span>  
                  )
                  })
                }
              </div> )
              : (<Text As='p' size={12}>{activeSong.subtitle}</Text>) 
            }
          </div>
        ) : (
          <div className={styles.wrapper}>
            <Text As='span' size={ isMobile ? 14 : 20 }></Text>
            <Text As='p' size={12}></Text>
          </div>
        ) }
    </>  
  )
}