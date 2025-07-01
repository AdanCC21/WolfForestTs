// Mensajes de duo y relacion
export interface SpecialEventMessage {
    messages: string[],
    strength: number
    heal: number
    luck: number
}

export const DuoMessagesList: Array<SpecialEventMessage> = [
    { messages: ["se unio con ", "por ahora son aliados"], strength: 10, heal: 0, luck: 0 },
    { messages: ["le perdono la vida a ", "y este decide unirsele "], strength: 10, heal: 0, luck: 0 },
    { messages: ["le pide ayuda a ", "este acepta"], strength: 10, heal: 0, luck: 0 },
]

export const RelationMessagesList: Array<SpecialEventMessage> = [
    { messages: ["formo una relacion con ", "deciden apoyarse mutuamente"], strength: 10, heal: 0, luck: 0 },
    { messages: ["miro la belleza de ", "dicen que saldran de esta juntos"], strength: 10, heal: 0, luck: 0 },
    { messages: ["compartio refugio con ", "durante mucho tiempo"], strength: 10, heal: 0, luck: 0 },
]