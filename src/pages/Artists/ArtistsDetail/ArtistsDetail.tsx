import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGetArtist } from "../../../hooks/useGetArtist";

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
    <section>
      { request && (
        <div>Loading...</div>
        ) 
      }

      { !request && failed && (
        <div>{ error }</div>
        ) 
      }

      { !request && !failed && data && (
        <div>{ data.attributes.name }</div>  
        ) 
      }
    </section>
  )
}