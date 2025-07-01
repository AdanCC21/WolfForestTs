import { Player } from "../entities/player.entity";
import { CommonEvent, eventType, GenericEvent, SpecialEvent } from "../entities/events.entity";
function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 0 >= playerProb < eventProb
const dayEventsList = {
    //0 -> 19
    death: 20,
    //20 -> 34
    kill: 35,
    //35 -> 39
    deal: 40,
    // 40 -> 44
    relation: 45,
    //45 -> 79 (comida, refugio, caza etc)
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
    //35 -> 49
    kill: 50,
    //50 -> 59
    deal: 60,
    // 60 -> 64
    relation: 65,
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

export function useGetEvents(dayNumber: number, playersList: Array<Player>) {
    if (dayNumber % 2 === 0) {
        return playersList.map((current) => {
            return getEvents(dayEventsList, current, playersList, true);
        })
    } else {
        return playersList.map((current) => {
            return getEvents(nightEventsList, current, playersList, false);
        })
    }
}
// lista de eventos
function getEvents(eventsList: any, currentPlayer: Player, playersList: Array<Player>, isDay: boolean): GenericEvent {
    let luckEvent = randomNumber(0, 100);
    if (currentPlayer.live) {
        if (luckEvent < eventsList.death) return playerDeath(currentPlayer, isDay);

        if (luckEvent < eventsList.kill) return killPlayer(currentPlayer, playersList, isDay);

        if (luckEvent < eventsList.deal) return linkPlayers(currentPlayer, playersList, true, isDay);

        if (luckEvent < eventsList.relation) return linkPlayers(currentPlayer, playersList, false, isDay);

        if (luckEvent < eventsList.farmCasual) return farmCasual(currentPlayer, isDay);

        if (luckEvent < eventsList.farmWeapon) return farmWeapon(currentPlayer, playersList, isDay);

        if (luckEvent < eventsList.farmBigWeapon) return farmBigWeapon(currentPlayer, playersList, isDay);

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
        return { isCommon: false, event: false, playerOrigin: currentPlayer };
    }
}

// Matar a un jugador por un evento natural
function playerDeath(playerBase: Player, isDay: boolean): GenericEvent {
    const message = `${playerBase.name} murió por pendejo`;
    playerBase.Death();
    let specialEvent: SpecialEvent = {
        message: message,
        eventType: eventType.DEATH,
        players: [playerBase],
        victims: []
    }
    return { isCommon: false, event: specialEvent, playerOrigin: playerBase };
}

function killPlayer(playerBase: Player, playersList: Player[], isDay: boolean): GenericEvent {
    let playersDisp = playersList.filter((current) => current != playerBase && current.live);
    let r = Math.floor(Math.random() * playersDisp.length);
    let target = playersDisp[r];
    target.Death();
    let message = `${playerBase.name} mato a ${target.name}`;
    let specialEvent: SpecialEvent = {
        message: message,
        eventType: eventType.KILL,
        players: [playerBase],
        victims: [target]
    }
    return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
}

function linkPlayers(playerBase: Player, playersList: Player[], isDuo: boolean, isDay: boolean): GenericEvent {
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

            const message = `${playerBase.name} se unió con ${otherPlayer.name}`;
            let specialEvent: SpecialEvent = {
                message: message,
                eventType: eventType.DUO,
                players: [playerBase],
                victims: [otherPlayer],
            }
            return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
        } else {
            otherPlayer.SetRelation(playerBase);
            playerBase.SetRelation(otherPlayer);

            const message = `${playerBase.name} se unió en una relacion con ${otherPlayer.name}`;
            let specialEvent: SpecialEvent = {
                message: message,
                eventType: eventType.RELATION,
                players: [playerBase],
                victims: [otherPlayer],
            }

            return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
        }
    } else {
        console.warn("No hay jugadores válidos disponibles.");
        return farmCasual(playerBase, isDay);
    }
}

function heal(playerBase: Player): GenericEvent {
    const healAmount = Math.floor(Math.random() * 20);
    const message = `${playerBase.name} se curó ${healAmount} puntos de vida`;
    playerBase.Heal(healAmount);
    let specialEvent: SpecialEvent = {
        message: message,
        eventType: eventType.HEAL,
        players: [playerBase],
        victims: [],
    }

    return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
}

function revivePlayer(playerBase: Player): GenericEvent {
    playerBase.Revive();
    const message = `${playerBase.name} ¡SE PARÓ, SE PARÓ, SE PARÓ!`;

    let specialEvent: SpecialEvent = {
        message: message,
        eventType: eventType.REVIVE,
        players: [playerBase],
        victims: []
    }

    return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
}



// ------ Eventos Comunes ------ //
const commonEventsProb = {
    bad: 33.3,
    neutral: 33.3,
    good: 33.4
}

function farmCasual(playerBase: Player, isDay: boolean): GenericEvent {
    const tempEventsProb = { ...commonEventsProb };
    if (playerBase.suerte < 30) {
        if (playerBase.suerte < 20) {
            if (playerBase.suerte < 10) {
                //10
                tempEventsProb.bad *= 2.5;
            } else {
                //20
                tempEventsProb.bad *= 2;
            }
        } else {
            //30
            tempEventsProb.bad *= 1.5;
        }

        // Actualizar good && neutral rangos
        tempEventsProb.neutral = (100 - tempEventsProb.bad) / 2;
        tempEventsProb.good = (100 - tempEventsProb.bad) / 2;
    }
    else if (playerBase.suerte > 70) {
        if (playerBase.suerte > 80) {
            if (playerBase.suerte > 90) {
                // 90
                tempEventsProb.good *= 2.5;
            } else {
                // 80
                tempEventsProb.good *= 2;
            }
        } else {
            // 70
            tempEventsProb.good *= 1.5;
        }

        // Actualizar good && neutral rangos
        tempEventsProb.bad = (100 - tempEventsProb.good) / 2;
        tempEventsProb.neutral = (100 - tempEventsProb.good) / 2;
    }
    // sumamos rangos
    tempEventsProb.neutral = tempEventsProb.bad + tempEventsProb.neutral;
    tempEventsProb.good = tempEventsProb.neutral + tempEventsProb.good;

    let r = Math.floor((Math.random() * 100) + 1);
    let message = "";
    let commonEvent: CommonEvent;

    if (r < tempEventsProb.bad) {
        message = `${playerBase.name} evento malo`;
        commonEvent = {
            message,
            player: playerBase,
            fuerza: -10,
            vida: -5,
            suerte: -5
        };
    } else if (r < tempEventsProb.neutral) {
        message = `${playerBase.name} evento neutral`;
        commonEvent = {
            message,
            player: playerBase,
            fuerza: 0,
            vida: 0,
            suerte: 0
        };
    } else {
        message = `${playerBase.name} evento bueno`;
        commonEvent = {
            message,
            player: playerBase,
            fuerza: +10,
            vida: +5,
            suerte: 0
        };
    }

    playerBase.UpdateAttributes(commonEvent);
    commonEvent.player = playerBase
    return {
        isCommon: true,
        event: commonEvent,
        playerOrigin: playerBase
    };
}

function farmWeapon(playerBase: Player, playersList: Player[], isDay: boolean): GenericEvent {
    const message = `${playerBase.name} obtuvo un arma casual`;
    let commonEvent: CommonEvent = {
        message,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}

function farmBigWeapon(playerBase: Player, playersList: Player[], isDay: boolean): GenericEvent {
    const message = `${playerBase.name} obtuvo un arma grande`;
    let commonEvent: CommonEvent = {
        message,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}
