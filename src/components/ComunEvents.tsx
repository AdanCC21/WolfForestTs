import { Player } from "../entities/player.entity"
import { genericEvent } from "../hooks/events"
import CommondCard from "./cards/CommondCard"

type Prompts = {
  day: number,
  events: Array<genericEvent>
  playersBase: Array<Player>
}

export default function ComunEvents({ day, events, playersBase }: Prompts) {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div>
        <h1>{day % 2 !== 0 ? 'Dia' : 'noche'} {day}</h1>
      </div>

      {events.map((current, index) => {
        if (current.message != 'death') {
          return (
            <section key={index} className="mx-[10vw] flex flex-col items-center">
              <CommondCard key={index} eventPlayer={current.player} playerBase={playersBase[index]} message={current.message} />
            </section>
          )
        }
      })}

    </main>
  )
}
