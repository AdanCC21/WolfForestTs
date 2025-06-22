import { Arma } from "./weapon.entity";

export type newPlayer = {
    image: string,
    name: string,
}

export class Player {
    name: string;
    image: string;
    live: boolean

    fuerza: number;
    astucia: number;
    suerte: number;

    arma?: Arma;
    amigo?: Player;
    pareja?: Player;

    constructor(name: string = '', image: string = '', live: boolean = true, fuerza: number = 10, astucia: number = 10, suerte: number = 10, arma?: Arma,
        amigo?: Player, pareja?: Player) {

        this.name = name;
        this.image = image;
        this.live = live;
        this.fuerza = fuerza;
        this.astucia = astucia;
        this.suerte = suerte;
        this.arma = arma;
        this.amigo = amigo;
        this.pareja = pareja;
    }
}
