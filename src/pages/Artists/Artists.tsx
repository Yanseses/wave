import { FC } from "react"
import { Route, Routes } from 'react-router';

export const Artists: FC = () => {
  return (
    <Routes>
      <Route path='/' element={ <div>Artist</div> } />
      <Route path='/:id' element={ <div>Artist Name</div> }/>
    </Routes>
  )
}