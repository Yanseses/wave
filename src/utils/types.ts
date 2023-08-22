export interface IRequest {
  request: boolean,
  failed: boolean,
  error: string
}

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
  artists?: IArtists[],
  highlightsurls: IHighlightSurls,
  hub: IHub,
  images: IImages,
  key: string,
  layout: string,
  properties: any,
  share: IShare,
  title: string,
  subtitle: string,
  type: string,
  url: string
}

export interface IArtists {
  adamid: string,
  alias: string,
  id: string
}

interface IHighlightSurls {
  artisthighlightsurl: string
}

interface IHub {
  displayname: string,
  explicit: boolean,
  type: string,
  image: string,
  options: any,
  actions: any
}

interface IImages {
  background: string,
  coverart: string,
  coverarthq: string,
  joecolor: string
}

interface IShare {
  avatar: string,
  href: string,
  html: string,
  image: string,
  snapchat: string,
  subject: string,
  text: string,
  twitter: string
}