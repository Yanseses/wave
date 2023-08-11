import { ITrack, IGenres } from "../../utils/types";
import { 
  ACTIVE_PLAYER,
  ADD_TO_PLAYER,
  GET_CHART_LIST_FAILED, 
  GET_CHART_LIST_REQUEST, 
  GET_CHART_LIST_SUCCESS, 
  GET_GENRES_COUNTRY_FAILED, 
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS,
  GET_GENRE_TRACKS_FAILED,
  GET_GENRE_TRACKS_REQUEST,
  GET_GENRE_TRACKS_SUCCESS,
  INACTIVE_PLAYER,
  NEXT_TRACK,
  PREV_TRACK
} from "../actionTypes/main"
import { TChartActions } from "../actions/main";

interface IRequest {
  request: boolean,
  failed: boolean,
  error: string
}

type TChart = {
  data: ITrack[] | null
} & IRequest;

type TGenres = {
  data: IGenres[] | null
} & IRequest;

type TTracks = {
  data: ITrack[] | null
} & IRequest;

interface IMainStore {
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

export const mainReducer = (state: IMainStore = initStore, action: TChartActions) => {
  switch(action.type){
    case GET_CHART_LIST_REQUEST:{
      return {
        ...state,
        chart: {
          ...state.chart,
          request: true
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
          request: true
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
          ...state.tracks,
          request: true
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
          ...state.tracks,
          request: false,
          data: action.payload
        }
      }
    }
    case ADD_TO_PLAYER: {
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data!.map((el: ITrack) => {
            el.isPlaying = false
            return el;
          })
        },
        player: state.chart.data!.find((el: ITrack) => el.key === action.payload)
      }
    }
    case ACTIVE_PLAYER: {
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data!.map((el: ITrack) => {
            if(el.key === action.payload){
              el.isPlaying = true
            }
            return el;
          })
        },
        player: {
          ...state.player,
          isPlaying: true
        }
      }
    }
    case INACTIVE_PLAYER: {
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data!.map((el: ITrack) => {
            el.isPlaying = false
            return el;
          })
        },
        player: {
          ...state.player,
          isPlaying: false
        }
      }
    }
    case NEXT_TRACK: {
      let index = state.chart.data!.findIndex((el: ITrack) => el.key === action.payload);
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data!.map((el: ITrack, i: number, arr: ITrack[]) => {
            if(arr.length === index){
              el.isPlaying = false
            } else {              
              if((index + 1) === i){
                el.isPlaying = true
              } else {
                el.isPlaying = false
              }
            }
            return el;
          })
        },
        player: index === (state.chart.data!.length - 1)
          ? state.chart.data![state.chart.data!.length - 1]
          : state.chart.data![state.chart.data!.findIndex((el: ITrack) => el.key === action.payload) + 1]
      }
    }
    case PREV_TRACK: {
      let index = state.chart.data!.findIndex((el: ITrack) => el.key === action.payload);
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data!.map((el: ITrack, i: number) => {
            if(index > 0){            
              if((index - 1) === i){
                el.isPlaying = true
              } else {
                el.isPlaying = false
              }
            } else {
              el.isPlaying = false
            }
            return el;
          })
        },
        player: index > 0 ? state.chart.data![index - 1] : state.chart.data![0]
      }
    }
    default: {
      return state
    }
  }
}