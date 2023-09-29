import styles from './track.module.css';
import { FC } from "react";
import { useLocation } from "react-router";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { Text } from "../../../components/Text/Text";
import { Link } from 'react-router-dom';
import { useGetSoundByIdQuery } from '../../../services/query/shazamApi';

export const Track: FC = () => {
  const location = useLocation();
  const {isFetching, isError, data: track} = useGetSoundByIdQuery(location.state.key);

  if(isFetching){
    return ( <div>Loading...</div> )
  }

  if(!isFetching && isError){
    return ( <div>{ 'Ошибка запроса' }</div> )
  }

  return (
    <Wrapper>
      { track && (
        <div className={styles.track}>
          <img src={ track.share.image || track.images.coverart } alt={track.title} className={styles.img}/>
          <div className={styles.about}>
            <Text As="h2" size={20} color='secondary'>{ track.type}</Text>
            <Text As="h2" size={40}>{ track.title }</Text>
            <div className={styles.info}>
              <Text As="h2" size={16} color='secondary'>
                {'Singer: '}
                <Link 
                  to={`/artists/${track.subtitle.toLowerCase().split(' ').join('-')}`} 
                  state={{ key: track.artists[0].adamid }}>
                    {track.subtitle}
                </Link>
              </Text>
              <Text As="h2" size={16} color='secondary'>
                {`Genre: `}
                <Link to={`/genres/`}>
                  {track.genres.primary}
                </Link>
              </Text>
              { track.sections[0].metadata.length > 0 && (
                <>              
                  <Text As="h2" size={16} color='secondary'>
                    {`${track.sections[0].metadata[0].title || 'Album'}: ${track.sections[0].metadata[0].text || ''}`}
                  </Text>
                  <Text As="h2" size={16} color='secondary'>
                    {`${track.sections[0].metadata[1].title || 'Label'}: ${track.sections[0].metadata[1].text || ''}`}
                  </Text>
                  <Text As="h2" size={16} color='secondary'>
                    {`${track.sections[0].metadata[2].title || 'Released'}: ${track.sections[0].metadata[2].text || ''}`}
                  </Text>
                </>                
                ) 
              }
            </div>
          </div>
        </div>
        ) 
      }
    </Wrapper>
  )
}