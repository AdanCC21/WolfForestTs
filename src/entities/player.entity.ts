import { Arma } from "./weapon.entity";

export type newPlayer = {
    id: number;
    image: string,
    name: string,
}

// Puntos de 0 a 100
export class Player {
    id: number
    name: string;
    image: string;
    live: boolean

    fuerza: number;
    vida: number;
    suerte: number;

    arma?: Arma;
    amigo?: Player;
    pareja?: Player;

    constructor(id: number = -1, name: string = '', image: string = '', live: boolean = true, fuerza: number = 50, vida: number = 80,
        suerte: number = 50, arma?: Arma, amigo?: Player, pareja?: Player) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.live = live;
        this.fuerza = fuerza;
        this.vida = vida;
        this.suerte = suerte;
        this.arma = arma;
        this.amigo = amigo;
        this.pareja = pareja;
    }

    Death(): void {
        this.vida = 0;
        this.live = false;
    }

    heal(amount: number): void {
        this.vida += amount;
    }

    revive() {
        this.live = true;
        this.vida = 20;
        this.fuerza = 20;
        this.suerte = 20;
    }

    setFriend(friend: Player): void {
        this.amigo = friend;
    }

    setRelation(player: Player): void {
        this.pareja = player;
    }
}
