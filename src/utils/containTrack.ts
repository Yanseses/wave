import { ITrackData } from "../services/types/types";

export const containTrack  = (
  currntIndex: number, 
  currentSongs: ITrackData[] | null, 
  type: 'prev' | 'next' | 'current'
): number => {
  if(type === 'current'){
    if(currentSongs && currentSongs[currntIndex].hub.actions){
      return currntIndex;
    } else {
      return containTrack(currntIndex, currentSongs, 'next');
    }
  }
  let index = type === 'prev' ? currntIndex - 1 : currntIndex + 1;

  if(currentSongs && index < 0){
    if(currentSongs && currentSongs[currentSongs.length - 1].hub.actions){
      return currentSongs.length - 1;
    } else {
      return containTrack(currentSongs.length - 1, currentSongs, type);
    }
  }

  if(index > 19){
    if(currentSongs && currentSongs[0].hub.actions){
      return 0;
    } else {
      return containTrack(0, currentSongs, type);
    }
  }

  if(currentSongs && currentSongs[index].hub.actions){
    return index;
  } else {
    return containTrack(index, currentSongs, type);
  }
}