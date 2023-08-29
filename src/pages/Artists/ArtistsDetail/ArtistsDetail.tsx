import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGetArtist } from "../../../hooks/useGetArtist";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { Text } from '../../../components/Text/Text';

export const ArtistsDetail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, request, failed, error } = useGetArtist(location.state.id);

  useEffect(() => {
    if(!location.state){
      navigate('/artists')
    }
  }, [ location, navigate ]);

  return (
    <Wrapper As='section'>
      { request && (
        <div>Loading...</div>
        ) 
      }

      { !request && failed && (
        <div>{ error }</div>
        ) 
      }

      { !request && !failed && data && (
        <div>
          <Text As='h2' size={16}>{ data.attributes.name }</Text>
          <Text As="p" size={12}>{ data.attributes.editorialNotes || '' }</Text>
        </div>  
        ) 
      }
    </Wrapper>
  )
}