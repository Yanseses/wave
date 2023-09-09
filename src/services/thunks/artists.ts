import axios from "axios"
import { countryChartRu } from "../../utils/mocks/charts"
import { getTopArtistsFailed, getTopArtistsRequest, getTopArtistsSuccess } from "../actions/artists"
import { AppDispatch } from "../types/types"
import { apiHeader } from "../../utils/constants"
import { getCookie } from "../../utils/cookie"
import { ITrackData } from "../../hooks/useGetTracksQuery"

export function getTopArtists(){
  return function(dispatch: AppDispatch){
    dispatch(getTopArtistsRequest())
    if(process.env.NODE_ENV === 'production'){
      axios.get('https://shazam.p.rapidapi.com/charts/track', {
        headers: apiHeader,
        params: {
          locale: getCookie('country'),
          pageSize: 20,
          startFrom: 0
        }
      }).then((res) => {
        if(res.status >= 200 && res.status < 300){
          const artists: ITrackData[] = res.data.tracks.map((el: ITrackData) => ({
            artist: el.artists ? el.artists[0] : null,
            name: el.subtitle.split(',')[0].split('&')[0],
            image: el.share.avatar ? el.share.avatar : el.share.image
          }));
          dispatch(getTopArtistsSuccess(artists))
        } else {
          throw new Error(res.statusText)
        }
      }).catch((err) => {
        dispatch(getTopArtistsFailed(err))
      })
    } else {    
      setTimeout(async () => {
        return new Promise((resolve, reject) => {
          resolve(countryChartRu)
        }).then((req: any) => {
          const artists: ITrackData[] = req.tracks.map((el: ITrackData) => ({
            artist: el.artists ? el.artists[0] : null,
            name: el.subtitle.split(',')[0].split('&')[0],
            image: el.share.avatar ? el.share.avatar : el.share.image
          }));
          dispatch(getTopArtistsSuccess(artists))
        }).catch((err) => {
          dispatch(getTopArtistsFailed(err))
        })
      }, 1000)
    }
  }
}