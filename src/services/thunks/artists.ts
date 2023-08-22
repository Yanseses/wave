import { countryChartRu } from "../../utils/mocks/charts"
import { ITrackData } from "../../utils/types"
import { AppDispatch } from "../types/types"

export function getTopArtists(){
  return function(dispatch: AppDispatch){
    // dispatch(getChartListRequest())
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
        const artists: ITrackData[] = req.tracks.map((el: any) => ({
          artists: el.artists || null,
        }))
        console.log(artists)
        // dispatch(getChartListSuccess(countryChart))
      }).catch((err) => {
        // dispatch(getChartListFailed(err))
      })
    }, 1000)
  }
}