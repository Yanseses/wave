import { useEffect, useState } from "react";
import { countryChartRu, globalChartGenres } from "../utils/mocks/charts";
import axios from "axios";
import { apiHeader } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import { error } from "console";

export interface ITrackData {
  artists?: IArtists[],
  highlightsurls: IHighlightSurls,
  hub: IHub,
  images: IImages,
  key: string,
  layout: string,
  properties: any,
  share: IShare,
  title: string,
  subtitle: string,
  type: string,
  url: string
}

export interface IArtists {
  adamid: string,
  alias: string,
  id: string
}

interface IHighlightSurls {
  artisthighlightsurl: string
}

interface IHub {
  displayname: string,
  explicit: boolean,
  type: string,
  image: string,
  options: any,
  actions: any
}

interface IImages {
  background: string,
  coverart: string,
  coverarthq: string,
  joecolor: string
}

interface IShare {
  avatar: string,
  href: string,
  html: string,
  image: string,
  snapchat: string,
  subject: string,
  text: string,
  twitter: string
}

interface IUseGetTracks {
  request: boolean,
  failed: boolean,
  error: string,
  data: null | ITrackData[]
}

export const useGetTracksQuery = (listId: string) => {
  const [ state, setState ] = useState<IUseGetTracks>({
    request: false,
    failed: false,
    error: '',
    data: null
  });

  useEffect(() => {
    setState({ ...state, request: true })
    if(process.env.NODE_ENV === 'production'){
      axios.get('https://shazam.p.rapidapi.com/charts/track', {
        headers: apiHeader,
        params: {
          listId: listId,
          locale: getCookie('country')
        }
      }).then((res) => {
        if(res.status >= 200 && res.status < 300){
          setState({ request: false, error: '', data: res.data.tracks, failed: false, })
        } else {
          throw new Error(res.statusText)
        }
      }).catch((err) => {
        setState({ ...state, request: false, error: err.response.data, failed: true })
      })
    } else {
      setTimeout(async () => {
        return new Promise((resolve, reject) => {
          resolve(listId === 'ip-country-chart-RU' ? countryChartRu : globalChartGenres[Number(listId.split('-')[3])])
        }).then((req: any) => {
          setState({ request: false, error: '', data: req.tracks, failed: false, })
        }).catch((err) => {
          setState({ ...state, request: false, error: 'Failed to fetch', failed: true })
        })
      }, 1000)
    }
  }, [ listId ])

  return state;
}