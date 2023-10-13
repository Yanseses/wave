import { IPlayerIcons } from "../utils";

export const WaveIcon = ({ size = 30, color = 'white' }: IPlayerIcons): JSX.Element => {
  return (
  <svg width={size} height={size} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="220"  width="30" height="60" rx="20" ry="20" >
      <animate attributeName="height" values="60;220;60" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="220;140;220" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="60" y="180"  width="30" height="140" rx="20" ry="20" >
      <animate attributeName="height" values="140;60;260;140" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="180;220;120;180" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="110" y="140" width="30" height="220" rx="20" ry="20" >
      <animate attributeName="height" values="220;60;300;220" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="140;220;100;140" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="160" y="100" width="30" height="300" rx="20" ry="20">
      <animate attributeName="height" values="300;140;300" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="100;180;100" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="210" y="140" width="30" height="220" rx="20" ry="20">
      <animate attributeName="height" values="220;60;300;220" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="140;220;100;140" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="260" y="180" width="30" height="140" rx="20" ry="20">
      <animate attributeName="height" values="140;60;260;140" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="180;220;120;180" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="310" y="220" width="30" height="60" rx="20" ry="20">
      <animate attributeName="height" values="60;260;220;60" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="220;120;140;220" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="360" y="180" width="30" height="140" rx="20" ry="20">	
      <animate attributeName="height" values="140;60;260;140" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="180;220;120;180" dur="1s" repeatCount="indefinite" />
    </rect>
    <rect x="410" y="140" width="30" height="220" rx="20" ry="20">	
      <animate attributeName="height" values="220;60;300;220" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="140;220;100;140" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="460" y="100" width="30" height="300" rx="20" ry="20">	
      <animate attributeName="height" values="300;60;300" dur="1s" repeatCount="indefinite" />
      <animate attributeName="y" values="100;220;100" dur="1s" repeatCount="indefinite" />
    </rect>
  </svg>
  )
}