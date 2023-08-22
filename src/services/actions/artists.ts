import { 
  GET_TOP_ARTISTS_FAILED, 
  GET_TOP_ARTISTS_REQUEST, 
  GET_TOP_ARTISTS_SUCCESS 
} from "../actionTypes/artists"

export const getTopArtistsRequest = () => {
  return {
    type: GET_TOP_ARTISTS_REQUEST
  }
}

export const getTopArtistsFailed = () => {
  return {
    type: GET_TOP_ARTISTS_FAILED
  }
}

export const getTopArtistsSuccess = () => {
  return {
    type: GET_TOP_ARTISTS_SUCCESS
  }
}