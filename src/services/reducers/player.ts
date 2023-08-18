import { ITrackData } from "../../utils/types"
import { ADD_TO_PLAYER, PLAY_PAUSE } from "../actionTypes/player"
import { TPlayerActions } from "../actions/player"

interface IPlayer {
  currentSongs: null | ITrackData,
  activeSong: null | ITrackData,
  isPlaying: boolean,
  genreListId: string
}

const playerState = {
  currentSongs: null,
  activeSong: null,
  isPlaying: false,
  genreListId: ''
}

export const playerReducer = (state: IPlayer = playerState, action: TPlayerActions) => {
  switch(action.type){
    case ADD_TO_PLAYER: {
      return {
        ...state,
      }
    }
    case PLAY_PAUSE: {
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}