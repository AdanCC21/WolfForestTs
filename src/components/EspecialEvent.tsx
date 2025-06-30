import { genericEvent } from "../entities/events.entity"

type Prompts = {
  events: Array<genericEvent>
  whenFinish: any
}

import { useState } from "react";

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

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center p-4">
      <article key={currentIndex} className="max-w-md">
        <img
          src={currentEvent.player.image}
          alt={currentEvent.player.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
        <p className="text-lg">{currentEvent.message}</p>
      </article>

      <button
        onClick={handleNext}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isLastEvent ? "Finalizar" : "Siguiente"}
      </button>
    </section>
  );
}

