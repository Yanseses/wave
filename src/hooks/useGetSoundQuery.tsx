import axios from 'axios';
import { useEffect, useState } from "react"
import { sound } from "../utils/mocks/sound"
import { apiHeader } from "../utils/constants";
import { getCookie } from "../utils/cookie";

export const useGetSoundQuery = (soundId: string) => {
  const [ state, setState ] = useState<any>({
    request: false,
    failed: false,
    error: '',
    data: null
  })

  useEffect(() => {
    setState({ ...state, request: true });
    // axios.get('https://shazam.p.rapidapi.com/songs/get-details', {
    //   headers: apiHeader,
    //   params: {
    //     key: soundId,
    //     locale: getCookie('country')
    //   }
    // }).then((req) => {
    //   if(req.status >= 200 && req.status < 300){
    //     setState({ request: false, error: '', data: req.data, failed: false  })
    //   } else {
    //     throw new Error(req.statusText)
    //   }
    // }).catch((err) => {
    //   setState({ ...state, error: 'Failed to fetch', failed: true })
    // })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(sound)
      }).then((data: any) => {
        setState({ request: false, error: '', data: data, failed: false, })
      }).catch((err) => {
        setState({ ...state, error: 'Failed to fetch', failed: true })
      })
    }, 1000)
  }, [ soundId ])

  return state;
}