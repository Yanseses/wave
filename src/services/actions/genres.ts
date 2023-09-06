import { 
  GET_GENRES_COUNTRY_FAILED,
  GET_GENRES_COUNTRY_REQUEST,
  GET_GENRES_COUNTRY_SUCCESS
} from "../actionTypes/genres";

export interface IGenres {
  country: IGenresCountry,
  global: IGenresGlobal[]
}

export interface IGenresGlobal {
  count: number,
  id: string,
  listid: string,
  name: string
  urlPath: string
}

export interface IGenresCountry {
  cities: any,
  genres: TGenresItem[],
  id: string,
  listid: string,
  momentum_listid: string,
  name: string 
}

export type TGenresItem = {
  countryId: string
} & IGenresGlobal

interface IGetGenresCountryRequest {
  readonly type: typeof GET_GENRES_COUNTRY_REQUEST,
}

interface IGetGenresCountryFailed {
  readonly type: typeof GET_GENRES_COUNTRY_FAILED,
  payload: string
}

interface IGetGenresCountrySuccess {
  readonly type: typeof GET_GENRES_COUNTRY_SUCCESS,
  payload: IGenres
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