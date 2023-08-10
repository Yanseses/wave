import { IPlayerIcons } from "../utils";

export const RepeatIcon = ({ size = 30, color = 'white' }: IPlayerIcons): JSX.Element => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 120l48 48-48 48"/>
      <path d="M352 168H144a80.24 80.24 0 00-80 80v16M192 392l-48-48 48-48" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M160 344h208a80.24 80.24 0 0080-80v-16" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </svg>  
  )
}