import { IPlayerIcons } from "../utils";

export const HeadsetIcon = ({ size = 30, color = 'white' }: IPlayerIcons): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 512 512">
      <path d="M83 384c-13-33-35-93.37-35-128C48 141.12 149.33 48 256 48s208 93.12 208 208c0 34.63-23 97-35 128" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M108.39 270.13l-13.69 8h0c-30.23 17.7-31.7 72.41-3.38 122.2s75.87 75.81 106.1 58.12h0l13.69-8a16.16 16.16 0 005.78-21.87L130 276a15.74 15.74 0 00-21.61-5.87zM403.61 270.13l13.69 8h0c30.23 17.69 31.74 72.4 3.38 122.19s-75.87 75.81-106.1 58.12h0l-13.69-8a16.16 16.16 0 01-5.78-21.87L382 276a15.74 15.74 0 0121.61-5.87z" fill="none" stroke={color} strokeMiterlimit="10" strokeWidth="32"/>
    </svg>
    )
}