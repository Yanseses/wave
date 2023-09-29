import styles from './artistsDetail.module.css';
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { Text } from '../../../components/Text/Text';
import { Header } from '../../../components/Header/Header';
import { useGetArtistsByIdQuery } from '../../../services/query/shazamApi';

export const ArtistsDetail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: data, isFetching, isError } = useGetArtistsByIdQuery(location.state && location.state.id);
  const [ artist, setArtist ] = useState<any>();
  const [ songs, setSongs ] = useState<any>();

  useEffect(() => {
    if(!location.state){
      navigate('/artists')
    }
  }, [ location, navigate ]);

  useEffect(() => {
    if(data){
      setArtist(Object.values(data.artists)[0])
      setSongs(Object.values(data.songs))
    }
  }, [data, location]);

  if(isFetching){
    return ( <div>Loading...</div> )
  }

  if(!isFetching && isError){
    return ( <div>{ 'Ошибка ответа сервера' }</div> )
  }

  return (
    <Wrapper As='section' extraClass={styles.wrapper}>
      { data && (
        <>
          <Header color={artist && `#${artist.attributes.artwork.bgColor}`}>
            <Text As='h2' size={40}>{ artist && artist.attributes.name }</Text>
          </Header>
          <div className={styles.main}>
            <div className={styles.details}>
              <img src={artist && `${artist.attributes.artwork.url.split('/{w}')[0]}/300x300bb.jpg`} alt='' />
            </div>
            <div className={styles.songs}>

            </div>
          </div>  
        </>
        ) 
      }
    </Wrapper>
  )
}