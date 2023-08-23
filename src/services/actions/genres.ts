import { IGenres } from "../../utils/types"
import { 
  GET_GENRES_COUNTRY_FAILED,
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS
} from "../actionTypes/genres"

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

export type TGenresActions = IGetGenresCountryRequest
  | IGetGenresCountryFailed
  | IGetGenresCountrySuccess;


export const getGenresCountryRequest = (): IGetGenresCountryRequest => ({
  type: GET_GENRES_COUNTRY_REQUEST
})

export const getGenresCountryFailed = (error: string): IGetGenresCountryFailed => ({
  type: GET_GENRES_COUNTRY_FAILED,
  payload: error
})

export const getGenresCountrySuccess = (data: IGenres): IGetGenresCountrySuccess => ({
  type: GET_GENRES_COUNTRY_SUCCESS,
  payload: data
})