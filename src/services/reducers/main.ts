import { ITrackData, IGenres, IRequest } from "../../utils/types";
import { 
  GET_CHART_LIST_FAILED, 
  GET_CHART_LIST_REQUEST, 
  GET_CHART_LIST_SUCCESS, 
  GET_GENRES_COUNTRY_FAILED, 
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS,
  GET_GENRE_TRACKS_FAILED,
  GET_GENRE_TRACKS_REQUEST,
  GET_GENRE_TRACKS_SUCCESS,
} from "../actionTypes/main"
import { TMainActions } from "../actions/main";

type TChart = {
  data: ITrackData[] | null
} & IRequest;

type TGenres = {
  data: IGenres[] | null
} & IRequest;

type TTracks = {
  data: ITrackData[] | null
} & IRequest;

export interface IMainStore {
  chart: TChart,
  genres: TGenres,
  tracks: TTracks,
  player: any | null
}

const initStore = {
  chart: {
    request: false,
    failed: false,
    error: '',
    data: null
  },
  genres: {
    request: false,
    failed: false,
    error: '',
    data: null
  },
  tracks: {
    request: false,
    failed: false,
    error: '',
    data: null
  },
  player: null
}

export const mainReducer = (state: IMainStore = initStore, action: TMainActions) => {
  switch(action.type){
    case GET_CHART_LIST_REQUEST:{
      return {
        ...state,
        chart: {
          ...state.chart,
          request: true,
          failed: false,
          error: ''
        }
      }
    }
    case GET_CHART_LIST_FAILED:{
      return {
        ...state,
        chart: {
          ...state.chart,
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case GET_CHART_LIST_SUCCESS: {
      return {
        ...state,
        chart: {
          ...state.chart,
          request: false,
          failed: false,
          data: action.payload
        }
      }
    }
    case GET_GENRES_COUNTRY_REQUEST:{
      return {
        ...state,
        genres: {
          ...state.genres,
          request: true,
          failed: false,
          error: ''
        }
      }
    }
    case GET_GENRES_COUNTRY_FAILED:{
      return {
        ...state,
        genres: {
          ...state.genres,
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case GET_GENRES_COUNTRY_SUCCESS: {
      return {
        ...state,
        player: state.chart.data ? state.chart.data![0] : null,
        genres: {
          ...state.genres,
          request: false,
          failed: false,
          data: action.payload
        },
      }
    }
    case GET_GENRE_TRACKS_REQUEST: {
      return {
        ...state,
        tracks: {
          request: true,
          failed: false,
          error: '',
          data: null
        }
      }
    }
    case GET_GENRE_TRACKS_FAILED: {
      return {
        ...state,
        tracks: {
          ...state.tracks,
          request: false,
          failed: true
        }
      }
    }
    case GET_GENRE_TRACKS_SUCCESS: {
      return {
        ...state,
        tracks: {
          request: false,
          failed: false,
          error: '',
          data: action.payload
        }
      }
    }
    default: {
      return state
    }
  }
}