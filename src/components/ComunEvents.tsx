import { Player } from "../entities/player.entity"
import { GenericEvent } from "../entities/events.entity"
import CommondCard from "./cards/CommondCard"

type Prompts = {
  day: number,
  events: Array<GenericEvent>
  playersBase: Array<Player>
}

export default function ComunEvents({ day, events, playersBase }: Prompts) {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col w-screen min-h-[5vh] items-center my-3">
        <h1>{day % 2 !== 0 ? 'Dia' : 'noche'} {day}</h1>
      </div>

      {events.map((current, index) => {
        if (current.message != 'death') {
          return (
            <section key={index} className="flex flex-col mx-[10vw] items-center my-3">
              <CommondCard key={index} eventPlayer={current.player} playerBase={playersBase[index]} message={current.message} />
            </section>
          )
        }
      })}

    </main>
  )
}
