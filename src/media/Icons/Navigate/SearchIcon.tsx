import { IPlayerIcons } from "../utils";

export const SearchIcon = ({ size = 30, color = 'white' }: IPlayerIcons): JSX.Element => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" stroke={color} strokeMiterlimit="10" strokeWidth="32" fill="none"/>
      <path stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"  fill="none"/>
    </svg>  
  )
}