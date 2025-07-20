import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const navigator = useNavigate();
    // const [showIntro, setShowIntro] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => setShowIntro(false), 1500);
    //     return () => clearTimeout(timer);
    // }, []);

    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="w-screen h-screen overflow-x-hidden bg-default">
            <AnimatePresence mode="wait">
                {showAlert && (
                    <motion.div
                        key="alert"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="min-w-screen min-h-screen flex flex-col overflow-x-hidden"
                    >
                        <header className="absolute flex h-[10vh] items-center w-full">
                            <div className="mx-auto flex">
                                <h3 className="mx-4">Wolf Forest</h3>
                                <img src="/logo.png" alt="logo" className="w-12 aspect-square object-cover my-auto" />
                            </div>
                        </header>

                        <main className="flex flex-col items-center justify-center w-[80vw] mx-[10vw] h-screen">
                            <div className="flex">
                                <div className="w-3/5">
                                    <h2 className="mb-5">Aviso Importante</h2>
                                    <p>- Esta pagina aun esta en desarrollo</p>
                                    <p>- Es una pagina inspirada en los juegos del hambre</p>
                                    <p>- Al recargar la pagina tu partida se reiniciara con los mismos jugadores, procura no recargar la pagina durante la partida</p>
                                    <p>- En caso de bugs o inconvenientes comentarlas a mi correo de contacto.</p>
                                </div>
                                <div className="w-2/5">
                                    <img src="adan.png" className="w-fit h-fit ml-auto" />
                                </div>
                            </div>

                            <button className="absolute bottom-20 mt-auto" onClick={() => { setShowAlert(false) }}>
                                <span>Enteniddo</span>
                            </button>
                        </main>
                    </motion.div>
                )}

                {!showAlert && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <button className="absolute right-5 mr-5 my-5" onClick={() => { navigator('/set') }}>
                            <span>Jugar</span>
                            <img src="icons/arrow-right.svg" />
                        </button>

                        <header className="flex justify-center h-[40vh] items-center">
                            <h2 className=" text-center">Bienvenido a Wolf Forest</h2>
                            <img src="logo.png" alt="author" className="ml-2 w-20 h-fit" />
                        </header>
                        
                        <main className="flex flex-col mx-[20vw] ">
                            <div>
                                <h3>¿Como Jugar?</h3>
                                <p>
                                    Primero necesitas definir a tus jugadores con un link de una imagen publica y un nombre, cada jugador tiene un nombre unico. Durante el juego pasaran los dias y noches, y durante cada ronda pasaran eventos comunes y eventos especiales que pueden beneficiar o perjudicar a cada jugador, al final gana el o los ultimos jugadores en pie. O puede que todos caigan de manera inesperada en la ronda final.
                                </p>

                                <br />
                                <hr className="my-10" />
                            </div>

                            <div>
                                <h3 className="mb-5">¿Como funciona cada cosa?</h3>

                                <div className="flex mb-3">
                                    <img src="adan.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Jugadores</h4>
                                </div>
                                <p>
                                    Cada jugador tiene atributos como vida, fuerza y suerte, cada uno de estos atributos influye en las probabilidades de sobrevivir durante el juego. Ademas, cada jugador puede poseer un arma a la vez, y puede estar acompañado de un amigo o una pareja que encontrara durante el camino.
                                </p>
                                <br />

                                <div className="flex mb-3">
                                    <img src="eventIcons/sun.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Eventos Comunes</h4>
                                </div>
                                <p>
                                    Al iniciar el juego este muestra un listado de eventos comunes, que estos son eventos de recoleccion de alimentos, refugio, armas, y accidentes no tan graves. Cada uno de estos eventos puede influir en los atributos del jugador, tanto de manera positiva como negativa
                                </p>
                                <br />
                                <div className="flex mb-3">
                                    <img src="eventIcons/moon.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Eventos Especiales</h4>
                                </div>
                                <p>
                                    A diferencia de los eventos comunes, estos eventos son acciones que afectan a otros jugadores o al jugador de manera negativa o positiva, pero tiene mayor peso que los eventos comunes.
                                </p>
                                <br />
                                <hr className="my-10" />
                            </div>
                            <div>
                                <h3 className="mb-5">Tipos De Eventos Especiales</h3>
                                <div className="flex mb-3">
                                    <img src="eventIcons/death.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Muerte</h4>
                                </div>

                                <p>
                                    El jugador puede por morir por causas naturales, como un ataque de lobos, quemaduras, accidentes, condiciones climaticas, enfermedades etc.
                                </p>
                                <br />

                                <div className="flex mb-3">
                                    <img src="eventIcons/swords.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Asesinato</h4>
                                </div>
                                <p>
                                    El jugador puede ser asesinado por otros jugadores, cabe recalcar que la decision de ver quien gana en un enfrentamiento depende de sus atributos basicos (vida, fuerza y suerte), de si tiene compañero, si tiene pareja y si esta armado, cada punto a favor puede aumentar las probabilidades de ganar el enfrentamiento, pero nada esta asegurado.
                                </p>
                                <br />
                                <div className="flex mb-3">
                                    <img src="eventIcons/handsShake.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Trato</h4>
                                </div>
                                <p>
                                    El jugador puede formar un trato con otro jugador durante el resto de la partida, el tener un compañero ayuda a la hora de tener un enfrentamiento con otro jugador y sube un poco los atributos de cada quien, sin embargo, no a todos les gusta la idea de compartir recursos.
                                </p>
                                <br />
                                <div className="flex mb-3">
                                    <img src="eventIcons/heart.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Relacion</h4>
                                </div>
                                <p>
                                    Al igual que los tratos, el jugador puede formar una relacion intima con algun otro jugador, este vinculo es mucho mas fuerte que un simple trato y puede ser de mucha ayuda durante un enfrentamiento.
                                </p>
                                <br />

                                <div className="flex mb-3">
                                    <img src="eventIcons/corazon-herido.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Curacion</h4>
                                </div>
                                <p>
                                    El jugador puede llegar a tratar sus heridas, si es que encuentra algun kit medico
                                </p>
                                <br />

                                <div className="flex mb-3">
                                    <img src="eventIcons/heartUp.png" alt="author" className="mr-2 w-10 h-fit" />
                                    <h4>Resureccion</h4>
                                </div>
                                <p>
                                    El jugador que haya muerto tiene la pequeña posibilidad de engañar a la muerte, y darle un giro inesperado a la partida.
                                </p>
                            </div>

                            <button className="mx-auto my-10" onClick={() => { navigator('/set') }}>
                                <span>Jugar</span>
                                <img src="icons/arrow-right.svg" alt="arrow" />
                            </button>
                        </main>

                        <footer className="h-[5vh] w-screen flex flex-col items-center">
                            <small>@Adan Gonzalez 2025</small>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
