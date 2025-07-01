import { Player } from "../entities/player.entity";
import { CommonEvent, EventMessage, eventType, GenericEvent, SpecialEvent } from "../entities/events.entity";
import { deathMessagesDay, deathMessagesNight } from "../data/deathMessages";
import { farmArrowMessages, farmAxeMessages, farmPistolMessages, farmRazorMessages, farmRifleMessages, negativeCommonEventsDay, negativeCommonEventsNight, neutralCommonEventsDay, neutralCommonEventsNight, positiveCommonEventsDay, positiveCommonEventsNight } from "../data/farmMessages";
import { Arco, Hacha, Navaja, Pistola, Rifle } from "../entities/weapon.entity";
import { DuoMessagesList, RelationMessagesList } from "../data/friendRelationMessages";
import { ReviveMessageList } from "../data/healReviveMessages";
import { KillMessageList } from "../data/killMessages";
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

function getMessage(list: Array<EventMessage>, playerBase: Player, otherPlayer?: Player) {
    let r = Math.floor(Math.random() * list.length);
    let event = list[r];
    let message = '';
    if (otherPlayer) {
        message = playerBase.name + " " + event.messages[0] + otherPlayer.name + " " + event.messages[1];
    } else {
        message = playerBase.name + " " + event.messages[0];
    }
    return { event: event, finalMessage: message }
}

// * ---------------- ---------------- MANEJO DE EVENTOS ---------------- ---------------- * //

function playerDeath(playerBase: Player, isDay: boolean): GenericEvent {
    let { event, finalMessage } = getMessage(isDay ? deathMessagesDay : deathMessagesNight, playerBase);

    playerBase.Death();
    playerBase.UpdateAttributesByMessage(event);

    let specialEvent: SpecialEvent = {
        message: finalMessage,
        eventType: eventType.DEATH,
        players: [playerBase],
        victims: []
    }
    return { isCommon: false, event: specialEvent, playerOrigin: playerBase };
}

// * : Falta matar por arma, matar de 1 a muchos, de muchos a muchos
function killPlayer(playerBase: Player, playersList: Player[], isDay: boolean): GenericEvent {
    let playersDisp = playersList.filter((current) => current != playerBase && current.live);

    let r = Math.floor(Math.random() * playersDisp.length);
    let target = playersDisp[r];
    target.Death();

    const { event, finalMessage } = getMessage(KillMessageList, playerBase, target);
    playerBase.UpdateAttributesByMessage(event);

    let specialEvent: SpecialEvent = {
        message: finalMessage,
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
            const { event, finalMessage } = getMessage(DuoMessagesList, playerBase, otherPlayer);

            playerBase.SetFriend(otherPlayer);
            otherPlayer.SetFriend(playerBase);

            playerBase.UpdateAttributesByMessage(event);
            otherPlayer.UpdateAttributesByMessage(event);

            let specialEvent: SpecialEvent = {
                message: finalMessage,
                eventType: eventType.DUO,
                players: [playerBase],
                victims: [otherPlayer],
            }
            return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
        } else {
            const { event, finalMessage } = getMessage(RelationMessagesList, playerBase, otherPlayer);

            playerBase.SetRelation(otherPlayer);
            otherPlayer.SetRelation(playerBase);

            playerBase.UpdateAttributesByMessage(event);
            otherPlayer.UpdateAttributesByMessage(event);

            let specialEvent: SpecialEvent = {
                message: finalMessage,
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
    const { finalMessage } = getMessage(ReviveMessageList, playerBase);
    playerBase.Revive();

    let specialEvent: SpecialEvent = {
        message: finalMessage,
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
    let commonEvent: CommonEvent;

    if (r < tempEventsProb.bad) {
        let { event, finalMessage } = getMessage(isDay ? negativeCommonEventsDay : negativeCommonEventsNight, playerBase)

        commonEvent = {
            message: finalMessage,
            player: playerBase,
            fuerza: event.strength,
            vida: event.heal,
            suerte: event.luck
        };
    } else if (r < tempEventsProb.neutral) {
        let { event, finalMessage } = getMessage(isDay ? neutralCommonEventsDay : neutralCommonEventsNight, playerBase)

        commonEvent = {
            message: finalMessage,
            player: playerBase,
            fuerza: event.strength,
            vida: event.heal,
            suerte: event.luck
        };
    } else {
        let { event, finalMessage } = getMessage(isDay ? positiveCommonEventsDay : positiveCommonEventsNight, playerBase)

        commonEvent = {
            message: finalMessage,
            player: playerBase,
            fuerza: event.strength,
            vida: event.heal,
            suerte: event.luck
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
    const opciones = [farmRazorMessages, farmArrowMessages, farmAxeMessages];
    let r = Math.floor(Math.random() * opciones.length)
    const lista = opciones[r];

    let { event, finalMessage } = getMessage(lista, playerBase)
    playerBase.SetWeapon(event, new Arco())

    switch (r) {
        case 0:
            playerBase.SetWeapon(event, new Navaja());
            break;
        case 1:
            playerBase.SetWeapon(event, new Arco());
            break;
        case 1:
            playerBase.SetWeapon(event, new Hacha());
            break;
    }

    let commonEvent: CommonEvent = {
        message: finalMessage,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}

function farmBigWeapon(playerBase: Player, playersList: Player[], isDay: boolean): GenericEvent {
    const opciones = [farmPistolMessages, farmRifleMessages];
    let r = Math.floor(Math.random() * opciones.length);
    const lista = opciones[r];

    let { event, finalMessage } = getMessage(lista, playerBase)
    switch (r) {
        case 0:
            playerBase.SetWeapon(event, new Pistola());
            break;
        case 1:
            playerBase.SetWeapon(event, new Rifle());
            break;
    }

    let commonEvent: CommonEvent = {
        message: finalMessage,
        player: playerBase,
        fuerza: 0, vida: 0, suerte: 0
    };
    return { isCommon: true, event: commonEvent, playerOrigin: playerBase };
}
