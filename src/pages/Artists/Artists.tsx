import styles from './artists.module.css';
import { FC } from "react"
import { Route, Routes } from 'react-router';
import { ArtistsDetail } from "./ArtistsDetail/ArtistsDetail";
import { ArtistsMain } from "./ArtistsMain/ArtistsMain";

export const Artists: FC = () => {
  return (
    <main className={styles.artists}>
      <Routes>
        <Route path='/' element={ <ArtistsMain /> } />
        <Route path='/:id' element={ <ArtistsDetail /> }/>
      </Routes>
    </main>
  )
}