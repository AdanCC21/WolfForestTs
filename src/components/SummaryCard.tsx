import { Player } from '../entities/player.entity'

type Prompts = {
    player: Player
}

export default function SummaryCard({ player }: Prompts) {
    return (
        <article className='m-auto max-w-4/5'>
            <img className={`${!player.live ? 'grayscale' : ''} rounded-md`}
                src={player.image} alt={player.name} />
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
