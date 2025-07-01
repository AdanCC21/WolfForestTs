import { Player } from "../entities/player.entity";
import { CommonEvent, eventType, GenericEvent, SpecialEvent } from "../entities/events.entity";
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
        // jugador muerto
        return null;
    }
}

// Matar a un jugador por un evento natural
function playerDeath(playerBase: Player): GenericEvent {
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

function linkPlayers(playerBase: Player, playersList: Player[], isDuo: boolean): GenericEvent {
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
            return { isCommon: false, event: specialEvent, playerOrigin:playerBase }
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

            return { isCommon: false, event: specialEvent, playerOrigin:playerBase }
        }
    } else {
        console.warn("No hay jugadores válidos disponibles.");
        return farmCasual(playerBase);
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

    return { isCommon: false, event: specialEvent, playerOrigin:playerBase }
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

    return { isCommon: false, event: specialEvent, playerOrigin:playerBase }
}

// --------------- MATAR A UN JUGADOR ---------------

// ------ Eventos Comunes ------ //
const commonEventsProb = {
    // 0 -> 19
    bad: 33.3,
    // 20 -> 79
    neutral: 33.3,
    // 80 -> 100
    good: 33.3
}
interface commonEventEntity {
    message: string,
    strength: number,
    health: number,
    luck: number
}
const neutralCommonList: Array<commonEventEntity> = [
    { message: 'evento comun', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun1', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun2', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun3', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun4', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun5', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun6', strength: 0, health: 0, luck: 0 },
    { message: 'evento comun7', strength: 0, health: 0, luck: 0 },
]
const goodCommonList: Array<commonEventEntity> = [
    { message: 'buen evento', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento1', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento2', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento3', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento4', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento5', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento6', strength: 40, health: 10, luck: 0 },
    { message: 'buen evento7', strength: 40, health: 10, luck: 0 },
]
const badCommonList: Array<commonEventEntity> = [
    { message: 'evento malo', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo1', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo2', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo3', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo4', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo5', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo6', strength: -10, health: -5, luck: -25 },
    { message: 'evento malo7', strength: -10, health: -5, luck: -25 },
]

function farmCasual(playerBase: Player): GenericEvent {
    const tempEventsProb = { ...commonEventsProb };
    if (playerBase.suerte < 40) {
        if (playerBase.suerte < 30) {
            if (playerBase.suerte < 20) {
                if (playerBase.suerte < 10) {
                    tempEventsProb.bad *= 3;
                } else {
                    tempEventsProb.bad *= 2.5;
                }
            } else {
                tempEventsProb.bad *= 2;
            }
        } else {
            tempEventsProb.bad *= 1.5;
        }

        // Actualizar good && neutral rangos
        tempEventsProb.good = (100 - tempEventsProb.bad) / 2;
        tempEventsProb.neutral = (100 - tempEventsProb.bad) / 2;

        console.log('bad')
        console.log(tempEventsProb)
    }
    else if (playerBase.suerte > 70) {
        if (playerBase.suerte > 80) {
            if (playerBase.suerte > 90) {
                tempEventsProb.good *= 2.5;
            } else {

                tempEventsProb.good *= 2;
            }
        } else {

            tempEventsProb.good *= 1.5;
        }

        // Actualizar good && neutral rangos
        tempEventsProb.bad = (100 - tempEventsProb.good) / 2;
        tempEventsProb.neutral = (100 - tempEventsProb.good) / 2;

        console.log('good');
        console.log(tempEventsProb);
    }

    tempEventsProb.neutral = tempEventsProb.bad + tempEventsProb.neutral;
    // este deberia de ser 100
    tempEventsProb.good = tempEventsProb.neutral + tempEventsProb.good;
    console.log('actualizado')
    console.log(tempEventsProb)

    // let r = Math.floor((Math.random() * 100) + 1);
    // if (r < tempEventsProb.good) {
    //     if (r < tempEventsProb.neutral) {
    //         if (r < tempEventsProb.bad) {
    //             let message = `${playerBase.name} evento malo`
    //             return
    //         }
    //     }
    // }

    const message = `${playerBase.name} evento casual`;
    let commonEvent: CommonEvent = {
        message: message,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    }
    return { isCommon: true, event: commonEvent, playerOrigin:playerBase }
}

function farmWeapon(playerBase: Player, playersList: Player[]): GenericEvent {
    const message = `${playerBase.name} obtuvo un arma casual`;
    let commonEvent: CommonEvent = {
        message,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}

function farmBigWeapon(playerBase: Player, playersList: Player[]): GenericEvent {
    const message = `${playerBase.name} obtuvo un arma grande`;
    let commonEvent: CommonEvent = {
        message,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}
