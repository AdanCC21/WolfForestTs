import { genericEvent } from "../hooks/events"

type Prompts = {
  day: number,
  events: Array<genericEvent>
}

export default function ComunEvents({ day, events }: Prompts) {
  return (
    <>
      <div>
        <h1>{day % 2 !== 0 ? 'Dia' : 'noche'} {day}</h1>
      </div>

      <section>
        {events.map((current, index) => (
          <article key={index}>
            <img src={current.player.image} alt={current.player.name} />
            <p>{current.message}</p>
          </article>
        ))}
      </section>

    </>
  )
}
