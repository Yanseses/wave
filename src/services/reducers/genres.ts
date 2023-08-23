import { IGenres, IRequest } from "../../utils/types";
import {
  GET_GENRES_COUNTRY_FAILED, 
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS
} from "../actionTypes/genres"
import { TGenresActions } from "../actions/genres";

type TGenres = {
  data: IGenres[] | null
} & IRequest;

const genreStore = {
  request: false,
  failed: false,
  error: '',
  data: null
}

export const genresReducer = (state: TGenres = genreStore, action: TGenresActions) => {
  switch(action.type){
    case GET_GENRES_COUNTRY_REQUEST:{
      return {
        ...state,
        request: true,
        failed: false,
        error: ''
      }
    }
    case GET_GENRES_COUNTRY_FAILED:{
      return {
        ...state,
        request: false,
        failed: true
      }
    }
    case GET_GENRES_COUNTRY_SUCCESS: {
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