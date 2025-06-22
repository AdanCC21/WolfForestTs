import { comunEvent } from "../entities/events.entity"

type Prompts = {
  day: number,
  isDay: boolean,
  events: Array<comunEvent>
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
              <p>{current.player.name}</p>
            </article>
          ))}
        </section>
      </main>
      <button>Continue</button>
    </>
  )
}
