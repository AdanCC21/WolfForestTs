import { Player } from "../entities/player.entity"
import { CommonEvent } from "../entities/events.entity"
import CommondCard from "./cards/CommondCard"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ScrollFadeSection } from "./ScrollFadeSection"

type Prompts = {
  day: number,
  events: Array<CommonEvent>
  playersBase: Array<Player>
}

export default function ComunEvents({ day, events, playersBase }: Prompts) {
  const [showDay, setShowDay] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0)
    const timer = setTimeout(() => {
      setShowDay(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showDay && (
        <motion.div
          key='daynight'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col w-screen h-screen items-center justify-center"
        >
          <h1 style={{fontSize:'5rem'}}>Ronda {day}</h1>
          <img src={day % 2 !== 0 ? 'eventIcons/sun.png' : 'eventIcons/moon.png'}
            className="h-20" />

        </motion.div>
      )}

      {!showDay && (
        <motion.div
          key='events'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}>
          <header className="flex justify-center items-center h-[10vh]">
            <h3 className="mx-2">Ronda {day}</h3>
            <img alt="day or night"
              src={day % 2 !== 0 ? 'eventIcons/sun.png' : 'eventIcons/moon.png'}
              className="h-2/4" />
          </header>

          {events.map((current, index) => (
            <ScrollFadeSection key={index}>
              <CommondCard
                eventPlayer={current.player}
                playerBase={playersBase[index]}
                message={current.message}
              />
            </ScrollFadeSection>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
