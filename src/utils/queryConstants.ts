export const shazamApiUrl = 'https://shazam.p.rapidapi.com';
export const localApiUrl = 'http://localhost:3001';

export const apiHeader = {
  'X-RapidAPI-Key': process.env.REACT_APP_CORE_RAPID_API || '',
  'X-RapidAPI-Host':  process.env.REACT_APP_GEO_API || ''
}