import axios from "axios";
import { getCookie } from "../../utils/cookie"
import { chartList } from "../../utils/mocks/charts";
import { 
  IGenres, 
  IGenresCountry, 
  getGenresCountryFailed, 
  getGenresCountryRequest, 
  getGenresCountrySuccess 
} from "../actions/genres"
import { AppDispatch } from "../types/types";
import { apiHeader } from "../../utils/constants";

export function getChartGenres(){
  return function(dispatch: AppDispatch){
    dispatch(getGenresCountryRequest());
    if(process.env.NODE_ENV === 'production'){    
      axios.get('https://shazam.p.rapidapi.com/charts/list', {
        headers: apiHeader
      }).then((res) => {
        if(res.status >= 200 && res.status < 300){
          const cookie = getCookie('country') || 'en';
          const selectedCountry = cookie.length > 2 
          ? cookie.split('-')[0].toUpperCase() 
          : cookie.toUpperCase();
          const genres: IGenres = {
            country: res.data.countries.find((country: IGenresCountry) => country.id === selectedCountry),
            global: res.data.global.genres
          }
          dispatch(getGenresCountrySuccess(genres))
        } else {
          throw new Error(res.statusText)
        }
      }).catch((err) => {
        dispatch(getGenresCountryFailed(err.response.data))
      })
    } else {
      setTimeout(async () => {
        return new Promise((resolve, reject) => {
          resolve(chartList)
        }).then((el: any) => {
          const cookie = getCookie('country') || 'en';
          const selectedCountry = cookie.length > 2 
            ? cookie.split('-')[0].toUpperCase() 
            : cookie.toUpperCase();
          const genres: IGenres = {
            country: el.countries.find((country: IGenresCountry) => country.id === selectedCountry),
            global: el.global.genres
          }
          dispatch(getGenresCountrySuccess(genres))
        }).catch((err) => {
          dispatch(getGenresCountryFailed(err))
        })
      }, 1000)
    }
  }
}