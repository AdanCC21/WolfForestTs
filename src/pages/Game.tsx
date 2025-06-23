import { useEffect, useState } from "react"
import { Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { genericEvent, useGetEvents } from "../hooks/events";
import ComunEvents from "../components/ComunEvents";
import EspecialEvent from "../components/EspecialEvent";

// no debe de recargar la pagina
// Hacer que cargue los jugadores desde aqui, osea crear los objeto PLAYER desde aqui y no desde el set, solo recibir nombre e imagen
export default function Game() {
  let sessionData = JSON.parse(sessionStorage.getItem('players') || "[]");
  const navigator = useNavigate();
  if (sessionData.length === 0) {
    navigator(`/error/no-se-encontraron-jugadores`)
  }

  const players: Player[] = sessionData.map((obj: any) => Player.fromJSON(obj));
  console.log('---- jugadores -----')
  console.log(players);

  const [dayCount, setDayCount] = useState(1);
  const [commonEvents, setCommonEvents] = useState<Array<genericEvent>>();
  const [specialEvents, setSpecialEvents] = useState<Array<genericEvent>>();

  const [showSpecial, setShowSpecial] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    let eventos = useGetEvents(dayCount, players);

    let common: Array<genericEvent> = [];
    let special: Array<genericEvent> = [];

    eventos.forEach((current) => {
      current.isCommon ? common.push(current)
        : special.push(current);
    })
    setCommonEvents(common);
    console.log('---- eventos -----')
    console.log('common');
    console.log(common);

    setSpecialEvents(special);
    console.log('special')
    console.log(special);

    // actualizar sessionStorage
    let playerList = [...common, ...special]
      .map((item => item.player))
      .sort((a, b) => a.id - b.id);
    let temp = JSON.stringify(playerList);
    console.log('------ player temp -------');
    console.log(playerList);

    sessionStorage.setItem('players', temp);

  }, [dayCount])

  return (
    <div>
      {!showSpecial ? (
        <>
          <h3>Eventos comunes</h3>
          {commonEvents ? (
            <main>
              <ComunEvents day={dayCount} events={commonEvents} />
              <button onClick={() => { setShowSpecial(prev => !prev) }}>Continue</button>
            </main>
          ) : (
            <>
              <h2>No hay eventos Comunes</h2>
            </>
          )}
        </>
      ) : (
        <>{showSummary ? (
          <>
            <h1>Resumen</h1>
            <button onClick={() => { setDayCount(prev => prev += 1); setShowSummary(false); setShowSpecial(false); }}>Siguiente dia</button>
          </>
        ) : (
          <>{specialEvents ? (
            <>
              <h2>Eventos especial</h2>
              <EspecialEvent events={specialEvents} whenFinish={() => { setShowSummary(prev => !prev); }} />
            </>
          ) : (
            <>
              <h2>No hay eventos especiales</h2>
            </>
          )}</>
        )}</>
      )}
    </div>
  )
}
