/**
 * gifts-data.js
 * Catálogo de los 16 dones espirituales motivacionales
 * (Romanos 12:3-8, Efesios 4:11-12, 1 Corintios 12:8-28, 1 Corintios 14:1-3).
 *
 * El índice de cada elemento (0-15) es su giftIndex, usado por
 * test-engine.js para sumar cada respuesta: giftIndex = (questionId - 1) % 16.
 *
 * Módulo puro de datos: sin dependencias del DOM, portable a cualquier
 * entorno JS (Node, React Native, etc.).
 */

export const gifts = [
  {
    id: 'administracion',
    name: 'Administración / Gobierno',
    oneWord: 'Iniciador',
    description:
      'El don de administración / gobierno se ve en las personas a quienes les gusta organizar o delegar a otros. Impulsados por un fuerte sentido del deber, les gusta hallar cosas para que otros hagan. A diferencia del don de ministerio, este don se enfoca en la participación en equipo. Ven el cuadro amplio y se esfuerzan por mantener a todo mundo avanzando. No siempre organizados en lo personal, prefieren delegar las tareas. Simplemente les gusta evaluar lo que se necesita hacer, y luego diseñan sistemas o asignan las responsabilidades a los que pueden hacer el trabajo. Tienen talento para lograr que se avance hacia adelante como grupo.',
    overuse: 'Demasiada expectación',
    objective: 'Dirigir por el ejemplo, no por manipulación',
    passages: 'Rom. 12:8; 1 Cor. 12:28; Hch. 6:1-7',
    illustration: 'src/assets/gifts/administracion.svg',
  },
  {
    id: 'apostolado',
    name: 'Apostolado / Pionero',
    oneWord: 'Pionero / Visionario',
    description:
      'A diferencia de los antiguos apóstoles, que vieron al Señor y esparcieron la palabra de lugar en lugar, los apóstoles de hoy tienen una visión clara para empezar nuevos ministerios en donde otros tal vez no puedan. Son buenos iniciadores de iglesias y líderes fuertes. Los apóstoles de hoy tienen un llamado propio o dado por el espíritu para alcanzar lugares donde otros tal vez ni se atrevan. Demuestran tremenda capacidad para influir a otros a seguirles. También tienen un entusiasmo contagioso e industrioso para cruzar las barreras culturales, geográficas y económicas por Cristo. Dios usa con frecuencia a los apóstoles de hoy como autoridades ungidas en su región y ministerio.',
    overuse: 'Empujar demasiado / Demasiada autoridad',
    objective: 'Construir más hondo y más fuerte',
    passages: 'Ef. 4:7,11; 1 Cor. 9:1-2; Gl. 2:8-10; 1 Cor. 12:28-29',
    illustration: 'src/assets/gifts/apostolado.svg',
  },
  {
    id: 'discernimiento',
    name: 'Discernimiento',
    oneWord: 'Escuchan / Perciben',
    description:
      'El don de discernimiento es evidente en los que tienen una capacidad extraordinaria para ver a través de mucha confusión y determinar los problemas y soluciones. Se preocupan por lo que es bueno o malo. Tienden a escuchar bien y oír las cosas al parecer pequeñas e insignificantes que arrojan luz sobre una necesidad específica. A menudo son más serios. Distinguen entre el bien y el mal, la verdad y el error. Les gusta hacer preguntas y luego dar consejo. A menudo relacionan los problemas a violaciones de los principios bíblicos. Sienten fuertemente en cuanto a obedecer y poner en práctica la palabra de Dios.',
    overuse: 'Inclinados a criticar o demasiado prontos para hablar',
    objective: 'Buscar más información antes de responder',
    passages: '1 Cor. 12:7,10b; 1 Cor. 2:14',
    illustration: 'src/assets/gifts/discernimiento.svg',
  },
  {
    id: 'evangelizacion',
    name: 'Evangelización',
    oneWord: 'Dinámico',
    description:
      'Los creyentes con el don de evangelización se sienten obligados a ganar almas. Parecen tener la capacidad de comunicar con mucha eficacia el evangelio. Su preocupación por testificar a los perdidos y a un mundo que perece es evidente. Desean participar en ministerios para alcanzar a las personas para Cristo. Este don los motiva a querer que casi todo mensaje que oyen incluya el evangelio y una invitación para confiar en Cristo. Las misiones y el alcance son importantes para ellos. Su meta es estar siempre listos para dar una respuesta a toda persona. El valor de las almas y la tarea de evangelizar es lo más importante para la motivación del evangelista.',
    overuse: 'Celo',
    objective: 'Edificar discípulos, no estadísticas',
    passages: 'Ef. 4:7,11; Hch. 8:26-40; Lc. 19:1-10',
    illustration: 'src/assets/gifts/evangelizacion.svg',
  },
  {
    id: 'exhortacion',
    name: 'Estímulo / Exhortación',
    oneWord: 'Estimulador',
    description:
      'Los creyentes con el don de estímulo son dados a la exhortación. Se sienten obligados a dar consejos. Como consejeros parecen siempre tener listos pasos de acción. Mientras que los profetas declaran la verdad y los maestros la aclaran, a los estimuladores/exhortadores les gusta decirle a uno qué hacer con la verdad. Bendicen a otros con un fuerte sentido de interés. A menudo procuran alentar a otros, y se les busca como asesores. La gente halla que los estimuladores son amigables, comprensivos y prácticos. Disfrutan al usar su capacidad para la comunicación para presentar nociones específicas.',
    overuse: 'Hablar demasiado',
    objective: 'Aplicar la verdad, no crear expectaciones',
    passages: 'Rom. 12:6,8; Hch. 11:23-24; Heb. 10:24-25',
    illustration: 'src/assets/gifts/exhortacion.svg',
  },
  {
    id: 'fe',
    name: 'Fe',
    oneWord: 'Optimista',
    description:
      'El don de fe se halla a menudo en los que tienen una capacidad obvia para confiar en Dios incluso en las circunstancias más adversas. Todo creyente tiene una medida de fe que salva, pero los que tienen el don de fe tienen una dependencia más profunda en Dios y su palabra. Su versículo favorito con frecuencia es "La fe viene por el oír, y el oír por la palabra de Dios." El don de fe se ve en los que creen fuertemente en la presencia y el poder de Dios. Tienden a imponer a la fuerza la fe y la dedicación de otros. Animan a otros a actuar según su fe y retan a todo mundo a aumentar su fe.',
    overuse: 'Excesivamente confiados y a menudo orgullosos de su fe',
    objective: 'Combinar la fe con las obras / Aprender a ser paciente con otros',
    passages: '1 Cor. 12:7,9; Mat. 8:5-16; Heb. 11:1',
    illustration: 'src/assets/gifts/fe.svg',
  },
  {
    id: 'dar',
    name: 'Dar',
    oneWord: 'Mayordomo',
    description:
      'Los dadores tienden a interesarse seriamente en asuntos financieros. El don de dar también incluye el "don de conseguir." Los dadores son sensibles respecto a cómo se gasta y ahorra el dinero. Los que tienen el don de dar no siempre dan más grasa a la rueda que hace más ruido, sino a la que verdaderamente la necesita. Los dadores tienen nociones financieras especiales. Sirven bien especialmente en juntas responsables por mantener presupuestos. Tienden a ser conciezudos y conservadores. El don de dar tal vez no siempre sea evidente, pero un genuino interés en la mayordomía sabia lo será.',
    overuse: 'El poder del dinero',
    objective: 'Mayordomía sincera, no hostigamiento financiero',
    passages: 'Rom. 12:6,8b; Hch. 4:32-35; 2 Cor. 9:7-8',
    illustration: 'src/assets/gifts/dar.svg',
  },
  {
    id: 'hospitalidad',
    name: 'Hospitalidad',
    oneWord: 'Sociable',
    description:
      'El don de hospitalidad es ese interés especial en abrir la casa de uno para una comida o comunión, o simplemente proveer un lugar en donde pueda alojarse algún necesitado. Los que tienen el don de hospitalidad parecen siempre estar listos y dispuestos para invitar a otros a su casa, u ofrecerla como lugar para reuniones en cualquier ocasión. Les encanta proveer refrescos o preparar comidas para individuos o grupos. Rara vez se irritan por peticiones de último minuto para recibir a alguien o permitir una reunión en su casa. Incansablemente sirven procurando que la gente se sienta cómoda y estimulada.',
    overuse: 'Abarcar demasiado / Agotarse',
    objective: 'Proveer compañerismo sin sacrificar el tiempo de la familia',
    passages: '1 P. 4:9-10; Hch. 16:13-15; Lc. 14:12-14',
    illustration: 'src/assets/gifts/hospitalidad.svg',
  },
  {
    id: 'conocimiento',
    name: 'Conocimiento',
    oneWord: 'Perspectivas divinas',
    description:
      'El don de conocimiento consiste en una revelación sobrenatural de ciertos datos de la mente de Dios, que da información instantánea y específica a quien no lo sabría de ninguna otra manera, excepto de Dios. No se trata de una amplificación del conocimiento humano, ni tampoco consiste en el don de simplemente saber mucho. Es la capacidad de recibir verdad específica de la palabra de Dios. A veces pueden abrumar a otros y atraer más atención a su palabra de conocimiento en lugar de hacerlo con el propósito de referir lo que Dios les ha revelado.',
    overuse: 'Hacer que otros se sientan inferiores o ignorantes',
    objective: 'Cambiar vidas, en lugar de impresionar a otros',
    passages: '1 Cor. 12:7-8; 8:1b-2',
    illustration: 'src/assets/gifts/conocimiento.svg',
  },
  {
    id: 'liderazgo',
    name: 'Liderazgo',
    oneWord: 'Soñador',
    description:
      'El don de liderazgo, de manera similar al don de administración / gobierno, es evidente en los que demuestran una capacidad inusual para influir en otros. Parecen tener una determinación independiente para retar y dirigir a otros hacia un objetivo específico. Sobresalen y adoptan posiciones. Los que tienen el don de liderazgo tienden a tener talentos múltiples sobresaliendo en su habilidad con personas y tareas. A menudo están orientados a las tareas, son entusiastas y necesitan controlar sus puntos fuertes. También necesitan ser más sensibles y pacientes con los que no responden tan bien o positivamente como ellos. Son grandes motivadores.',
    overuse: 'Demasiado exigente e impaciente',
    objective: 'Dirigir por el ejemplo y estar dispuesto a ser siervo',
    passages: 'Rom. 12:6,8c; Jn. 13:13-17; Heb. 13:17',
    illustration: 'src/assets/gifts/liderazgo.svg',
  },
  {
    id: 'misericordia',
    name: 'Mostrar Misericordia',
    oneWord: 'Cuidador',
    description:
      'Los creyentes con el don de mostrar misericordia demuestran sensibilidad genuina al sufrimiento. Se sienten obligados a ayudar a las personas a aliviar su dolor. Se interesan más en la persona que en la razón del sufrimiento. Enfocados en los sentimientos de los que sufren, los demostradores de misericordia desean ministrar "estando allí" cuando la gente realmente los necesita. Mostrar simpatía y empatía es su especialidad. Mientras que otros tal vez se preocupen más por el por qué, qué, cuándo y cómo; los que muestran misericordia se interesan en "quién" necesita cuidado amoroso y tierno.',
    overuse: 'Demasiado sensible',
    objective: 'Noción sabia, no respuesta necia',
    passages: 'Rom. 12:6,8d; Mt. 5:7',
    illustration: 'src/assets/gifts/misericordia.svg',
  },
  {
    id: 'profecia',
    name: 'Profecía / Percibir',
    oneWord: 'Intrépido',
    description:
      'Los profetas de hoy no son exactamente como los antiguos. Los profetas del Antiguo Testamento hablaron la palabra literal de Dios. Los que tienen hoy el don de profecía parecen tener la misma seriedad y actitud directa hacia la verdad. Les gusta proclamar la verdad, independientemente de lo que otros piensen. Cuando está controlado por el Espíritu Santo, el don de profecía es una herramienta poderosa para reprender, redargüir y exhortar a otros. Los profetas con frecuencia se hallan señalando el camino, declarando verdad específica o defendiendo algo significativo.',
    overuse: 'Luchador',
    objective: 'Declarar la verdad, y no dividir a los creyentes',
    passages: 'Ef. 4:7,11; 1 Cor. 14:1,3; 2 P. 1:19-21',
    illustration: 'src/assets/gifts/profecia.svg',
  },
  {
    id: 'pastor',
    name: 'Pastor',
    oneWord: 'Discipulador / Líder',
    description:
      'El don de pastor es obvio en los que realmente disfrutan al guiar a otros a servir al Señor. A diferencia del don de ministerio / servicio / ayuda, este don incluye la motivación para dirigir. Los pastores se sienten obligados a animar a otros a trabajar juntos por amor al cuerpo. Influir a otros para trabajar juntos es importante. Recalcando la necesidad de participación en equipo, hacen hincapié en la armonía. Laicos sin preparación también pueden tener el don de pastor. Ven su servicio como contribución para que otros maduren. Con una motivación para unir el ministerio, sienten fuertemente con respecto a la salud espiritual.',
    overuse: 'Aprovecharse de la confianza de otros',
    objective: 'Liderazgo fuerte, en lugar de manipular al rebaño',
    passages: 'Ef. 4:11; 1 P. 5:2-4',
    illustration: 'src/assets/gifts/pastor.svg',
  },
  {
    id: 'servicio',
    name: 'Servicio / Ministerio / Ayuda',
    oneWord: 'Desprendidos',
    description:
      'Al pensar en los creyentes que sirven fielmente detrás de bastidores, se piensa en los que tienen el don de servicio / ministerio / ayuda. Se interesan en bendecir a otros para servir al Señor. Les encanta ayudar a otros. Motivados por un fuerte sentido de necesidad, piensan que "alguien tiene que hacerlo." Interesados y preocupados por otros, se hallan haciendo lo que a nadie más le gusta hacer. Tienden a hacer cualquier cosa que se les pida. Flexibles, se adaptan a muchos desafíos. Simplemente disfrutan al ayudar a otros y suplir necesidades. A menudo genuinamente desprendidos, los que tienen este don gustan al intervenir.',
    overuse: 'Abarcar demasiado',
    objective: 'Ser siervo, no mártir',
    passages: '1 Cor. 12:28; Hch. 6:1-3; Rom. 16:1-2',
    illustration: 'src/assets/gifts/servicio.svg',
  },
  {
    id: 'ensenanza',
    name: 'Enseñanza',
    oneWord: 'A profundidad',
    description:
      'Los creyentes con el don de enseñanza prefieren explicar por qué las cosas son ciertas. En tanto que el profeta declara la verdad, el maestro explica las razones por las que eso es verdad. Interesados en la investigación, los que tienen el don de enseñanza disfrutan al hurgar detalles que parecen ser insignificantes. Disfrutan al presentar lo que han descubierto. A menudo descuidados respecto a las necesidades de otros, avanzan a una comprensión más profunda. Les encanta estudiar. Investigando paciente y persistentemente, bien pueden perderse lo obvio. Estiran los límites del aprendizaje, fijando normas altas de educación.',
    overuse: 'Hurgar demasiado hondo',
    objective: 'Revelar la verdad, no agotarla',
    passages: 'Rom. 12:6,7b; Col. 3:16; Stg. 3:1,2; 2 Tim. 2:2',
    illustration: 'src/assets/gifts/ensenanza.svg',
  },
  {
    id: 'sabiduria',
    name: 'Sabiduría',
    oneWord: 'Perceptivo',
    description:
      'El don de sabiduría es la capacidad única de usar el conocimiento de una manera práctica. Los que tienen este don gustan de combinar lo que saben con una reverencia seria de Dios para influir a otros. A veces luchan con el orgullo y una actitud de superioridad. Necesitan ser consistentemente humildes, y exhibir un sentido de tranquilidad y calma antes de responder. A menudo se ven frente a un tipo de adversidad para estar sintonizados con Dios y su palabra. De otra manera, los que tienen este don tienen la tendencia a engreírse. Son grandes consejeros, por consiguiente, necesitan estar en oración constante, pidiéndole a Dios su sabiduría.',
    overuse: 'Menospreciar a las personas',
    objective: 'Confiar consistentemente y pedir la sabiduría de Dios',
    passages: '1 Cor. 12:7-8; Stg. 3:13-18',
    illustration: 'src/assets/gifts/sabiduria.svg',
  },
];

export const GIFTS_COUNT = gifts.length; // 16
