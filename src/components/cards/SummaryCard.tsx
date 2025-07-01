import { Player } from '../../entities/player.entity'

type Prompts = {
    player: Player
}

export default function SummaryCard({ player }: Prompts) {
    return (
        <article className='m-auto max-w-4/5'>
            <div className='relative'>
                <img className={`${!player.live ? 'grayscale' : ''} rounded-md z-1`}
                    src={player.image} alt={player.name} />
                {player.amigo ? (
                    <div className='group absolute left-[-10px] top-[-10px] max-w-1/2 flex'>
                        <img
                            className={`${!player.amigo.live ? 'grayscale' : ''} rounded-full w-10 h-fit z-2`}
                            src={player.amigo.image}
                            alt={player.amigo.name}
                        />
                        <img
                            className="rounded-full w-5 absolute top-0 h-fit z-3"
                            src='/eventIcons/handsShake.png'
                            alt='hands shake'
                        />
                        <span className='ml-1 z-10 bg-[rgba(0,0,0,0.5)] px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            {player.amigo.name}
                        </span>
                    </div>

                ) : (<></>)}

                {player.pareja ? (
                    <div className='group flex flex-row-reverse absolute max-w-1/2 right-[-10px] top-[-10px]'>
                        <img
                            className={`${!player.pareja.live ? 'grayscale' : ''} rounded-full w-10 h-fit z-2`}
                            src={player.pareja.image}
                            alt={player.pareja.name}
                        />
                        <img
                            className="rounded-full w-5 h-fit absolute top-0 z-3"
                            src='/eventIcons/heart.png'
                            alt='heart'
                        />
                        <span className='ml-1 z-10 bg-[rgba(0,0,0,0.5)] px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            {player.pareja.name}
                        </span>
                    </div>
                ) : (<></>)}

                {player.arma ? (
                    <div className='group absolute flex left-[-10px] bottom-[-20px]'>
                        <img
                            className="rounded-full w-5 h-fit z-3"
                            src='/eventIcons/gun.png'
                            alt='heart'
                        />
                        <span className='ml-1 z-10 bg-[rgba(0,0,0,0.5)] px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            {player.arma.name}
                        </span>
                    </div>
                ) : (<></>)}
            </div>
            <p>{player.name}</p>
            <ul className='flex justify-between'>
                <small>Vida: <br />
                    <small className={`${player.vida < 30 ? 'text-red-500' : ''} ${player.vida > 80 ? 'text-green-500' : ''}`}>
                        {player.vida}
                    </small>
                </small>
                <small>Fuerza: <br />
                    <small className={`${player.fuerza < 30 ? 'text-red-500' : ''} ${player.fuerza >= 80 ? 'text-green-500' : ''}`}>
                        {player.fuerza}
                    </small>
                </small>
                <small>Suerte: <br />
                    <small className={`${player.suerte < 30 ? 'text-red-500' : ''} ${player.suerte >= 80 ? 'text-green-500' : ''}`}>
                        {player.suerte}
                    </small>
                </small>
            </ul>
        </article >
    )
}
