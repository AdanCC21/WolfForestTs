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

export type genericEvent = {
    message: string,
    player: Player,
    isCommon: boolean,
    eventType: eventType
}