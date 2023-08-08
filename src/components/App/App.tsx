import styles from './app.module.css';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { setCookie } from '../../utils/cookie';
import { Menu } from '../Menu/Menu';
import { Genres, Artists, Home, NotFound, Sound } from '../../pages';
import { Player } from '../Player/Player';
import { useDispatch } from '../../services/hooks';
import { getChartGenres, getChartTracks } from '../../services/thunks/main';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setCookie('country', window.navigator.language);
    dispatch(getChartTracks())
    dispatch(getChartGenres())
  }, [dispatch]);
  
  return (
    <div className={styles.layout}>
      <Menu />
      <Routes>
        <Route path='/' element={ <Navigate to={'/home'} />  }/>
        <Route path='/home' element={ <Home /> }/>
        <Route path='/genres/*' element={ <Genres /> }/>
        <Route path='/artists/*' element={ <Artists /> } />
        <Route path='/sound/*' element={ <Sound /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
      <Player />
    </div>
  )
}