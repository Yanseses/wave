import { 
  ACTIVE_PLAYER,
  ADD_TO_PLAYER,
  GET_CHART_LIST_FAILED, 
  GET_CHART_LIST_REQUEST, 
  GET_CHART_LIST_SUCCESS, 
  GET_GENRES_COUNTRY_FAILED, 
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS,
  INACTIVE_PLAYER,
  NEXT_TRACK,
  PREV_TRACK
} from "../actionTypes/main"
import { TChartActions } from "../actions/main";

interface IRequest {
  request: boolean,
  failed: boolean,
  error: string,
  data: any
}

interface IChartStore {
  chart: IRequest,
  genres: IRequest,
  player: any | null
}

const initStore = {
  chart: {
    request: false,
    failed: false,
    error: '',
    data: []
  },
  genres: {
    request: false,
    failed: false,
    error: '',
    data: null
  },
  player: null
}

export const mainReducer = (state: IChartStore = initStore, action: TChartActions) => {
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
        player: state.chart.data[0],
        genres: {
          ...state.genres,
          request: false,
          failed: false,
          data: action.payload
        },
      }
    }
    case ADD_TO_PLAYER: {
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data.map((el: any) => {
            el.isPlaying = false
            return el;
          })
        },
        player: state.chart.data.find((el: any) => el.id === action.payload)
      }
    }
    case ACTIVE_PLAYER: {
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data.map((el: any) => {
            if(el.id === action.payload){
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
          data: state.chart.data.map((el: any) => {
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
      let index = state.chart.data.findIndex((el: any) => el.id === action.payload);
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data.map((el: any, i: number, arr: any[]) => {
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
        player: index === (state.chart.data.length - 1)
          ? state.chart.data[state.chart.data.length - 1]
          : state.chart.data[state.chart.data.findIndex((el: any) => el.id === action.payload) + 1]
      }
    }
    case PREV_TRACK: {
      let index = state.chart.data.findIndex((el: any) => el.id === action.payload);
      return {
        ...state,
        chart: {
          ...state.chart,
          data: state.chart.data.map((el: any, i: number) => {
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
        player: index > 0 ? state.chart.data[index - 1] : state.chart.data[0]
      }
    }
    default: {
      return state
    }
  }
}