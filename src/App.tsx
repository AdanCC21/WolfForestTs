import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Welcome from './pages/Welcome'
import SetPlayers from './pages/SetPlayers'
import Game from './pages/Game'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Welcome} />
        <Route path='/set' Component={SetPlayers} />
        <Route path='/game' Component={Game} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
