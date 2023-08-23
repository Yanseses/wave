import { countryChartRu } from "../../utils/mocks/charts"
import { ITrackData } from "../../utils/types"
import { getTopArtistsFailed, getTopArtistsRequest, getTopArtistsSuccess } from "../actions/artists"
import { AppDispatch } from "../types/types"

export function getTopArtists(){
  return function(dispatch: AppDispatch){
    dispatch(getTopArtistsRequest())
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