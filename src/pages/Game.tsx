import { useEffect, useState } from "react"
import { Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { genericEvent, useGetEvents } from "../hooks/events";
import ComunEvents from "../components/ComunEvents";
import EspecialEvent from "../components/EspecialEvent";

// no debe de recargar la pagina
// Hacer que cargue los jugadores desde aqui, osea crear los objeto PLAYER desde aqui y no desde el set, solo recibir nombre e imagen
export default function Game() {
  const navigator = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

  console.log('---- jugadores -----')
  console.log(players);

  const [dayCount, setDayCount] = useState(1);
  const [commonEvents, setCommonEvents] = useState<Array<genericEvent>>();
  const [specialEvents, setSpecialEvents] = useState<Array<genericEvent>>();

  const [showSpecial, setShowSpecial] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const loadPlayers = () => {
    const sessionData = JSON.parse(sessionStorage.getItem('players') || "[]");

    if (sessionData.length === 0) {
      navigator(`/error/no-se-encontraron-jugadores`);
      return;
    }

    const loadedPlayers = sessionData.map((current: any) =>
      new Player(current.id, current.name, current.image)
    );
    return loadedPlayers;
  }

  const handleEvents = (loadedPlayers: Player[]) => {
    let eventos = useGetEvents(dayCount, loadedPlayers);

    let common: Array<genericEvent> = [];
    let special: Array<genericEvent> = [];

    eventos.forEach((current) => {
      current.isCommon ? common.push(current)
        : special.push(current);
    })
    setCommonEvents(common);

    setSpecialEvents(special);

    // actualizar array
    let playerList = [...common, ...special]
      .map((item => item.player))
      .sort((a, b) => a.id - b.id);

    setPlayers(playerList);
  }

  useEffect(() => {
    if (players.length === 0) {
      const loadedPlayers = loadPlayers();
      handleEvents(loadedPlayers);
    } else {
      handleEvents(players);
    }
  }, [dayCount])

  return (
    <div>
      {!showSpecial ? (
        <>
          <h3>Eventos comunes</h3>
          {commonEvents ? (
            <section>
              <ComunEvents day={dayCount} events={commonEvents} />
              <button onClick={() => { setShowSpecial(prev => !prev) }}>Continue</button>
            </section>
          ) : (
            <section>
              <h2>No hay eventos Comunes</h2>
            </section>
          )}
        </>
      ) : (
        <>{showSummary ? (
          <section>
            <h1>Resumen</h1>
            { }
            <button onClick={() => { setDayCount(prev => prev += 1); setShowSummary(false); setShowSpecial(false); }}>Siguiente dia</button>
          </section>
        ) : (
          <>{specialEvents ? (
            <section>
              <h2>Eventos especial</h2>
              <EspecialEvent events={specialEvents} whenFinish={() => { setShowSummary(prev => !prev); }} />
            </section>
          ) : (
            <section>
              <h2>No hay eventos especiales</h2>
            </section>
          )}</>
        )}</>
      )}
    </div>
  )
}
