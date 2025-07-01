import { EventMessage } from "../entities/events.entity";


// ------ DIA ------ // 
export const neutralCommonEventsDay: Array<EventMessage> = [
  { messages: ['recolectó bayas y frutos del bosque.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se movió hacia una nueva zona para explorar.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['avistó a otro competidor, pero decidió mantenerse oculto.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['descansó brevemente bajo la sombra de un árbol.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['bebió agua de un arroyo cercano.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se desmaya de agotamiento'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se desmaya de agotamiento'], strength: 0, heal: 0, luck: 0 },
  { messages: ['exploró una cueva cercana, pero no encontró nada interesante.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se detuvo a afilar un palo, preparándose para cualquier peligro.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['escuchó un ruido extraño y se mantuvo alerta.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['ayudó a un animal herido que encontró en su camino.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se escondió en un arbusto tras escuchar pasos cercanos.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['cruzó un río con cuidado para no mojar sus pertenencias.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['pasó horas recolectando leña para mantener el fuego encendido.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['encontró un refugio natural entre las rocas para descansar un rato.'], strength: 0, heal: 0, luck: 0 }
];


export const negativeCommonEventsDay: Array<EventMessage> = [
  { messages: ['se lastimo al buscar frutos en los arbustos.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['fue atacado por un lobo, sobrevivio pero le dejo el brazo sangrando, debera atender sus heridas y cuidarse de la manada de lobos.'], strength: -1.5, heal: -1.5, luck: 0 },
  { messages: ['cayó de un arbol muy alto, se quebro una pierna.'], strength: -2, heal: -2, luck: 0 },
  { messages: ['fue mordido por una serpiente, decidio cortarse el brazo antes de que el veneno se esparza'], strength: -3.5, heal: -3, luck: 0 },
  { messages: ['fue atacado por una manada de lobos, apenas logra sobrevivir'], strength: -2, heal: -3, luck: 0 },
  { messages: ['fue atacado por un enjambre de abejas, una serpiente, un oso bebe, y 2 hamsters salvajes, apenas sobrevivio.'], strength: -2, heal: -3.5, luck: 0 },
  { messages: ['comió bayas venenosas y comenzó a sentirse mal del estómago.'], strength: 0, heal: -1, luck: 0 },
  { messages: ['fue atrapado por una tormenta, quedando empapado y con frío.'], strength: 0, heal: -1, luck: 0 },
  { messages: ['tropezó con una raíz y se lastimó el tobillo.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['fue emboscado por un jabalí, logrando escapar con algunas heridas.'], strength: -1, heal: -2, luck: 0 },
  { messages: ['se cortó la mano al intentar abrir una lata con un palo afilado.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['fue atacado por un enjambre de avispas y tuvo que huir dolorido.'], strength: -1, heal: -2, luck: 0 },
  { messages: ['se deshidrató tras un día entero sin encontrar agua.'], strength: -2, heal: -2, luck: 0 },
  { messages: ['perdió su mochila al intentar cruzar un río caudaloso.'], strength: -1, heal: -1, luck: 0 },
  { messages: ['sufrió un ataque de fiebre debido a la exposición prolongada al frío, esto le afectara mas adelante.'], strength: -2, heal: -4, luck: 0 }
];


export const positiveCommonEventsDay: Array<EventMessage> = [
  { messages: ['construyó una pequeña trampa para animales.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['practica su punteria'], strength: 1, heal: 1, luck: 0 },
  { messages: ['encontró un refugio seguro y lo mejoró con ramas y hojas.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['cazó un conejo.'], strength: 0, heal: 1.5, luck: 0 },
  { messages: ['descubrió un árbol con frutas nutritivas y recolectó suficiente para días.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['aprendió a hacer fuego sin herramientas, ganando confianza.'], strength: 0, heal: 1.5, luck: 0 },
  { messages: ['se topó con una fuente de agua limpia y llenó su cantimplora.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['construyó una rudimentaria armadura con corteza de árbol.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['estableció un punto estratégico para vigilar los alrededores.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['logró encender un fuego incluso bajo la lluvia.'], strength: 1, heal: 1.5, luck: 0 }
];


// ------ NOCHE ------ // 
export const neutralCommonEventsNight: Array<EventMessage> = [
  { messages: ['encontró un lugar seguro para pasar la noche.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['escuchó ruidos extraños, pero decidió no investigar.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['reforzó su refugio con ramas y piedras.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['encendió una pequeña fogata para mantenerse caliente.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['intentó mantenerse despierto para vigilar el área.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['cazó lobos durante la noche.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se quedó en completo silencio al escuchar pasos cercanos.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['revisó su equipo para prepararse para el día siguiente.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['vio el brillo de una fogata en la distancia.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['observó el cielo nocturno en busca de constelaciones para orientarse.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['escuchó a los búhos mientras se mantenía alerta en la oscuridad.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['encontró un lugar apartado para descansar bajo la luz de la luna.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['se escondió entre los arbustos al escuchar pasos en la oscuridad.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['encendió una pequeña fogata para mantenerse caliente en la fría noche.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['caminó sigilosamente para evitar ser detectado en la oscuridad.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['encontró luciérnagas que iluminaron brevemente su camino.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['escuchó el crujir de ramas cercanas y se preparó para cualquier peligro.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['escondió sus pertenencias antes de intentar dormir un poco.'], strength: 0, heal: 0, luck: 0 },
  { messages: ['fabricó una antorcha improvisada para iluminar su camino.'], strength: 0, heal: 0, luck: 0 }
];


export const negativeCommonEventsNight: Array<EventMessage> = [
  { messages: ['decidió mantenerse despierto toda la noche por precaución.'], strength: 0, heal: -1, luck: 0 },
  { messages: ['no pudo dormir por un ataque de ansiedad.'], strength: 0, heal: -1, luck: 0 },
  { messages: ['no pudo dormir por el miedo a los lobos.'], strength: 0, heal: -1, luck: 0 },
  { messages: ['se quemó la mano gravemente al encender una fogata. Será difícil sostener firme un arma.'], strength: 0, heal: -3, luck: 0 },
  { messages: ['se tropezó en la oscuridad y cayó sobre una roca, lastimándose el brazo.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['se perdió al intentar moverse en la noche, agotando sus fuerzas.'], strength: 0, heal: -3, luck: 0 },
  { messages: ['fue sorprendido por un depredador nocturno y apenas logró escapar.'], strength: -2, heal: -3, luck: 0 },
  { messages: ['sufrió una picadura de insectos mientras dormía al aire libre.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['se mojó al quedarse dormido bajo una lluvia inesperada.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['se cortó con una rama mientras intentaba moverse en la oscuridad.'], strength: 0, heal: -0.5, luck: 0 },
  { messages: ['el frío nocturno lo debilitó al no tener suficiente abrigo.'], strength: -2, heal: -3, luck: 0 },
  { messages: ['su fogata atrajo a un depredador y tuvo que huir, perdiendo base.'], strength: -2, heal: -5, luck: 0 },
  { messages: ['se deshidrató al no encontrar agua durante la noche.'], strength: -1, heal: -3, luck: 0 }
];


export const positiveCommonEventsNight: Array<EventMessage> = [
  { messages: ['extraña a su familia...'], strength: 2, heal: 0, luck: 0 },
  { messages: ['descansó durante el resto de la noche.'], strength: 1, heal: 1, luck: 0 },
  { messages: ['encontró un refugio oculto que lo protegió durante toda la noche.'], strength: 0, heal: 2, luck: 0 },
  { messages: ['descansó profundamente en un lugar seguro, recuperando energía.'], strength: 0, heal: 2, luck: 0 },
  { messages: ['cazó un animal pequeño con sigilo durante la noche.'], strength: 1.5, heal: 1.5, luck: 0 },
  { messages: ['logró encender una fogata en medio de la oscuridad para protegerse del frío.'], strength: 1, heal: 1.5, luck: 0 },
  { messages: ['usó la oscuridad para moverse sin ser detectado por otros competidores.'], strength: 0, heal: 1, luck: 0 },
  { messages: ['afinó sus sentidos en la oscuridad, mejorando su percepción del entorno.'], strength: 2, heal: 2, luck: 0 },
  { messages: ['encontró un árbol lleno de frutos incluso bajo la luz tenue de la luna.'], strength: 0, heal: 1, luck: 0 }
];


// ------ Armas ------ //
export const farmArrowMessages: Array<EventMessage> = [
  { messages: ['encontró un arco'], strength: 10, heal: 0, luck: 5 },
  { messages: ['fabricó un arco'], strength: 10, heal: 0, luck: 15 }
];

export const farmAxeMessages: Array<EventMessage> = [
  { messages: ['encontró una hacha'], strength: 15, heal: 0, luck: 15 },
  { messages: ['fabricó una hacha casera'], strength: 5, heal: 0, luck: 5 }
];

export const farmRazorMessages: Array<EventMessage> = [
  { messages: ['encontró una navaja'], strength: 5, heal: 0, luck: 5 },
  { messages: ['fabricó una navaja casera'], strength: 5, heal: 0, luck: 5 }
];

export const farmPistolMessages: Array<EventMessage> = [
  { messages: ['encontró una pistola'], strength: 15, heal: 0, luck: 15 },
  { messages: ['tomó una pistola de un soldado muerto'], strength: 5, heal: 0, luck: 15 }
];

export const farmRifleMessages: Array<EventMessage> = [
  { messages: ['encontró un rifle de caza'], strength: 25, heal: 0, luck: 20 },
  { messages: ['tomó un rifle de caza de un soldado muerto'], strength: 25, heal: 0, luck: 20 }
];
