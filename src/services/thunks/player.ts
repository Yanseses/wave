import { countryChartRu, globalChartGenres } from "../../utils/mocks/charts"
import { ITrackData } from "../../utils/types"
import { AppDispatch } from "../types/types"

export function getChartTracks(){
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
        console.log(countryChart)
        // dispatch(getChartListSuccess(countryChart))
      }).catch((err) => {
        // dispatch(getChartListFailed(err))
      })
    }, 1000)
  }
}

export function getGenresTrack(listid: string){
  return function(dispatch: AppDispatch){
    // dispatch(getGenreTracksRequest())
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
        console.log(countryChart)
        // dispatch(getGenreTracksSuccess(countryChart))
      }).catch((err) => {
        console.log(err)
        // dispatch(getGenreTracksFailed(err))
      })
    }, 1000)
  }
}