import { useEffect, useState } from "react";
import { countryChartRu, globalChartGenres } from "../utils/mocks/charts";
import { ITrackData } from "../utils/types";

interface IUseGetTracks {
  request: boolean,
  failed: boolean,
  error: string,
  data: null | ITrackData[]
}

export const useGetTracks = (listId?: string) => {
  const [ state, setState ] = useState<IUseGetTracks>({
    request: false,
    failed: false,
    error: '',
    data: null
  })

  useEffect(() => {
    setState({ ...state, request: true })
    setTimeout(async () => {
      return new Promise((resolve, reject) => {
        resolve(listId ? globalChartGenres[Number(listId.split('-')[3])] : countryChartRu)
      }).then((req: any) => {
        setState({ request: false, error: '', data: req.tracks, failed: false, })
      }).catch((err) => {
        setState({ ...state, error: 'Failed to fetch', failed: true })
      })
    }, 1000)
  }, [ listId ])

  return state;
}