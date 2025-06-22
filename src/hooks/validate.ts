import { newPlayer } from "../entities/player.entity";
import { response } from "../entities/result.entity";

export function useValidatePlayers(players: Array<newPlayer>): response {
    let message = ''
    try {
        for (let i of players) {
            for (let j of players) {
                if (i.name === j.name) {
                    message = 'Hay 2 usuarios con el mismo nombre de: ' + i.name + '. Porfavor evita nombres duplicados'
                    throw new Error(message);
                }
            }
        }
        if (players.length >= 50) {
            message = 'Maximo de jugadores excedido. Maximo de jugadores 50'
            throw new Error(message)
        }
        return { message: '', result: true };
    } catch (e) {
        return { message: message, result: false };
    }
}