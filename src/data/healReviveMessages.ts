import { SpecialEventMessage } from "./friendRelationMessages";

export const HealMessageList: Array<SpecialEventMessage> = [
    { messages: ['trato sus heridas'], strength: 0, heal: 5, luck: 0 },
    { messages: ['encuentra un botiquin y trata sus heridas'], strength: 0, heal: 15, luck: 0 },
    { messages: ['come para recuperar energia'], strength: 15, heal: 5, luck: 0 },
    { messages: ['encuentra un manual de supervivencia'], strength: 0, heal: 0, luck: 15 },
]

export const ReviveMessageList: Array<SpecialEventMessage> = [
    { messages: ['resurge de las profunidades del bosque'], strength: 0, heal: 0, luck: 0 },
]