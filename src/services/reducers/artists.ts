import { IRequest } from "../../utils/types"

type TArtists = {
  data: any
} & IRequest;

type TCurrentArtist = {
  data: any
} & IRequest;

interface TArtistsState {
  artists: TArtists,
  currentArtist: TCurrentArtist
}

const artistsState = {
  artists: {
    request: false,
    failed: false,
    error: '',
    data: null
  },
  currentArtist: {
    request: false,
    failed: false,
    error: '',
    data: null
  }
}

export const artistsReducer = (state: TArtistsState = artistsState, action: any) => {
  switch(action.type){
    default: {
      return state
    }
  }
}