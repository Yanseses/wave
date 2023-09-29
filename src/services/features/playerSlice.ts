import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ITrackData } from "../types/types"

interface IPlayerState {
  currentSongs: null | ITrackData[],
  activeSong: null | ITrackData,
  isPlaying: boolean,
  currentIndex: number,
  genreListId: string
}

const initialState: IPlayerState = {
  currentSongs: null,
  activeSong: null,
  isPlaying: false,
  currentIndex: 0,
  genreListId: ''
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<{song: ITrackData, list: ITrackData[], index: number}>) => {
      state.currentSongs = action.payload.list;
      state.activeSong = action.payload.song;
      state.currentIndex = action.payload.index;
    },
    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    prevTrack: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs && state.currentSongs[action.payload]
    },
    nextTrack: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs && state.currentSongs[action.payload]
    }
  }
});

export const { setActiveSong, playPause, prevTrack, nextTrack } = playerSlice.actions;
export default playerSlice.reducer;