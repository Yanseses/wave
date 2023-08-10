// import axios from "axios"
import { getCookie } from "../../utils/cookie"
import { chartList, countryChartRu } from "../../utils/mocks/charts";
import { IGenres, ITrack, TGenresCountry } from "../../utils/types";
import { getChartListFailed, getChartListRequest, getChartListSuccess, getGenresCountryFailed, getGenresCountryRequest, getGenresCountrySuccess } from "../actions/main"
import { AppDispatch } from "../types/types";

export function getChartGenres(){
  return function(dispatch: AppDispatch){
    dispatch(getGenresCountryRequest());
    // axios.get('https://shazam.p.rapidapi.com/charts/list', {
    //   headers: {
    //     'X-RapidAPI-Key': 'dc47e195a2mshece2bedd874ecf3p1669cajsn7399e7e3acd4',
    //     'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    //   }
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