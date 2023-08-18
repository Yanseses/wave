import { 
  ACTIVE_PLAYER,
  ADD_TO_PLAYER,
  INACTIVE_PLAYER,
  NEXT_TRACK,
  PLAY_PAUSE,
  PREV_TRACK
} from "../actionTypes/player"

interface IAddToPlayer {
  readonly type: typeof ADD_TO_PLAYER,
  payload: {
    key: string,
    list: string
  }
}

interface IActivePlayer {
  readonly type: typeof ACTIVE_PLAYER,
  payload: string
}

interface IInactivePlayer {
  readonly type: typeof INACTIVE_PLAYER,
  payload: string
}

interface IPlayPause {
  readonly type: typeof PLAY_PAUSE
}

interface INextTrack {
  readonly type: typeof NEXT_TRACK,
  payload: string
}

interface IPrevTrack {
  readonly type: typeof PREV_TRACK,
  payload: string
}

export type TPlayerActions = IAddToPlayer
  | IActivePlayer
  | IInactivePlayer
  | INextTrack
  | IPrevTrack
  | IPlayPause

export const addToPlayer = (key: string, list: string): IAddToPlayer => {
  return {
    type: ADD_TO_PLAYER,
    payload: {
      key: key,
      list: list
    }
  }
}

export const activePlayer = (id: string): IActivePlayer => {
  return {
    type: ACTIVE_PLAYER,
    payload: id
  }
}

export const inactivePlayer = (id: string): IInactivePlayer => {
  return {
    type: INACTIVE_PLAYER,
    payload: id
  }
}

export const playPause = (): IPlayPause => {
  return {
    type: PLAY_PAUSE
  }
}

export const nextTrack = (id: string): INextTrack => {
  return {
    type: NEXT_TRACK,
    payload: id
  }
}

export const prevTrack = (id: string): IPrevTrack => {
  return {
    type: PREV_TRACK,
    payload: id
  }
}