import { IGenres, ITrackData } from "../../utils/types"
import { 
  GET_CHART_LIST_FAILED, 
  GET_CHART_LIST_REQUEST, 
  GET_CHART_LIST_SUCCESS,
  GET_GENRES_COUNTRY_FAILED,
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS,
  GET_GENRE_TRACKS_FAILED,
  GET_GENRE_TRACKS_REQUEST,
  GET_GENRE_TRACKS_SUCCESS
} from "../actionTypes/main"

interface IGetChartListRequest {
  readonly type: typeof GET_CHART_LIST_REQUEST
}

interface IGetChartListFailed {
  readonly type: typeof GET_CHART_LIST_FAILED,
  payload: string
}

interface IGetChartListSuccess {
  readonly type: typeof GET_CHART_LIST_SUCCESS,
  payload: ITrackData[]
}

interface IGetGenresCountryRequest {
  readonly type: typeof GET_GENRES_COUNTRY_REQUEST,
}

interface IGetGenresCountryFailed {
  readonly type: typeof GET_GENRES_COUNTRY_FAILED,
  payload: string
}

interface IGetGenresCountrySuccess {
  readonly type: typeof GET_GENRES_COUNTRY_SUCCESS,
  payload: any
}

interface IGetGenreTracksRequest {
  readonly type: typeof GET_GENRE_TRACKS_REQUEST
}

interface IGetGenreTracksFailed {
  readonly type: typeof GET_GENRE_TRACKS_FAILED,
  payload: string
}

interface IGetGenreTracksSuccess {
  readonly type: typeof GET_GENRE_TRACKS_SUCCESS,
  payload: ITrackData[]
}

export type TMainActions = IGetChartListRequest
  | IGetChartListFailed
  | IGetChartListSuccess
  | IGetGenresCountryRequest
  | IGetGenresCountryFailed
  | IGetGenresCountrySuccess
  | IGetGenreTracksRequest
  | IGetGenreTracksFailed
  | IGetGenreTracksSuccess


export const getChartListRequest = (): IGetChartListRequest => {
  return {
    type: GET_CHART_LIST_REQUEST
  }
}

export const getChartListFailed = (error: string): IGetChartListFailed => {
  return {
    type: GET_CHART_LIST_FAILED,
    payload: error
  }
}

export const getChartListSuccess = (data: ITrackData[]): IGetChartListSuccess => {
  return {
    type: GET_CHART_LIST_SUCCESS,
    payload: data
  }
}

export const getGenresCountryRequest = (): IGetGenresCountryRequest => {
  return {
    type: GET_GENRES_COUNTRY_REQUEST
  }
}

export const getGenresCountryFailed = (error: string): IGetGenresCountryFailed => {
  return {
    type: GET_GENRES_COUNTRY_FAILED,
    payload: error
  }
}

export const getGenresCountrySuccess = (data: IGenres): IGetGenresCountrySuccess => {
  return {
    type: GET_GENRES_COUNTRY_SUCCESS,
    payload: data
  }
}

export const getGenreTracksRequest = (): IGetGenreTracksRequest => {
  return {
    type: GET_GENRE_TRACKS_REQUEST
  }
}

export const getGenreTracksFailed = (err: string): IGetGenreTracksFailed => {
  return {
    type: GET_GENRE_TRACKS_FAILED,
    payload: err
  }
}

export const getGenreTracksSuccess = (data: ITrackData[]): IGetGenreTracksSuccess => {
  return {
    type: GET_GENRE_TRACKS_SUCCESS,
    payload: data
  }
}