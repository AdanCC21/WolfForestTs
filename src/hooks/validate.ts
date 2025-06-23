import { newPlayer } from "../entities/player.entity";
import { response } from "../entities/result.entity";

export function useValidatePlayers(players: Array<newPlayer>): response {
    let message = ''
    try {
        const nombres = new Set<string>();

        for (let player of players) {
            if (nombres.has(player.name)) {
                message = `Hay 2 usuarios con el mismo nombre: ${player.name}. Por favor evita nombres duplicados.`;
                throw new Error(message);
            }
            nombres.add(player.name);
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