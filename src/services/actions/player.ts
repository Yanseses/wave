import { ITrackData } from "../../hooks/useGetTracks"
import { 
  NEXT_TRACK,
  PLAY_PAUSE,
  PREV_TRACK,
  SET_ACTIVE_SONG
} from "../actionTypes/player"

interface ISetActiveSong {
  readonly type: typeof SET_ACTIVE_SONG,
  payload: {
    song: ITrackData,
    list: ITrackData[],
    index: number
  }
}

interface IPlayPause {
  readonly type: typeof PLAY_PAUSE,
  payload: boolean
}

interface IPrevTrack {
  readonly type: typeof PREV_TRACK,
  payload: number
}

interface INextTrack {
  readonly type: typeof NEXT_TRACK,
  payload: number
}

export type TPlayerActions = ISetActiveSong
  | IPlayPause
  | IPrevTrack
  | INextTrack;

export const setActiveSong = (song: ITrackData, list: ITrackData[], i: number): ISetActiveSong => ({
  type: SET_ACTIVE_SONG,
  payload: {
    song: song,
    list: list,
    index: i
  }
})

export const playPause = (status: boolean): IPlayPause => ({
  type: PLAY_PAUSE,
  payload: status
})

export const prevTrack = (index: number): IPrevTrack => ({
  type: PREV_TRACK,
  payload: index
})

export const nextTrack = (index: number): INextTrack => ({
  type: NEXT_TRACK,
  payload: index
})