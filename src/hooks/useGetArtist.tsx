import { useEffect, useState } from "react"
import { getDetails } from "../utils/mocks/artists"

export const useGetArtist = (artistId: string) => {
  const [ state, setState ] = useState<any>({
    request: false,
    failed: false,
    error: '',
    data: null
  })

  useEffect(() => {
    setState({ ...state, request: true })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(getDetails)
      }).then((req: any) => {
        setState({ request: false, error: '', data: req.data[0], failed: false, })
      }).catch((err) => {
        setState({ ...state, error: 'Failed to fetch', failed: true })
      })
    }, 1000)
  }, [ artistId ])

  return state;
}