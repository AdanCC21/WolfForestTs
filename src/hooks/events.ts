import { Player } from "../entities/player.entity";
import { eventType, genericEvent } from "../entities/events.entity";
function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    if (currentPlayer.live) {
        if (luckEvent < eventsList.death) return playerDeath(currentPlayer);

        if (luckEvent < eventsList.deal) return linkPlayers(currentPlayer, playersList, true);

        if (luckEvent < eventsList.relation) return linkPlayers(currentPlayer, playersList, false);

        if (luckEvent < eventsList.farmCasual) return farmCasual(currentPlayer);

        if (luckEvent < eventsList.farmWeapon) return farmWeapon(currentPlayer, playersList);

        if (luckEvent < eventsList.farmBigWeapon) return farmBigWeapon(currentPlayer, playersList);

        if (luckEvent < eventsList.heal) {
            return heal(currentPlayer);
        } else {
            return heal(currentPlayer);
        }
    }
    // si no esta muerto lo cura
    if (luckEvent >= eventsList.heal) {
        if (!currentPlayer.live) {
            return heal(currentPlayer)
        } else {
            return revivePlayer(currentPlayer);
        }
    } else {
        return { message: "death", player: new Player(), isCommon: true, eventType:eventType.COMMON };
    }
}
// Matar a un jugador por un evento natural
function playerDeath(playerBase: Player): genericEvent {
    const message = `${playerBase.name} murió por pendejo`;
    playerBase.Death();
    return { message, player: playerBase, isCommon: false, eventType: eventType.DEATH, };
}

function linkPlayers(playerBase: Player, playersList: Player[], isDuo: boolean): genericEvent {
    const playersOk = playersList.filter(current =>
        current.live && current !== playerBase && !current.amigo
    );

    let otherPlayer: Player | null = null;

    if (playersOk.length > 0) {
        const randomNumber = Math.floor(Math.random() * playersOk.length);
        otherPlayer = playersOk[randomNumber];

        if (isDuo) {
            otherPlayer.SetFriend(playerBase);
            playerBase.SetFriend(otherPlayer);
        } else {
            otherPlayer.SetRelation(playerBase);
            playerBase.SetRelation(otherPlayer);
        }

        const message = `${playerBase.name} se unió con ${otherPlayer.name}`;
        return { message, player: playerBase, isCommon: false, eventType: isDuo ? eventType.DUO : eventType.RELATION, };
    } else {
        console.warn("No hay jugadores válidos disponibles.");
        return farmCasual(playerBase);
    }
}

function farmCasual(playerBase: Player): genericEvent {
    if (playerBase.suerte < 40) {
        if (playerBase.suerte < 30) {
            if (playerBase.suerte < 20) {
                if (playerBase.suerte < 10) {
                    casualEvent.bad *= 3;
                }
                casualEvent.bad *= 2.5;
            }
            casualEvent.bad *= 2;
        }
        casualEvent.bad *= 1.5;
    }

    if (playerBase.suerte > 70) {
        if (playerBase.suerte > 80) {
            if (playerBase.suerte > 90) {
                casualEvent.good *= 2.5;
            }
            casualEvent.good *= 2;
        }
        casualEvent.good *= 1.5;
    }

    const message = `${playerBase.name} evento casual`;
    return {
        message,
        player: playerBase,
        isCommon: true,
        eventType: eventType.COMMON,
    };
}

function farmWeapon(playerBase: Player, playersList: Player[]): genericEvent {
    const message = `${playerBase.name} obtuvo un arma casual`;
    return {
        message,
        player: playerBase,
        isCommon: true,
        eventType: eventType.COMMON,
    };
}

function farmBigWeapon(playerBase: Player, playersList: Player[]): genericEvent {
    const message = `${playerBase.name} obtuvo un arma grande`;
    return {
        message,
        player: playerBase,
        isCommon: true,
        eventType: eventType.COMMON,
    };
}

function heal(playerBase: Player): genericEvent {
    const healAmount = Math.floor(Math.random() * 20);
    const message = `${playerBase.name} se curó ${healAmount} puntos de vida`;
    playerBase.Heal(healAmount);

    return {
        message,
        player: playerBase,
        isCommon: true,
        eventType: eventType.HEAL,
    };
}

function revivePlayer(playerBase: Player): genericEvent {
    playerBase.Revive();
    const message = `${playerBase.name} ¡SE PARÓ, SE PARÓ, SE PARÓ!`;

    return {
        message,
        player: playerBase,
        isCommon: false,
        eventType: eventType.REVIVE,
    };
}
