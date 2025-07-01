import { eventType, SpecialEvent } from "../entities/events.entity"
import { useState } from "react";

type Prompts = {
  events: Array<SpecialEvent>
  whenFinish: any
}

export default function EspecialEvent({ events, whenFinish }: Prompts) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastEvent = currentIndex === events.length - 1;
  const currentEvent = events[currentIndex];

  const handleNext = () => {
    if (isLastEvent) {
      whenFinish();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // falta los iconos de traicion y muerte por arma
  const handleIcon = () => {
    switch (currentEvent.eventType) {
      case eventType.DEATH:
        return 'death.png';
      case eventType.DUO:
        return 'handsShake.png';
      case eventType.HEAL:
        return 'heart.png';
      case eventType.KILL:
        if (currentEvent.victims.length > 1) {
          return 'swords.png';
        } else {
          return 'sword.png';
        }
      case eventType.RELATION:
        return 'heart.png';
      case eventType.REVIVE:
        return 'heartUp.png';
    }
  }

  const multiplePlayers = () => {
    return (<article key={currentIndex} className="flex">
      <section className={`grid ${currentEvent.players.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
        {currentEvent.players.map((current) => (
          <figure key={current.id}>
            <img src={current.image} alt={current.name}
              className="w-fit h-50 rounded-md object-cover mx-auto mb-4"
            />
            <figcaption className="text-center">{current.name}</figcaption>
          </figure>
        ))}
      </section>
      <div className="flex flex-col h-full">
        <img src={`eventIcons/${handleIcon()}`} className="w-fit h-20 mx-auto mb-2" />
        <p className="text-lg my-auto mx-5">{currentEvent.message}</p>
      </div>

      <section className={`grid ${currentEvent.victims.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
        {currentEvent.victims.map((current) => (
          <figure key={current.id} className="self-center">
            <img src={current.image} alt={current.name}
              className="w-fit h-50 rounded-md object-cover mx-auto mb-4"
            />
            <figcaption className="text-center">{current.name}</figcaption>
          </figure>
        ))}
      </section>
    </article>)
  }

  const singlePlayer = () => {
    let player = currentEvent.players[0];

    return (
      <article key={currentIndex} className="flex flex-col">
        <img src={`eventIcons/${handleIcon()}`} className="w-fit h-30 mx-auto mb-5" />
        <img src={player.image} alt={player.name}
          className="w-fit h-30 rounded-md object-cover mx-auto mb-4" />
        <p className="text-lg my-auto mx-5">{currentEvent.message}</p>
      </article>
    )
  }

  return (
    <section className="flex flex-col w-screen h-screen items-center justify-center">

      {currentEvent.players.length > 1 || currentEvent.victims.length >= 1 ? (
        <>{multiplePlayers()}</>
      ) : (
        <>{singlePlayer()}</>
      )}

      <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleNext} >
        {isLastEvent ? "Finalizar" : "Siguiente"}
      </button>
    </section>
  );
}

