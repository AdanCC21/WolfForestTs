import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SetPlayers from './pages/SetPlayers'
import Game from './pages/Game'
import GenericError from './pages/errors/GenericError'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Welcome} />
        <Route path='/set' Component={SetPlayers} />
        <Route path='/game' Component={Game} />
        <Route path='/error/:message' Component={GenericError} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
  