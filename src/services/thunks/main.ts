// import axios from "axios"
// import { apiHeader } from "../../utils/constants";
import { getCookie } from "../../utils/cookie"
import { chartList, countryChartRu, countryChartRuDance } from "../../utils/mocks/charts";
import { IGenres, ITrack, TGenresCountry } from "../../utils/types";
import { getChartListFailed, getChartListRequest, getChartListSuccess, getGenreTracksFailed, getGenreTracksRequest, getGenreTracksSuccess, getGenresCountryFailed, getGenresCountryRequest, getGenresCountrySuccess } from "../actions/main"
import { AppDispatch } from "../types/types";

export function getChartGenres(){
  return function(dispatch: AppDispatch){
    dispatch(getGenresCountryRequest());
    // axios.get('https://shazam.p.rapidapi.com/charts/list', {
    //   headers: apiHeader
    // }).then((req: any) => {
    //   if(req.status === 200){
    //     return req;
    //   } else {
    //     throw new Error(req.statusText)
    //   }
    // }).then((data) => {
    //   const genres = {
    //     country: data.countries.find((country: any) => country.id === getCookie('country')?.substring(3, 5)).genres,
    //     global: data.global.genres
    //   }
    //   dispatch(getGenresCountrySuccess(genres))
    // }).catch((err) => {
    //   console.log(err)
    //   dispatch(getGenresCountryFailed(err))
    // })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(chartList)
      }).then((el: any) => {
        const genres: IGenres = {
          country: el.countries.find((country: TGenresCountry) => country.id === getCookie('country')?.substring(3, 5)).genres,
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
    // axios.get('https://shazam.p.rapidapi.com/charts/track', {
    //   headers: apiHeader
    // }).then((req: any) => {
    //   if(req.status === 200){
    //     return req;
    //   } else {
    //     throw new Error(req.statusText)
    //   }
    // }).then((data) => {
    //   const countryChart: ITrack[] = data.tracks.map((el: any) => ({
    //     isPlaying: false,
    //     key: el.key,
    //     title: el.title,
    //     subtitle: el.subtitle,
    //     avatar: el.share.avatar,
    //     image: el.share.image,
    //     artists: el.artists || null,
    //     audio: el.hub.actions ? el.hub.actions[1].uri : null
    //   }))
    //   dispatch(getChartListSuccess(countryChart))
    // }).catch((err) => {
    //   console.log(err)
    //   dispatch(getChartListFailed(err))
    // })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(countryChartRu)
      }).then((req: any) => {
        const countryChart: ITrack[] = req.tracks.map((el: any) => ({
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
    // axios.get('https://shazam.p.rapidapi.com/charts/track', {
    //   headers: apiHeader
    // }).then((req: any) => {
    //   if(req.status === 200){
    //     return req;
    //   } else {
    //     throw new Error(req.statusText)
    //   }
    // }).then((data) => {
    //   const countryChart: ITrack[] = data.tracks.map((el: any) => ({
    //     isPlaying: false,
    //     key: el.key,
    //     title: el.title,
    //     subtitle: el.subtitle,
    //     avatar: el.share.avatar,
    //     image: el.share.image,
    //     artists: el.artists || null,
    //     audio: el.hub.actions ? el.hub.actions[1].uri : null
    //   }))
    //   dispatch(getGenreTracksSuccess(countryChart))
    // }).catch((err) => {
    //   console.log(err)
    //   dispatch(getGenreTracksFailed(err))
    // })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(countryChartRuDance)
      }).then((req: any) => {
        const countryChart: ITrack[] = req.tracks.map((el: any) => ({
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