import { Player } from "../../entities/player.entity"

type Prompts = {
    //Jugador despues del evento
    eventPlayer: Player
    //Jugador antes del evento
    playerBase: Player
    message: string
}


export default function CommonCard({ eventPlayer, playerBase, message }: Prompts) {
    return (
        <article className="flex w-full">
            <img className="w-[50px] md:w-[150px] lg:w-[250px]  my-2 h-fit rounded-lg"
                src={eventPlayer.image} alt={eventPlayer.name} />
            <div className="flex flex-col pl-5">
                <h2 className="font-bold">{eventPlayer.name}</h2>
                <h5>{message}</h5>
                <div className="flex mt-2">
                    <small>Vida :
                        {eventPlayer.vida < playerBase.vida ? (<small className="text-red-500">{eventPlayer.vida}</small>)
                            : (<>{eventPlayer.vida > playerBase.vida ? (<small className="text-green-500">{eventPlayer.vida}</small>)
                                : (<small>{eventPlayer.vida}</small>)}
                            </>)}
                    </small>
                    <small className="mx-2">Fuerza :
                        {eventPlayer.fuerza < playerBase.fuerza ? (<small className="text-red-500">{eventPlayer.fuerza}</small>)
                            : (<>{eventPlayer.fuerza > playerBase.fuerza ? (<small className="text-green-500">{eventPlayer.fuerza}</small>)
                                : (<small>{eventPlayer.fuerza}</small>)}
                            </>)}
                    </small>
                    <small>Suerte :
                        {eventPlayer.suerte < playerBase.suerte ? (<small className="text-red-500">{eventPlayer.suerte}</small>)
                            : (<>{eventPlayer.suerte > playerBase.suerte ? (<small className="text-green-500">{eventPlayer.suerte}</small>)
                                : (<small>{eventPlayer.suerte}</small>)}
                            </>)}
                    </small>
                </div>
            </div>
        </article>
    )
}
