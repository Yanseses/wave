import { IRequest } from "../../utils/types"
import { 
  GET_TOP_ARTISTS_REQUEST, 
  GET_TOP_ARTISTS_FAILED,
  GET_TOP_ARTISTS_SUCCESS
} from "../actionTypes/artists";
import { TTopArtists } from "../actions/artists";

type TArtists = {
  data: any
} & IRequest;

const artistsState = {
  request: false,
  failed: false,
  error: '',
  data: null
}

export const artistsReducer = (state: TArtists = artistsState, action: TTopArtists) => {
  switch(action.type){
    case GET_TOP_ARTISTS_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
        error: ''
      }
    }
    case GET_TOP_ARTISTS_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
        error: action.payload
      }
    }
    case GET_TOP_ARTISTS_SUCCESS: {
      return {
        request: false,
        failed: false,
        error: '',
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}