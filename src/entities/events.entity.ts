import { Player } from "./player.entity"

export type comunEvent = {
    title: string
    player: Player
}

export type specialEvent = {
    title: string
    players: Array<Player>
    victims: Array<Player>
}