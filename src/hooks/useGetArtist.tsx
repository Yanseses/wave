import { useEffect, useState } from "react"
import { getDetails } from "../utils/mocks/artists"
import { apiHeader } from "../utils/constants"
import axios from "axios"
import { getCookie } from "../utils/cookie"

export const useGetArtist = (artistId: string) => {
  const [ state, setState ] = useState<any>({
    request: false,
    failed: false,
    error: '',
    data: null
  })

  useEffect(() => {
    setState({ ...state, request: true });
    axios.get('https://shazam.p.rapidapi.com/artists/get-details', {
      headers: apiHeader,
      params: {
        id: artistId,
        l: getCookie('country')
      }
    }).then((req) => {
      if(req.status >= 200 && req.status < 300){
        setState({ request: false, error: '', data: req.data.data[0], failed: false })
      } else {
        throw new Error('Failed to fetch')
      }
    }).catch((err) => {
      setState({ ...state, request: false, error: err, failed: true })
    })
    // setTimeout(async () => {
    //   return new Promise((resolve, reject) => {
    //     resolve(getDetails)
    //   }).then((req: any) => {
    //     setState({ request: false, error: '', data: req.data[0], failed: false, })
    //   }).catch((err) => {
    //     setState({ ...state, error: 'Failed to fetch', failed: true })
    //   })
    // }, 1000)
  }, [ artistId ])

  return state;
}