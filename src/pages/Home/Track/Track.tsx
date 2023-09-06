import styles from './track.module.css';
import { FC } from "react";
import { useLocation } from "react-router";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { useGetSoundQuery } from "../../../hooks/useGetSoundQuery";
import { Text } from "../../../components/Text/Text";
import { Link } from 'react-router-dom';

export const Track: FC = () => {
  const location = useLocation();
  const { request, failed, error, data } = useGetSoundQuery(location.state.key);

  return (
    <Wrapper>
      { request && (
        <div>Loading...</div>
        ) 
      }

      { !request && failed && (
        <div>{ error }</div>
        ) 
      }

      { !request && !failed && data && (
        <div className={styles.track}>
          <img src={ data.share.image || data.images.coverart } alt={data.title} className={styles.img}/>
          <div className={styles.about}>
            <Text As="h2" size={20} color='secondary'>{ data.type }</Text>
            <Text As="h2" size={40}>{ data.title }</Text>
            <div className={styles.info}>
              <Text As="h2" size={16} color='secondary'>
                {'Singer: '}
                <Link 
                  to={`/artists/${data.subtitle.toLowerCase().split(' ').join('-')}`} 
                  state={{ key: data.artists[0].adamid }}>
                    {data.subtitle}
                </Link>
              </Text>
              <Text As="h2" size={16} color='secondary'>
                {`Genre: `}
                <Link to={`/genres/`}>
                  {data.genres.primary}
                </Link>
              </Text>
              <Text As="h2" size={16} color='secondary'>
                {`${data.sections[0].metadata[0].title}: ${data.sections[0].metadata[0].text}`}
              </Text>
              <Text As="h2" size={16} color='secondary'>
                {`${data.sections[0].metadata[2].title}: ${data.sections[0].metadata[2].text}`}
              </Text>
            </div>
          </div>
        </div>
        ) 
      }
    </Wrapper>
  )
}