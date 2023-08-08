import { FC } from "react";
import { useLocation } from "react-router";

export const ArtistsDetail: FC = () => {
  const location = useLocation();

  return (
    <div>{ location.state.artist }</div>  
  )
}