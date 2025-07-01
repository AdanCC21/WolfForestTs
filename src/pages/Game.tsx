import { useEffect, useState } from "react"
import { Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { CommonEvent, GenericEvent, SpecialEvent } from "../entities/events.entity";
import { useGetEvents } from "../hooks/events"
import ComunEvents from "../components/ComunEvents";
import EspecialEvent from "../components/EspecialEvent";
import SummaryCard from "../components/SummaryCard";

// no debe de recargar la pagina
// Hacer que cargue los jugadores desde aqui, osea crear los objeto PLAYER desde aqui y no desde el set, solo recibir nombre e imagen
export default function Game() {
  const navigator = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

  const [dayCount, setDayCount] = useState(1);
  const [commonEvents, setCommonEvents] = useState<Array<CommonEvent>>([]);
  const [specialEvents, setSpecialEvents] = useState<Array<SpecialEvent>>([]);
  const [genericEvents, setEvents] = useState<Array<GenericEvent>>([])

  const [showCommon, setShowCommon] = useState(true);
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

    let common: Array<CommonEvent> = [];
    let special: Array<SpecialEvent> = [];

    let finalEvents: Array<GenericEvent> = []
    eventos.forEach((current) => {
      if (current !== null) {
        current.isCommon ? common.push(current.event)
          : special.push(current.event);
        finalEvents.push(current);
      }
    })
    setCommonEvents(common);
    setSpecialEvents(special);
    setEvents(finalEvents);

    // actualizar array de jugadores
    // let playerList = [...common, ...special]
    //   .map((item => item.player))
    //   .sort((a, b) => a.id - b.id);
  }

  const playersLiving = () => {
    const playersLiving: Array<Player> = []
    players.forEach((current) => { if (current.live) playersLiving.push(current) })
    return playersLiving;
  }

  useEffect(() => {
    if (players.length === 0) {
      const loadedPlayers = loadPlayers();
      setPlayers(loadPlayers);
      handleEvents(loadedPlayers);
    } else {
      handleEvents(players);
    }
  }, [dayCount])

  const handleScreens = () => {
    // ------ Eventos comunes ------
    if (showCommon) {
      return (
        <section className="flex flex-col w-screen">
          {commonEvents ? (
            <>
              <ComunEvents day={dayCount} events={commonEvents} playersBase={players} />
              <button className="w-fit mx-auto my-2" onClick={() => { setShowSpecial(true); setShowCommon(false); }}>Continuar</button>
            </>
          ) : (
            <>
              <h2>No hay eventos comunes</h2>
              <button onClick={() => { setShowSpecial(true); setShowCommon(false); }}>Continuar</button>
            </>
          )}
        </section>
      );
    }

    // ------ Eventos Especiales ------
    if (showSpecial) {
      return (
        <section>
          {specialEvents?.length ? (
            <EspecialEvent
              events={specialEvents}
              whenFinish={() => {
                // actualizar jugadores
                let playerList: Array<Player> =
                  genericEvents.map((item => item.playerOrigin))
                    .sort((a, b) => a.id - b.id);
                setPlayers(playerList);

                setShowSummary(true);
                setShowSpecial(false);
              }}
            />
          ) : (
            <>
              <p>No hay eventos especiales</p>
              <button onClick={() => {
                // actualizar jugadores
                let playerList: Array<Player> =
                  genericEvents.map((item => item.playerOrigin))
                    .sort((a, b) => a.id - b.id);
                setPlayers(playerList);

                setShowSummary(true);
                setShowSpecial(false);
              }}>Continuar</button>
            </>
          )}
        </section>
      );
    }

    // ------ Resumen del dia/noche ------
    if (showSummary) {
      return (
        <section className="flex flex-col">
          <h1 className="text-center my-5">Resumen</h1>
          <section className="grid grid-cols-5 gap-5 mx-[20vw]">
            {players.map((current) => (
              <SummaryCard player={current} />
            ))}
          </section>
          <button onClick={() => { setShowSummary(false); }}
            className="w-fit mx-auto">
            Siguiente día
          </button>
        </section>
      );
    }

    // ------ Ganador o reinicio de juego ------
    let playersInGame = playersLiving();
    if (playersInGame.length <= 1) {
      if (playersInGame.length === 1) {
        return (
          <section>
            <h1>Ganador</h1>
            <SummaryCard player={playersInGame[0]} />
          </section>
        )
      }
      else {
        return (
          <section>
            <h1>Todos los jugadores murieron</h1>
          </section>
        )
      }
    } else {

      // Sumar un dia
      setDayCount(prev => prev + 1);
      setShowCommon(true);
    }
  };


  return (
    <div className="overflow-x-hidden">
      {handleScreens()}
    </div >
  )
}
