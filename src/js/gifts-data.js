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
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
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
    icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
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
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
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
    icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.9 20.9 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m8.835 2.535a23.847 23.847 0 000-3.46m0 3.46a23.847 23.847 0 010 3.46m0-3.46a1.73 1.73 0 010 3.46m0-3.46a1.73 1.73 0 000 3.46',
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
    icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
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
    icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z',
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
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
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
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
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
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
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
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
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
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
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
    icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
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
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
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
    icon: 'M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-3.75a1.575 1.575 0 013.15 0V6.75m-3.15-2.175v5.925M13.2 6.75v-3a1.575 1.575 0 013.15 0v3m0 0V21a2.25 2.25 0 01-2.25 2.25h-5.25A6.75 6.75 0 011.9 16.5v-.75c0-.622.504-1.125 1.125-1.125h1.5c.621 0 1.125.503 1.125 1.125v.75',
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
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.814A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0012 13.489a50.702 50.702 0 007.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
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
    icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
];

export const GIFTS_COUNT = gifts.length; // 16
