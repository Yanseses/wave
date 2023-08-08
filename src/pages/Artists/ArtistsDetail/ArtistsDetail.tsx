import { FC } from "react";
import { useLocation } from "react-router";

export const ArtistsDetail: FC = () => {
  const location = useLocation();
  const artist = decodeURI(location.state.artist).split('-').join(' ');

  return (
    <div>{ artist }</div>  
  )
}