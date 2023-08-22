import { IPlayerIcons } from "../utils";

export const BanIcon = ({ size = 30, color = 'white' }: IPlayerIcons): JSX.Element => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
    <circle fill="none" stroke={color} strokeMiterlimit="10" strokeWidth="48" cx="256" cy="256" r="200"/>
    <path stroke={color} strokeMiterlimit="10" strokeWidth="48" d="M114.58 114.58l282.84 282.84"/>
  </svg>
  )
}