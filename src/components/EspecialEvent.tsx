import { genericEvent } from "../hooks/events"

type Prompts = {
  events: Array<genericEvent>
  whenFinish: any
}

export default function EspecialEvent({ events, whenFinish }: Prompts) {
  return (
    <section>
      {events.map((current, index) => (
        <article key={index}>
          <img src={current.player.image} alt={current.player.name} />
          <p>{current.message}</p>
        </article>
      ))}
      <button onClick={() => { whenFinish() }}>Finalizar</button>
    </section>
  )
}
