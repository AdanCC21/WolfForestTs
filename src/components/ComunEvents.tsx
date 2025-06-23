import { genericEvent } from "../hooks/events"

type Prompts = {
  day: number,
  isDay: boolean,
  events: Array<genericEvent>
}

export default function ComunEvents({ day, isDay, events }: Prompts) {
  return (
    <>
      <header>
        <h1>{isDay ? 'Dia' : 'noche'} {day}</h1>
      </header>
      <main>
        <section>
          {events.map((current) => (
            <article>
              <img src={current.player.image} alt={current.player.name} />
              <p>{current.message}</p>
            </article>
          ))}
        </section>
      </main>
      <button>Continue</button>
    </>
  )
}
