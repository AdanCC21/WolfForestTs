import { Player } from "../entities/player.entity";
import { CommonEvent, EventMessage, eventType, GenericEvent, SpecialEvent } from "../entities/events.entity";
import { deathMessagesDay, deathMessagesNight } from "../constants/deathMessages";
import { farmArrowMessages, farmAxeMessages, farmPistolMessages, farmRazorMessages, farmRifleMessages, negativeCommonEventsDay, negativeCommonEventsNight, neutralCommonEventsDay, neutralCommonEventsNight, positiveCommonEventsDay, positiveCommonEventsNight } from "../constants/farmMessages";
import { Arco, Hacha, Navaja, Pistola, Rifle } from "../entities/weapon.entity";
import { DuoMessagesList, RelationMessagesList } from "../constants/friendRelationMessages";
import { ReviveMessageList } from "../constants/healReviveMessages";
import { KillMessageList } from "../constants/killMessages";
function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 0 >= playerProb < eventProb
const dayEventsList = {
    //0 -> 19
    death: 10,
    //20 -> 34
    kill: 15,
    //35 -> 39
    deal: 25,
    // 40 -> 44
    relation: 30,
    //45 -> 79 (comida, refugio, caza etc)
    farmCasual: 75,
    // 80 -> 86 (Arco, Hacha)
    farmWeapon: 85,
    //87-89 (Pistola, rifle)
    farmBigWeapon: 90,
    // 90 -> 97
    heal: 98,
    // 98-100
    revive: 100,
}
const nightEventsList = {
    //0 -> 34
    death: 15,
    //35 -> 49
    kill: 25,
    //50 -> 59
    deal: 35,
    // 60 -> 64
    relation: 45,
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
    if (dayNumber % 2 !== 0) {
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

        if (luckEvent < eventsList.kill) return killPlayer(currentPlayer, playersList);

        if (luckEvent < eventsList.deal) return linkPlayers(currentPlayer, playersList, true, isDay);

        if (luckEvent < eventsList.relation) return linkPlayers(currentPlayer, playersList, false, isDay);

        if (luckEvent < eventsList.farmCasual) return farmCasual(currentPlayer, isDay);

        if (luckEvent < eventsList.farmWeapon) return farmWeapon(currentPlayer);

        if (luckEvent < eventsList.farmBigWeapon) return farmBigWeapon(currentPlayer);

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

function getKillMessage(list: Array<EventMessage>, playerBase: Player, otherPlayers: Array<Player>) {
    let r = Math.floor(Math.random() * list.length);
    let event = list[r];
    let message = '';

    let targetNames = '';
    otherPlayers.forEach((current) => {
        targetNames += current.name + ' ';
    })

    let baseNames = playerBase.name;
    if (playerBase.amigo) baseNames += playerBase.amigo.name;
    if (playerBase.pareja) baseNames += playerBase.pareja.name;

    message = baseNames + " " + event.messages[0] + targetNames + " " + event.messages[1];

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


// * : Falta mensajes de cuando es de 1 a 1, de 1 a muchos, de muchos a muchos, y cuando es por arma
// ! : Mata a su compañero a veces, el aliado del ganador aparece en la derecha con los enemigos
// ! : Adaptar los mensajes para que los jugadores aliados tambien se muestren a la izquierda
// ! : En caso de que mate a su pareja o aliado, no meterlo el los ganadores
function killPlayer(playerBase: Player, playersList: Player[]): GenericEvent {
    const playersDisp = playersList.filter((current) => current != playerBase && current.live);
    const target = playersDisp[Math.floor(Math.random() * playersDisp.length)];

    let pbPlayer = 50;
    let pbTarget = 50;

    // Atributos
    if (playerBase.fuerza > target.fuerza) {
        pbPlayer += playerBase.fuerza - target.fuerza;
        if (pbPlayer > 100) {
            pbPlayer = 100;
        }
        pbTarget = 100 - pbPlayer;
    } else {
        if (playerBase.fuerza < target.fuerza) {
            pbTarget += target.fuerza - playerBase.fuerza;
            if (pbTarget > 100) {
                pbTarget = 100;
            }
            pbPlayer = 100 - pbTarget;
        }
    }

    if (playerBase.suerte > target.suerte) {
        pbPlayer += playerBase.suerte - target.suerte;
        if (pbPlayer > 100) {
            pbPlayer = 100;
        }
        pbTarget = 100 - pbPlayer;
    } else {
        if (playerBase.suerte < target.suerte) {
            pbTarget += target.suerte - playerBase.suerte;
            if (pbTarget > 100) {
                pbTarget = 100;
            }
            pbPlayer = 100 - pbTarget;
        }
    }

    if (playerBase.vida > target.vida) {
        pbPlayer += playerBase.vida - target.vida;
        if (pbPlayer > 100) {
            pbPlayer = 100;
        }
        pbTarget = 100 - pbPlayer;
    } else {
        if (playerBase.vida < target.vida) {
            pbTarget += target.vida - playerBase.vida;
            if (pbTarget > 100) {
                pbTarget = 100;
            }
            pbPlayer = 100 - pbTarget;
        }
    }

    // Armas
    if (playerBase.arma) {
        pbPlayer += playerBase.arma.power;
        if (pbPlayer > 100) {
            pbPlayer = 100;
        }
        pbTarget = 100 - pbPlayer;
    }
    if (target.arma) {
        pbTarget += target.arma.power;
        if (pbTarget > 100) {
            pbTarget = 100;
        }
        pbPlayer = 100 - pbTarget;
    }

    if (playerBase.amigo && playerBase.amigo !== target) {
        if (playerBase.amigo && playerBase.amigo.live) {
            if (target.amigo && target.amigo.live) {
                // se anulan
            } else {
                // sube la prob de playerBase
                pbPlayer += 15
                if (pbPlayer > 100) {
                    pbPlayer = 100
                }
                pbTarget = 100 - pbPlayer;
            }
        } else {
            // pb no tiene amigo
            if (target.amigo && target.amigo.live) {
                // sube la prob de target
                pbTarget += 15
                if (pbTarget > 100) {
                    pbTarget = 100
                }
                pbPlayer = 100 - pbTarget;
            }
            // se anula si no tiene
        }
    }

    if (playerBase.pareja && playerBase.pareja !== target) {
        if (playerBase.pareja && playerBase.pareja.live) {
            if (target.pareja && target.pareja.live) {
                // se anulan
            } else {
                // sube la prob de playerBase
                pbPlayer += 20
                if (pbPlayer > 100) {
                    pbPlayer = 100
                }
                pbTarget = 100 - pbPlayer;
            }
        } else {
            // pb no tiene pareja
            if (target.pareja && target.pareja.live) {
                // sube la prob de target
                pbTarget += 20
                if (pbTarget > 100) {
                    pbTarget = 100
                }
                pbPlayer = 100 - pbTarget;
            }
            // se anula si no tiene
        }
    }

    // deasde pbplayer hasta 100
    pbTarget += pbPlayer;
    let finalProb = Math.floor(Math.random() * 100);

    if (finalProb <= pbPlayer) {
        //gano playerBase
        target.Death();
        const targets: Array<Player> = [];
        targets.push(target);

        const players: Array<Player> = [];
        players.push(playerBase);

        // mato a los perdedores
        if (target.amigo) { target.amigo.Death(); targets.push(target.amigo) }
        if (target.pareja) { target.pareja.Death(); targets.push(target.pareja) }

        const { event, finalMessage } = getKillMessage(KillMessageList, playerBase, targets);

        // actualizo y meto a el jugador base y sus amigos
        playerBase.UpdateAttributesByMessage(event);
        if (playerBase.amigo) { targets.push(playerBase.amigo) }
        if (playerBase.pareja) { targets.push(playerBase.pareja) }

        let specialEvent: SpecialEvent = {
            message: finalMessage,
            eventType: eventType.KILL,
            players: players,
            victims: targets
        }
        return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
    } else {
        // gano target
        playerBase.Death();
        const targets: Array<Player> = [];
        targets.push(playerBase);

        const players: Array<Player> = [];
        players.push(target);

        if (playerBase.amigo) { playerBase.amigo.Death(); targets.push(playerBase.amigo) }
        if (playerBase.pareja) { playerBase.pareja.Death(); targets.push(playerBase.pareja) }

        const { event, finalMessage } = getKillMessage(KillMessageList, playerBase, targets);
        target.UpdateAttributesByMessage(event);

        if (target.amigo) { targets.push(target.amigo) }
        if (target.pareja) { targets.push(target.pareja) }

        let specialEvent: SpecialEvent = {
            message: finalMessage,
            eventType: eventType.KILL,
            players: players,
            victims: targets
        }
        return { isCommon: false, event: specialEvent, playerOrigin: playerBase }
    }
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

//! Validar si tiene un arma mejor no cambiarla, si ya tiene esa arma o una mejor ,cambiar aun evento comun
function farmWeapon(playerBase: Player): GenericEvent {
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

function farmBigWeapon(playerBase: Player): GenericEvent {
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
