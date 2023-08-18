import styles from './home.module.css';
import { FC } from "react";
import { Route, Routes } from 'react-router';
import { Track } from './Track/Track';
import { Main } from './Main/Main';
import { Aside } from '../../components/Aside/Aside';

export const Home: FC = () => {
  return (
    <main className={styles.home}>
      <Routes>
        <Route path='/' element={ <Main /> } /> 
        <Route path='/track/:id' element={ <Track />} />
      </Routes>
      <Aside />
    </main>
  )
}