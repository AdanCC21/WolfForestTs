export interface CommonEventMessage {
  message: string,
  strength: number,
  health: number,
  luck: number
}

// ------ DIA ------ // 
export const neutralCommonEventsDay: Array<CommonEventMessage> = [
  { message: 'recolectó bayas y frutos del bosque.', strength: 0, health: 0, luck: 0 },
  { message: 'se movió hacia una nueva zona para explorar.', strength: 0, health: 0, luck: 0 },
  { message: 'avistó a otro competidor, pero decidió mantenerse oculto.', strength: 0, health: 0, luck: 0 },
  { message: 'descansó brevemente bajo la sombra de un árbol.', strength: 0, health: 0, luck: 0 },
  { message: 'bebió agua de un arroyo cercano.', strength: 0, health: 0, luck: 0 },
  { message: 'se desmaya de agotamiento', strength: 0, health: 0, luck: 0 },
  { message: 'se desmaya de agotamiento', strength: 0, health: 0, luck: 0 },
  { message: 'exploró una cueva cercana, pero no encontró nada interesante.', strength: 0, health: 0, luck: 0 },
  { message: 'se detuvo a afilar un palo, preparándose para cualquier peligro.', strength: 0, health: 0, luck: 0 },
  { message: 'escuchó un ruido extraño y se mantuvo alerta.', strength: 0, health: 0, luck: 0 },
  { message: 'ayudó a un animal herido que encontró en su camino.', strength: 0, health: 0, luck: 0 },
  { message: 'se escondió en un arbusto tras escuchar pasos cercanos.', strength: 0, health: 0, luck: 0 },
  { message: 'cruzó un río con cuidado para no mojar sus pertenencias.', strength: 0, health: 0, luck: 0 },
  { message: 'pasó horas recolectando leña para mantener el fuego encendido.', strength: 0, health: 0, luck: 0 },
  { message: 'encontró un refugio natural entre las rocas para descansar un rato.', strength: 0, health: 0, luck: 0 },
];

export const negativeCommonEventsDay: Array<CommonEventMessage> = [
  { message: 'se lastimo al buscar frutos en los arbustos.', strength: 0, health: -0.5, luck: 0 },
  { message: 'fue atacado por un lobo, sobrevivio pero le dejo el brazo sangrando, debera atender sus heridas y cuidarse de la manada de lobos.', strength: -1.5, health: -1.5, luck: 0 },
  { message: 'cayó de un arbol muy alto, se quebro una pierna.', strength: -2, health: -2, luck: 0 },
  { message: 'fue mordido por una serpiente, decidio cortarse el brazo antes de que el veneno se esparza', strength: -3.5, health: -3, luck: 0 },
  { message: 'fue atacado por una manada de lobos, apenas logra sobrevivir', strength: -2, health: -3, luck: 0 },
  { message: 'fue atacado por un enjambre de abejas, una serpiente, un oso bebe, y 2 hamsters salvajes, apenas sobrevivio.', strength: -2, health: -3.5, luck: 0 },
  { message: 'comió bayas venenosas y comenzó a sentirse mal del estómago.', strength: 0, health: -1, luck: 0 },
  { message: 'fue atrapado por una tormenta, quedando empapado y con frío.', strength: 0, health: -1, luck: 0 },
  { message: 'tropezó con una raíz y se lastimó el tobillo.', strength: 0, health: -0.5, luck: 0 },
  { message: 'fue emboscado por un jabalí, logrando escapar con algunas heridas.', strength: -1, health: -2, luck: 0 },
  { message: 'se cortó la mano al intentar abrir una lata con un palo afilado.', strength: 0, health: -0.5, luck: 0 },
  { message: 'fue atacado por un enjambre de avispas y tuvo que huir dolorido.', strength: -1, health: -2, luck: 0 },
  { message: 'se deshidrató tras un día entero sin encontrar agua.', strength: -2, health: -2, luck: 0 },
  { message: 'perdió su mochila al intentar cruzar un río caudaloso.', strength: -1, health: -1, luck: 0 },
  { message: 'sufrió un ataque de fiebre debido a la exposición prolongada al frío, esto le afectara mas adelante.', strength: -2, health: -4, luck: 0 }
]

export const positiveCommonEventsDay: Array<CommonEventMessage> = [
  { message: 'construyó una pequeña trampa para animales.', strength: 1, health: 1, luck: 0 },
  { message: 'practica su punteria', strength: 1, health: 1, luck: 0 },
  { message: 'encontró un refugio seguro y lo mejoró con ramas y hojas.', strength: 1, health: 1, luck: 0 },
  { message: 'cazó un conejo.', strength: 0, health: 1.5, luck: 0 },
  { message: 'descubrió un árbol con frutas nutritivas y recolectó suficiente para días.', strength: 1, health: 1, luck: 0 },
  { message: 'aprendió a hacer fuego sin herramientas, ganando confianza.', strength: 0, health: 1.5, luck: 0 },
  { message: 'se topó con una fuente de agua limpia y llenó su cantimplora.', strength: 1, health: 1, luck: 0 },
  { message: 'construyó una rudimentaria armadura con corteza de árbol.', strength: 1, health: 1, luck: 0 },
  { message: 'estableció un punto estratégico para vigilar los alrededores.', strength: 1, health: 1, luck: 0 },
  { message: 'logró encender un fuego incluso bajo la lluvia.', strength: 1, health: 1.5, luck: 0 }
];

// ------ NOCHE ------ // 
export const neutralCommonEventsNight: Array<CommonEventMessage> = [
  { message: "encontró un lugar seguro para pasar la noche.", strength: 0, health: 0, luck: 0 },
  { message: "escuchó ruidos extraños, pero decidió no investigar.", strength: 0, health: 0, luck: 0 },
  { message: "reforzó su refugio con ramas y piedras.", strength: 0, health: 0, luck: 0 },
  { message: "encendió una pequeña fogata para mantenerse caliente.", strength: 0, health: 0, luck: 0 },
  { message: "intentó mantenerse despierto para vigilar el área.", strength: 0, health: 0, luck: 0 },
  { message: "cazó lobos durante la noche.", strength: 0, health: 0, luck: 0 },
  { message: "se quedó en completo silencio al escuchar pasos cercanos.", strength: 0, health: 0, luck: 0 },
  { message: "revisó su equipo para prepararse para el día siguiente.", strength: 0, health: 0, luck: 0 },
  { message: "vio el brillo de una fogata en la distancia.", strength: 0, health: 0, luck: 0 },
  { message: "observó el cielo nocturno en busca de constelaciones para orientarse.", strength: 0, health: 0, luck: 0 },
  { message: "escuchó a los búhos mientras se mantenía alerta en la oscuridad.", strength: 0, health: 0, luck: 0 },
  { message: "encontró un lugar apartado para descansar bajo la luz de la luna.", strength: 0, health: 0, luck: 0 },
  { message: "se escondió entre los arbustos al escuchar pasos en la oscuridad.", strength: 0, health: 0, luck: 0 },
  { message: "encendió una pequeña fogata para mantenerse caliente en la fría noche.", strength: 0, health: 0, luck: 0 },
  { message: "caminó sigilosamente para evitar ser detectado en la oscuridad.", strength: 0, health: 0, luck: 0 },
  { message: "encontró luciérnagas que iluminaron brevemente su camino.", strength: 0, health: 0, luck: 0 },
  { message: "escuchó el crujir de ramas cercanas y se preparó para cualquier peligro.", strength: 0, health: 0, luck: 0 },
  { message: "escondió sus pertenencias antes de intentar dormir un poco.", strength: 0, health: 0, luck: 0 },
  { message: "fabricó una antorcha improvisada para iluminar su camino.", strength: 0, health: 0, luck: 0 }
];

export const negativeCommonEventsNight: Array<CommonEventMessage> = [
  { message: "decidió mantenerse despierto toda la noche por precaución.", strength: 0, health: -1, luck: 0 },
  { message: "no pudo dormir por un ataque de ansiedad.", strength: 0, health: -1, luck: 0 },
  { message: "no pudo dormir por el miedo a los lobos.", strength: 0, health: -1, luck: 0 },
  { message: "se quemó la mano gravemente al encender una fogata. Será difícil sostener firme un arma.", strength: 0, health: -3, luck: 0 },
  { message: "se tropezó en la oscuridad y cayó sobre una roca, lastimándose el brazo.", strength: 0, health: -0.5, luck: 0 },
  { message: "se perdió al intentar moverse en la noche, agotando sus fuerzas.", strength: 0, health: -3, luck: 0 },
  { message: "fue sorprendido por un depredador nocturno y apenas logró escapar.", strength: -2, health: -3, luck: 0 },
  { message: "sufrió una picadura de insectos mientras dormía al aire libre.", strength: 0, health: -0.5, luck: 0 },
  { message: "se mojó al quedarse dormido bajo una lluvia inesperada.", strength: 0, health: -0.5, luck: 0 },
  { message: "se cortó con una rama mientras intentaba moverse en la oscuridad.", strength: 0, health: -0.5, luck: 0 },
  { message: "el frío nocturno lo debilitó al no tener suficiente abrigo.", strength: -2, health: -3, luck: 0 },
  { message: "su fogata atrajo a un depredador y tuvo que huir, perdiendo base.", strength: -2, health: -5, luck: 0 },
  { message: "se deshidrató al no encontrar agua durante la noche.", strength: -1, health: -3, luck: 0 }
];

export const positiveCommonEventsNight: Array<CommonEventMessage> = [
  { message: "extraña a su familia...", strength: 2, health: 0, luck: 0 },
  { message: "descansó durante el resto de la noche.", strength: 1, health: 1, luck: 0 },
  { message: "encontró un refugio oculto que lo protegió durante toda la noche.", strength: 0, health: 2, luck: 0 },
  { message: "descansó profundamente en un lugar seguro, recuperando energía.", strength: 0, health: 2, luck: 0 },
  { message: "cazó un animal pequeño con sigilo durante la noche.", strength: 1.5, health: 1.5, luck: 0 },
  { message: "logró encender una fogata en medio de la oscuridad para protegerse del frío.", strength: 1, health: 1.5, luck: 0 },
  { message: "usó la oscuridad para moverse sin ser detectado por otros competidores.", strength: 0, health: 1, luck: 0 },
  { message: "afinó sus sentidos en la oscuridad, mejorando su percepción del entorno.", strength: 2, health: 2, luck: 0 },
  { message: "encontró un árbol lleno de frutos incluso bajo la luz tenue de la luna.", strength: 0, health: 1, luck: 0 }
];

// ------ Armas ------ //
export const farmArrowMessages: Array<CommonEventMessage> = [
  { message: 'encontro un arco', strength: 10, health: 0, luck: 5 },
  { message: 'fabrico un arco', strength: 10, health: 0, luck: 15 },
]

export const farmAxeMessages: Array<CommonEventMessage> = [
  { message: 'encontro una hacha', strength: 15, health: 0, luck: 15 },
  { message: 'fabrico una hacha casera', strength: 5, health: 0, luck: 5 },
]

export const farmRazorMessages: Array<CommonEventMessage> = [
  { message: 'encontro una navaja', strength: 5, health: 0, luck: 5 },
  { message: 'fabrico una navaja casera', strength: 5, health: 0, luck: 5 },
]

export const farmPistolMessages: Array<CommonEventMessage> = [
  { message: 'encontro una pistola', strength: 15, health: 0, luck: 15 },
  { message: 'tomo una pistola de un soldado muerte', strength: 5, health: 0, luck: 15 },
]

export const farmRifleMessages: Array<CommonEventMessage> = [
  { message: 'encontro un rifle de caza', strength: 25, health: 0, luck: 20 },
  { message: 'tomo un rifle de caza de un soldado muerte', strength: 25, health: 0, luck: 20 },
]