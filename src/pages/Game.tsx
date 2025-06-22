import { useEffect, useState } from "react"
import { Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";

// no debe de recargar la pagina
export default function Game() {
  const sessionData = sessionStorage.getItem('players');
  const navigator = useNavigate();
  if (!sessionData) {
    navigator('/')
    return
  }

  const players: Array<Player> = JSON.parse(sessionData);

  const [dayCount, setDayCount] = useState(1);

  useEffect(() => {
    // dia
    if (dayCount % 2 === 0) {
      // let eventos = obtenerEventos(players);
      // let eventosComunes = eventos.comunes === true
      // let eventosEspeciales = eventos.comunes === false
      // actualizar sessionStorage
      // mostrar eventos comunes primero
      // mostrar eventos especiales
      // rerol
    }
    else // noche
    {

    }
  }, [dayCount])

  return (
    <div>

    </div>
  )
}
