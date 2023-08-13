export interface IGenres {
  country: TGenresCountry[],
  global: IGenresGlobal[]
}

export interface IGenresGlobal {
  count: number,
  id: string,
  listid: string,
  name: string
  urlPath: string
}

export type TGenresCountry = {
  countryId: string
} & IGenresGlobal

export interface ITrackData {
  isPlaying: boolean,
  key: string,
  title: string,
  subtitle: string,
  avatar: string,
  image: string,
  artists: null | IArtists[],
  audio: null | string
}

export interface IArtists {
  adamid: string,
  alias: string,
  id: string
}