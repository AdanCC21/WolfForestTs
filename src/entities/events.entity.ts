import { Player } from "./player.entity"

export enum eventType {
    COMMON = "common",
    DEATH = "death",
    KILL = "kill",
    DUO = "duo",
    RELATION = "relation",
    HEAL = "heal",
    REVIVE = "revive"
}

export type GenericEvent = {
    isCommon: boolean
    event: any
    playerOrigin: Player
}

export type CommonEvent = {
    message: string
    player: Player

    fuerza: number
    vida: number
    suerte: number
}

export type SpecialEvent = {
    message: string
    eventType: eventType
    players: Array<Player>
    victims: Array<Player>
}

