import { Player } from "../entities/player.entity";

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type genericEvent = {
    message: string,
    player: Player,
    isCommon: boolean
}
// 0 >= playerProb < eventProb
const dayEventsList = {
    //0 -> 19
    death: 20,
    //20 -> 29
    deal: 30,
    // 29 -> 34
    relation: 35,
    //35 -> 79 (comida, refugio, caza etc)
    farmCasual: 80,
    // 80 -> 86 (Arco, Hacha)
    farmWeapon: 87,
    //87-89 (Pistola, rifle)
    farmBigWeapon: 90,
    // 90 -> 97
    heal: 98,
    // 98-100
    revive: 100,
}
const nightEventsList = {
    //0 -> 34
    death: 35,
    //35 -> 39
    deal: 40,
    // 40 -> 54
    relation: 55,
    //55 -> 79 (comida, refugio, caza etc)
    farmCasual: 80,
    // 80 -> 86 (Arco, Hacha)
    farmWeapon: 87,
    //87-89 (Pistola, rifle)
    farmBigWeapon: 90,
    // 90 -> 97
    heal: 98,
    // 98-100
    revive: 100,
}
const casualEvent = {
    // 0 -> 19
    bad: 20,
    // 20 -> 79
    neutral: 80,
    // 80 -> 100
    good: 100
}

export function useGetEvents(dayNumber: number, playersList: Array<Player>) {
    if (dayNumber % 2 === 0) {
        return playersList.map((current) => {
            return getEvents(dayEventsList, current, playersList);
        })
    } else {
        return playersList.map((current) => {
            return getEvents(nightEventsList, current, playersList);
        })
    }
}


// lista de eventos
function getEvents(eventsList: any, currentPlayer: Player, playersList: Array<Player>) {
    let luckEvent = randomNumber(0, 100);

    if (luckEvent < eventsList.death) {
        return playerDeath(currentPlayer);
    }

    if (luckEvent < eventsList.deal) {
        return linkPlayers(currentPlayer, playersList, true);
    }

    if (luckEvent < eventsList.relation) {
        return linkPlayers(currentPlayer, playersList, false);
    }

    if (luckEvent < eventsList.farmCasual) {
        // cualquier evento de farmeo casual (comida, refugio etc)
        return farmCasual(currentPlayer);
    }

    if (luckEvent < eventsList.farmWeapon) {
        // cualquier evento para obtener un arma, o crearla
        return farmWeapon(currentPlayer, playersList);
    }
    if (luckEvent < eventsList.farmBigWeapon) {
        // obtener un arma de nivel militar (solo si su fuerza y astucia lo permiten)
        return farmBigWeapon(currentPlayer, playersList);
    }

    if (luckEvent < eventsList.heal) {
        // curar sus heridas o las de su duo o pareja
        // solo si alguno de estos tiene puntos de vida son menores al default
        return heal(currentPlayer);
    }

    // si no esta muerto lo cura
    if (!currentPlayer.live) {
        return heal(currentPlayer)
    } else {
        return revivePlayer(currentPlayer);
    }
}
// Matar a un jugador por un evento natural
function playerDeath(playerBase: Player) {
    // seleccionar un mensaje random
    const message = `${playerBase.name} murio por pendejo`;

    // cambiar estado del jugador
    playerBase.Death();

    // retornar mensaje y jugador
    return { message: message, player: playerBase, isCommon: false }
}

function linkPlayers(playerBase: Player, playersList: Array<Player>, isDuo: boolean) {
    // filtrar jugadores vivos y que no sean el jugador base
    let playersOk = playersList.filter(current => current.live && current !== playerBase && !current.amigo)
    // seleccionar jugador random
    let otherPlayer = playersOk[Math.floor(Math.random() * playersOk.length)];
    // actualizar datos
    if (isDuo) {
        otherPlayer.SetFriend(playerBase);
        playerBase.SetFriend(otherPlayer);
    } else {
        otherPlayer.SetRelation(playerBase);
        playerBase.SetRelation(otherPlayer);
    }
    // Obtener mensajes
    const message = `${playerBase.name} Se unio con ${otherPlayer.name}`;
    return { message: message, player: playerBase, isCommon: false }
}
function farmCasual(playerBase: Player) {
    // Dependiendo la suerte del jugador obtener un evento que puede
    // neutral (No aumenta ni disminuye puntos)
    // malo (puede disminuir puntos, pero puede salvarse si tiene la suficiente fuerza/vida/suerte)
    // bueno (aumenta puntos de fuerza/vida/suerte)

    if (playerBase.suerte < 40) {
        if (playerBase.suerte < 30) {
            if (playerBase.suerte < 20) {
                if (playerBase.suerte < 10) {
                    casualEvent.bad = casualEvent.bad * 3
                }
                casualEvent.bad = casualEvent.bad * 2.5
            }
            casualEvent.bad = casualEvent.bad * 2
        }
        casualEvent.bad = casualEvent.bad * 1.5
    }

    if (playerBase.suerte > 70) {
        if (playerBase.suerte > 80) {
            if (playerBase.suerte > 90) {
                casualEvent.good = casualEvent.good * 2.5;
            }
            casualEvent.good = casualEvent.good * 2;
        }
        casualEvent.good = casualEvent.good * 1.5;
    }

    // Obtener evento de un listado de mensajes con el formato
    // {mensaje, fuerza, vida, suerte} la fuerza vida o suerte son num negativos o positivos
    const randomNum = Math.floor(Math.random() * casualEvent.good);

    const message = 'evento casual';
    return { message: message, player: playerBase, isCommon: true }
}

function farmWeapon(playerBase: Player, playersList: Array<Player>) {
    // puede craftear armas casuales, como robarlas
    const message = `${playerBase.name} obtuvo un arma casual`;
    return { message: message, player: playerBase, isCommon: true }
}

function farmBigWeapon(playerBase: Player, playersList: Array<Player>) {
    // puede craftear armas casuales, como robarlas
    const message = `${playerBase.name} obtuvo un arma grande`;
    return { message: message, player: playerBase, isCommon: true }
}

function heal(playerBase: Player) {
    // numero random de puntos a revivir
    const healAmount = Math.floor(Math.random() * 20);

    // obtener mensaje
    const message = `${playerBase.name} se curo ${healAmount} puntos de vida con`;
    playerBase.Heal(healAmount);

    return { message: message, player: playerBase, isCommon: true }
}

function revivePlayer(playerBase: Player) {
    // actualizar info
    playerBase.Revive();
    // obtener mensaje
    const message = `${playerBase.name} SE PARO SE PARO SE PARO`;
    return { message: message, player: playerBase, isCommon: false }
}