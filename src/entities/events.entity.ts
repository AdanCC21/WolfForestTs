import { Player } from "./player.entity"

export type CommonEvent = {
    message: string
    player: Player
    
    fuerza: number
    vida: number
    suerte: number
}

export type SpecialEvent = {
    title: string
    players: Array<Player>
    victims: Array<Player>
}