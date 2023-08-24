import styles from './genres.module.css';
import { FC } from "react";
import { Routes, Route } from "react-router";
import { GenresMain } from "./GenresMain/GenresMain";
import { GenresType } from "./GenresType/GenresType";

export const Genres: FC = () => {
  return (
    <main className={styles.genres}>
      <Routes>
        <Route path={'/'} element={ <GenresMain /> }/>
        <Route path={'/:id'} element={ <GenresType /> }/>
      </Routes>
    </main>
  )
}