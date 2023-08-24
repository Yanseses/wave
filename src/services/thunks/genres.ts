import { getCookie } from "../../utils/cookie"
import { chartList } from "../../utils/mocks/charts";
import { IGenres, TGenresCountry } from "../../utils/types";
import { getGenresCountryFailed, getGenresCountryRequest, getGenresCountrySuccess } from "../actions/genres"
import { AppDispatch } from "../types/types";

export function getChartGenres(){
  return function(dispatch: AppDispatch){
    dispatch(getGenresCountryRequest());
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(chartList)
      }).then((el: any) => {
        const cookie = getCookie('country') || 'en';
        const selectedCountry = cookie.length > 2 
          ? cookie.split('-')[0].toUpperCase() 
          : cookie.toUpperCase();
        const genres: IGenres = {
          country: el.countries.find((country: TGenresCountry) => country.id === selectedCountry),
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