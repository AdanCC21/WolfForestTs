export class Arma {
    name: string;
    power: number;
    onlyByFound: boolean;

    constructor(name: string = '', power: number = 0, onlyByFound: boolean = false) {
        this.name = name;
        this.power = power;
        this.onlyByFound = onlyByFound;
    }
}

export class Navaja extends Arma {
    constructor() {
        super('Navaja', 10, false);
    }
}

export class Arco extends Arma {
    constructor() {
        super('Arco', 25, false);
    }
}

export class Hacha extends Arma {
    constructor() {
        super('Hacha', 30, true);
    }
}

export class Pistola extends Arma {
    constructor() {
        super('Pistola', 40, true);
    }
}

export class Rifle extends Arma {
    constructor() {
        super('Rifle', 50, true);
    }
}