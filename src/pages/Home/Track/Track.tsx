import styles from './track.module.css';
import { FC, useCallback, useState } from "react";
import { useLocation } from "react-router";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { Text } from "../../../components/Text/Text";
import { Link } from 'react-router-dom';
import { useGetSoundByIdQuery } from '../../../services/query/shazamApi';
import { Tab } from '../../../components/Tab/Tab';

export const Track: FC = () => {
  const location = useLocation();
  const [ activeTab, setActiveTab ] = useState<string>('LYRICS');
  const { isFetching, isError, data: track } = useGetSoundByIdQuery(location.state.key);

  const handleClickTab = useCallback((e: string) => {
    setActiveTab(e)
  }, [])

  return (
    <Wrapper extraClass={styles.wrapper}>
      { isFetching && (
        <Text size={16}>Loading...</Text>  
        ) 
      }

      { !isFetching && isError && (
        <Text size={16}>Failed to fetch</Text>  
        ) 
      }

      { !isFetching && !isError && track && (
        <>      
          <div className={styles.header}>
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
              </div>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.tabs}>
              <Tab value='LYRICS' active={activeTab === 'LYRICS'} onClick={handleClickTab}>
                Lyrics
              </Tab>
              <Tab value='DETAILS' active={activeTab === 'DETAILS'} onClick={handleClickTab}>
                Details
              </Tab>
              <Tab value='TOP' active={activeTab === 'TOP'} onClick={handleClickTab}>
                Top songs
              </Tab>
            </div>
            <div className={styles.container}>
              { activeTab === 'LYRICS' && (                
                <>
                  <Text As='h3' size={20} color={'secondary'}>
                    Lyrics text
                  </Text>
                  <div className={styles.lyrics}>
                  { track.sections[1].text.map((row: string, i: number) => 
                    <Text key={i} As='p' size={16}>{row}</Text>
                  ) }
                  </div>
                </>
                ) 
              }
              { activeTab === 'DETAILS' && (
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
              { activeTab === 'TOP' && (
                <div>Top songs</div>  
                ) 
              }
            </div>
          </div>
        </>
        ) 
      }
    </Wrapper>
  )
}