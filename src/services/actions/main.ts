import { IGenres, ITrackData } from "../../utils/types"
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

interface IAddToPlayer {
  readonly type: typeof ADD_TO_PLAYER,
  payload: string
}

interface IActivePlayer {
  readonly type: typeof ACTIVE_PLAYER,
  payload: string
}

interface IInactivePlayer {
  readonly type: typeof INACTIVE_PLAYER,
  payload: string
}

interface INextTrack {
  readonly type: typeof NEXT_TRACK,
  payload: string
}

interface IPrevTrack {
  readonly type: typeof PREV_TRACK,
  payload: string
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
  | IAddToPlayer
  | IActivePlayer
  | IInactivePlayer
  | INextTrack
  | IPrevTrack


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

export const addToPlayer = (key: string): IAddToPlayer => {
  return {
    type: ADD_TO_PLAYER,
    payload: key
  }
}

export const activePlayer = (id: string): IActivePlayer => {
  return {
    type: ACTIVE_PLAYER,
    payload: id
  }
}

export const inactivePlayer = (id: string): IInactivePlayer => {
  return {
    type: INACTIVE_PLAYER,
    payload: id
  }
}

export const nextTrack = (id: string): INextTrack => {
  return {
    type: NEXT_TRACK,
    payload: id
  }
}

export const prevTrack = (id: string): IPrevTrack => {
  return {
    type: PREV_TRACK,
    payload: id
  }
}