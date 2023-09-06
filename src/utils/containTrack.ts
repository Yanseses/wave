import { ITrackData } from "../hooks/useGetTracks";

export const containTrack  = (currntIndex: number, currentSongs: ITrackData[] | null, type: string): number => {
  let index = type === 'prev' ? currntIndex - 1 : currntIndex + 1;
  if(currentSongs && index < 0){
    return currentSongs.length - 1
  }
  if(index > 19){
    return 0
  }
  if(currentSongs && currentSongs[index].hub.actions){
    return index;
  } else {
    return containTrack(index, currentSongs, type);
  }
}