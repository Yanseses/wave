import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiHeader, localApiUrl, shazamApiUrl } from '../../utils/queryConstants'
import { getCookie } from '../../utils/cookie';
import { IGenres, IGenresCountry, ITrackData } from '../types/types';

const isProductionMode = process.env.NODE_ENV === 'production';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: isProductionMode ? shazamApiUrl : localApiUrl,
    headers: apiHeader
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getGenres: builder.query<any, string>({
      query: () => `/charts/list`,
      transformResponse: (res: any) => {
        const cookie = getCookie('country') || 'en';
        const selectedCountry = cookie.length > 2 
        ? cookie.split('-')[0].toUpperCase() 
        : cookie.toUpperCase();
        if(isProductionMode){
          return {
            country: res.countries.find((country: IGenresCountry) => country.id === selectedCountry),
            global: res.global.genres
          } as IGenres;
        } else {
          return {
            country: res.data.countries.find((country: IGenresCountry) => country.id === selectedCountry),
            global: res.data.global.genres
          } as IGenres;
        }
      }
    }),
    getTracksByKey: builder.query<any, { listId: string, paginator: number }>({
      query: ({listId, paginator}) => ({
        url: '/charts/track',
        params: {
          listId: listId,
          locale: getCookie('country'),
          pageSize: 20,
          startFrom: paginator
        }
      }),
      transformResponse: (res: any) => isProductionMode ? res.tracks : res.data.tracks,
      serializeQueryArgs: ({ queryArgs }) => queryArgs.listId,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      // Сделать проверку условий перевызова на повторный заход на страницу
      merge: (currentCashe, newData) => ([ ...currentCashe, ...newData ]),
    }),
    getArtists: builder.query({
      query: () => ({ 
        url: '/charts/track',
        params: {
          locale: getCookie('country'),
          pageSize: 20,
          startFrom: 0
          }
      }),
      transformResponse: (res: any) => {
        let artists;
        if(isProductionMode){
          artists = res.tracks.map((el: ITrackData) => ({
            artist: el.artists ? el.artists[0] : null,
            name: el.subtitle.split(',')[0].split('&')[0],
            image: el.share.avatar ? el.share.avatar : el.share.image
          }))
        } else {
          artists = res.data.tracks.map((el: ITrackData) => ({
            artist: el.artists ? el.artists[0] : null,
            name: el.subtitle.split(',')[0].split('&')[0],
            image: el.share.avatar ? el.share.avatar : el.share.image
          }))
        }
        return artists;
      }
    }),
    getArtistsById: builder.query<any, string>({ 
      query: (artistId) => ({
        url: '/artists/get-summary',
        params: {
          id: artistId,
          l: getCookie('country')
        }
      }),
      transformResponse: (res: any) => {
        return isProductionMode ? res.resources : res.data.data.resources
      }
    }),
    getSoundById: builder.query<any, string>({ 
      query: (soundId) => ({
        url: '/songs/get-details',
        params: {
          key: soundId,
          locale: getCookie('country')
        }
      }),
      transformResponse: (res: any) => {
        return isProductionMode ? res : res.data[0].data;
      }
    })
  })
})

export const { 
  useGetGenresQuery, 
  useGetTracksByKeyQuery,
  useGetArtistsByIdQuery, 
  useGetArtistsQuery,
  useGetSoundByIdQuery
} = shazamApi;