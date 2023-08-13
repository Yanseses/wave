import { ITrackData } from "../../utils/types"
import { ADD_TO_PLAYER } from "../actionTypes/player"
import { TPlayerActions } from "../actions/player"

interface IPlayer {
  currentSong: null | ITrackData
}

const playerState = {
  currentSong: null
}

export const playerReducer = (state: IPlayer = playerState, action: TPlayerActions) => {
  switch(action.type){
    case ADD_TO_PLAYER: {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}