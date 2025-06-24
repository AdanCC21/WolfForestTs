import { Player } from '../entities/player.entity'

type Prompts = {
    player: Player
}

export default function SummaryCard({ player }: Prompts) {
    return (
        <article>
            <img src={player.image} alt={player.name} />
            <p>{player.name}</p>
            <ul className='flex'>
                <span>Vida: {player.vida}</span>
                <span>Fuerza: {player.fuerza}</span>
                <span>Suerte: {player.suerte}</span>
            </ul>
        </article >
    )
}
