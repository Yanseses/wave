import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiHeader, checkMode, localApiUrl, shazamApiUrl } from '../../utils/queryConstants'
import { getCookie } from '../../utils/cookie';
import { IGenres, IGenresCountry, ITrackData } from '../types/types';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: checkMode() ? shazamApiUrl : localApiUrl,
    headers: apiHeader
  }),
  tagTypes: ['Genres', 'Sounds', 'Artists'],
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `/charts/list`,
      transformResponse: (res: any) => {
        const cookie = getCookie('country') || 'en';
        const selectedCountry = cookie.length > 2 
        ? cookie.split('-')[0].toUpperCase() 
        : cookie.toUpperCase();
        if(checkMode()){
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
    getTracksByKey: builder.query({
      query: ({listId, paginator}) => ({
        url: '/charts/track',
        params: {
          listId: listId,
          locale: getCookie('country'),
          pageSize: 20,
          startFrom: paginator
        }
      }),
      transformResponse: (res: any) => {
        if(checkMode()){
          return res.tracks;
        } else {
          return res.data.tracks;
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCashe, newData) => {
        currentCashe.push(...newData)
      }
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
        if(checkMode()){
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
    getArtistsById: builder.query({ 
      query: (artistId) => ({
        url: '/artists/get-summary',
        params: {
          id: artistId,
          l: getCookie('country')
        }
      }),
      transformResponse: (res: any) => {
        return checkMode() ? res.resources : res.data.data.resources
      }
    }),
    getSoundById: builder.query({ 
      query: (soundId) => ({
        url: '/songs/get-details',
        params: {
          key: soundId,
          locale: getCookie('country')
        }
      }),
      transformResponse: (res: any) => {
        return checkMode() ? res : res.data[0].data;
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