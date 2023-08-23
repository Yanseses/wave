import { 
  GET_TOP_ARTISTS_FAILED, 
  GET_TOP_ARTISTS_REQUEST, 
  GET_TOP_ARTISTS_SUCCESS 
} from "../actionTypes/artists"

interface IGetTopArtistsRequest {
  readonly type: typeof GET_TOP_ARTISTS_REQUEST
}

interface IGetTopArtistsFailed {
  readonly type: typeof GET_TOP_ARTISTS_FAILED,
  payload: string
}

interface IGetTopArtistsSuccess {
  readonly type: typeof GET_TOP_ARTISTS_SUCCESS,
  payload: any
}

export type TTopArtists = IGetTopArtistsRequest
  | IGetTopArtistsFailed
  | IGetTopArtistsSuccess

export const getTopArtistsRequest = (): IGetTopArtistsRequest => ({
  type: GET_TOP_ARTISTS_REQUEST
})

export const getTopArtistsFailed = (err: string): IGetTopArtistsFailed => ({
  type: GET_TOP_ARTISTS_FAILED,
  payload: err
})

export const getTopArtistsSuccess = (data: any): IGetTopArtistsSuccess => ({
  type: GET_TOP_ARTISTS_SUCCESS,
  payload: data
})