import { ITrackData } from "../../hooks/useGetTracks"
import { NEXT_TRACK, PLAY_PAUSE, PREV_TRACK, SET_ACTIVE_SONG } from "../actionTypes/player"
import { TPlayerActions } from "../actions/player"

interface IPlayer {
  currentSongs: null | ITrackData[],
  activeSong: null | ITrackData,
  isPlaying: boolean,
  currentIndex: number,
  genreListId: string
}

const playerState = {
  currentSongs: null,
  activeSong: null,
  isPlaying: false,
  currentIndex: 0,
  genreListId: ''
}

export const playerReducer = (state: IPlayer = playerState, action: TPlayerActions) => {
  switch(action.type){
    case SET_ACTIVE_SONG: {
      return {
        ...state,
        currentSongs: action.payload.list,
        activeSong: action.payload.song,
        currentIndex: action.payload.index
      }
    }
    case PLAY_PAUSE: {
      return {
        ...state,
        isPlaying: action.payload
      }
    }
    case PREV_TRACK: {
      return {
        ...state,
        currentIndex: action.payload,
        activeSong: state.currentSongs && state.currentSongs[action.payload]
      }
    }
    case NEXT_TRACK: {
      return {
        ...state,
        currentIndex: action.payload,
        activeSong: state.currentSongs && state.currentSongs[action.payload]
      }
    }
    default: {
      return state
    }
  }
}