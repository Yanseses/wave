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