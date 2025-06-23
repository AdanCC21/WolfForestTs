import { useEffect, useState } from "react"
import { Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { genericEvent, useGetEvents } from "../hooks/events";
import ComunEvents from "../components/ComunEvents";
import EspecialEvent from "../components/EspecialEvent";

// no debe de recargar la pagina
export default function Game() {
  const sessionData = JSON.parse(sessionStorage.getItem('players') || "[]");
  const navigator = useNavigate();
  if (!sessionData) {
    navigator('/')
    return
  }

  const players: Player[] = sessionData.map((obj: any) => Object.assign(new Player(), obj));
  console.log(players);

  const [dayCount, setDayCount] = useState(1);
  const [commonEvents, setCommonEvents] = useState<Array<genericEvent>>();
  const [specialEvents, setSpecialEvents] = useState<Array<genericEvent>>();
  const [showSpecial, setShowSpecial] = useState(false);

  useEffect(() => {
    // let eventos = obtenerEventos(players);
    let eventos = useGetEvents(dayCount, players);

    let common: Array<genericEvent> = [];
    let special: Array<genericEvent> = [];

    eventos.forEach((current) => {
      current.isCommon ? common.push(current)
        : special.push(current);
    })
    setCommonEvents(common);
    console.log(common);
    setSpecialEvents(special);
    console.log(special);

    // actualizar sessionStorage
    // mostrar eventos comunes primero
    // mostrar eventos especiales
    if (dayCount > 1) {
      setShowSpecial(prev => !prev);
    }
    setDayCount(prev => prev += 1)
  }, [])

  return (
    <div>
      {showSpecial ? (
        <main>
          {commonEvents ? (
            <>
              <ComunEvents day={dayCount} isDay={true} events={commonEvents} />
            </>
          ) : (
            <>
              <h2>No hay eventos Comunes</h2>
            </>
          )}
        </main>
      ) : (
        <main>
          {specialEvents ? (
            <>
              <EspecialEvent />
            </>
          ) : (
            <>
              <h2>No hay eventos especiales</h2>
            </>
          )}
        </main>
      )}
    </div>
  )
}
