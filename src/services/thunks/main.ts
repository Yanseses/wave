import { getCookie } from "../../utils/cookie"
import { chartList, countryChartRu, globalChartGenres } from "../../utils/mocks/charts";
import { IGenres, ITrackData, TGenresCountry } from "../../utils/types";
import { getChartListFailed, getChartListRequest, getChartListSuccess, getGenreTracksFailed, getGenreTracksRequest, getGenreTracksSuccess, getGenresCountryFailed, getGenresCountryRequest, getGenresCountrySuccess } from "../actions/main"
import { AppDispatch } from "../types/types";

export function getChartGenres(){
  return function(dispatch: AppDispatch){
    dispatch(getGenresCountryRequest());
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(chartList)
      }).then((el: any) => {
        const genres: IGenres = {
          country: el.countries.find((country: TGenresCountry) => country.id === getCookie('country')?.substring(3, 5)),
          global: el.global.genres
        }
        dispatch(getGenresCountrySuccess(genres))
      }).catch((err) => {
        console.log(err)
        dispatch(getGenresCountryFailed(err))
      })
    }, 1000)
  }
}

export function getChartTracks(){
  return function(dispatch: AppDispatch){
    dispatch(getChartListRequest())
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(countryChartRu)
      }).then((req: any) => {
        const countryChart: ITrackData[] = req.tracks.map((el: any) => ({
          isPlaying: false,
          key: el.key,
          title: el.title,
          subtitle: el.subtitle,
          avatar: el.share.avatar,
          image: el.share.image,
          artists: el.artists || null,
          audio: el.hub.actions ? el.hub.actions[1].uri : null
        }))
        dispatch(getChartListSuccess(countryChart))
      }).catch((err) => {
        dispatch(getChartListFailed(err))
      })
    }, 1000)
  }
}

export function getGenresTrack(listid: string){
  return function(dispatch: AppDispatch){
    dispatch(getGenreTracksRequest())
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(globalChartGenres[Number(listid.split('-')[3])])
      }).then((req: any) => {
        const countryChart: ITrackData[] = req.map((el: any) => ({
          isPlaying: false,
          key: el.key,
          title: el.title,
          subtitle: el.subtitle,
          avatar: el.share.avatar,
          image: el.share.image,
          artists: el.artists || null,
          audio: el.hub.actions ? el.hub.actions[1].uri : null
        }))
        dispatch(getGenreTracksSuccess(countryChart))
      }).catch((err) => {
        console.log(err)
        dispatch(getGenreTracksFailed(err))
      })
    }, 1000)
  }
}