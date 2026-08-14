/**
 * gifts.js
 * Catálogo de los 15 dones espirituales motivacionales de Dones IGC (v2).
 * Fuente: docs/CONTENIDO.md, con consejos (tips), ejemplos (examples) e ilustraciones
 * enlazadas a src/assets/illustrations/.
 */

export const GIFTS_COUNT = 15;

export const gifts = [
  {
    id: 'evangelismo',
    name: "Evangelismo",
    summary: "Capacidad para comunicar el Evangelio de forma sencilla y clara, conectando a las personas con la salvación en Jesús.",
    description: "Capacidad sobrenatural para dar el evangelio de manera sencilla y breve. Es el único don hacia incrédulos. No lo hace igual con todos, sabe cómo entrarles, no importa su temperamento. Unos lo hacen a grandes públicos, otros 1 a 1, unos por escrito, no necesitan de una actividad de la iglesia: lo pasan haciendo. También son buenos para enseñar a evangelizar.",
    questionCount: 7,
    maxRawScore: 21,
    minRawScore: 7,
    tips: [
      "Habla de Cristo con naturalidad en tu día a día.",
      "Entrena a otros en métodos prácticos para compartir su fe.",
      "Mantén el enfoque en la gracia de Dios sin entrar en debates infructuosos."
    ],
    examples: [
      "Compartir el evangelio durante una conversación cotidiana.",
      "Escribir guías cortas o folletos de discipulado.",
      "Coordinar campañas de alcance comunitario."
    ],
    illustration: "src/assets/illustrations/Evangelismo.png",
  },
  {
    id: 'dar',
    name: "Dar",
    summary: "Disposición alegre para proveer recursos financieros y materiales de forma generosa, sacrificada y discreta.",
    description: "Capacidad sobrenatural de dar en lo económico, o provisión, medicinas, llena necesidades materiales. A veces en anonimato (no quieren llamar la atención). Pueden identificar necesidades. También apoyan la obra en general (donaciones). Lo hace con liberalidad (sin pesar sino con alegría, generoso, sin condiciones). No siempre es rico, pero dan (a veces absteniéndose de cosas). Promueven la generosidad en otros.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Canaliza tu provisión en proyectos que tengan un impacto claro y espiritual.",
      "Mantén discreción absoluta para proteger tu corazón del orgullo.",
      "Inspira generosidad a los demás compartiendo testimonios sin presionar."
    ],
    examples: [
      "Proveer alimentos o medicinas a familias vulnerables de la iglesia en silencio.",
      "Financiar becas de campamentos para jóvenes de escasos recursos.",
      "Donar recursos significativos para la mejora del templo o proyectos especiales."
    ],
    illustration: "src/assets/illustrations/Dar.png",
  },
  {
    id: 'fe',
    name: "Fe",
    summary: "Confianza firme en Dios frente a situaciones difíciles, perseverando en la oración e inspirando convicción en otros.",
    description: "Es una confianza sobrenatural en Dios para enfrentar situaciones. Pueden estimular la fe de otros. Le creen a Dios. Se les ve en grupos de oración. Son para animar la fe de desanimados, a los que les cuesta creer.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Dedica tiempo constante a la oración intercesora por causas que parecen imposibles.",
      "Anima a otros en sus dudas sin juzgarlos ni menospreciar sus temores.",
      "Ayuda a organizar cadenas de oración ante crisis de la comunidad."
    ],
    examples: [
      "Liderar o iniciar un grupo de intercesión por necesidades extremas.",
      "Sostener espiritualmente a un ministerio que atraviesa una crisis económica confiando plenamente en la provisión divina."
    ],
    illustration: "src/assets/illustrations/Fe.png",
  },
  {
    id: 'servir',
    name: "Servir",
    summary: "Disposición humilde para resolver necesidades prácticas y logísticas tras bambalinas con gozo e iniciativa.",
    description: "Capacidad sobrenatural de ver áreas de necesidad, y soluciona de manera práctica y con humildad, sirve sin buscar sobresalir. Ayuda en cosas prácticas de la iglesia. Sirven con gozo, no a la fuerza.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Aprende a decir 'no' ocasionalmente para evitar el agotamiento extremo.",
      "Recuerda que tu labor silenciosa es la que sostiene el funcionamiento de la iglesia.",
      "Hazlo con gozo y no por compromiso o temor a quedar mal."
    ],
    examples: [
      "Ayudar en la limpieza, orden y preparación física del templo.",
      "Asistir a familias de la iglesia en mudanzas o reparaciones prácticas del hogar.",
      "Preparar la logística física antes de un servicio dominical o evento especial."
    ],
    illustration: "src/assets/illustrations/Servir.png",
  },
  {
    id: 'misericordia',
    name: "Misericordia",
    summary: "Sensibilidad empática profunda para acompañar, consolar y aliviar el sufrimiento físico y emocional de las personas.",
    description: "Parecido al de servir. Es mostrar compasión, aliviar sufrimiento de hermanos. Muy movidos a ayudar enfermos, afligidos, desanimados, solitarios, pobres, en duelo, etc. Pueden dar consejería de manera natural. Lo hacen sin quejarse, de corazón, se conectan con la gente.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Protege tu salud emocional para no absorber el dolor ajeno de manera destructiva.",
      "Acompaña en silencio cuando falten palabras; tu sola presencia es de gran ayuda.",
      "Conecta a las personas con ayuda pastoral o profesional si el problema supera tus capacidades."
    ],
    examples: [
      "Visitar y orar por hermanos enfermos en hospitales o que están pasando por un duelo.",
      "Acompañar emocionalmente a alguien que pasa por momentos difíciles de desánimo.",
      "Movilizar ayuda práctica (comida, transporte) para familias afligidas."
    ],
    illustration: "src/assets/illustrations/Misericordia.png",
  },
  {
    id: 'exhortar',
    name: "Exhortar",
    summary: "Capacidad para animar, guiar en consejería bíblica y amonestar con amor, impulsando el crecimiento personal.",
    description: "De una manera sobrenatural pueden animar, consolar, exhortar, amonestar, obteniendo resultados. Son buenos en consejería, la gente los busca de manera natural. Ayudan a hacer la voluntad de Dios, llevan a la obediencia sin forzar ni manipular. Usa la Biblia.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Asegúrate de que tu corrección siempre vaya acompañada de consuelo e instrucciones claras de acción.",
      "Usa la Escritura con empatía y amor, no como una herramienta de juicio.",
      "Guía a las personas a definir pasos concretos para su restauración espiritual."
    ],
    examples: [
      "Brindar consejería bíblica a hermanos o parejas con problemas personales.",
      "Alentar a un servidor o líder desanimado a continuar firmemente en su llamado.",
      "Guiar a alguien a confesar un pecado y trazar un camino de restauración."
    ],
    illustration: "src/assets/illustrations/Exhortar.png",
  },
  {
    id: 'pastor',
    name: "Pastor",
    summary: "Devoción para cuidar, alimentar y velar de cerca por el crecimiento espiritual individual de cada persona.",
    description: "Implica cuidar ovejas de manera sobrenatural: las alimenta, las cuida, está pendiente de ellas, inspira confianza, está pendiente del que no viene. Habla con los hermanos y se sienten cuidados. También les enseña la Palabra, les ayuda a crecer, personal.",
    questionCount: 6,
    maxRawScore: 18,
    minRawScore: 6,
    tips: [
      "Enfócate en el cuidado y crecimiento personalizado (discipulado uno a uno).",
      "Establece límites saludables en tus relaciones ministeriales para no sobrecargarte.",
      "Ayuda a las personas a integrarse en grupos pequeños de conexión para que no se sientan solas."
    ],
    examples: [
      "Dirigir y cuidar con dedicación de un grupo de conexión semanal.",
      "Dar seguimiento telefónico o presencial a hermanos que se han ausentado de las reuniones.",
      "Mentorear espiritualmente a nuevos creyentes para ayudarles a dar sus primeros pasos de fe."
    ],
    illustration: "src/assets/illustrations/Pastor.png",
  },
  {
    id: 'administrar',
    name: "Administrar",
    summary: "Habilidad organizada para coordinar recursos, solucionar contingencias y dirigir proyectos grupales con eficiencia.",
    description: "Es bueno para organizar, planificar, llevar a cabo, dirige proyectos de la iglesia, ayudan a que funcionen los ministerios y las cosas. No domina, sino que inspira a cumplir la misión de la iglesia local, o el grupo.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Recuerda que las personas son más importantes que los procesos y la perfección del plan.",
      "Comunica siempre el propósito detrás de cada regla o directriz administrativa.",
      "Confía y delega responsabilidades con instrucciones claras y plazos realistas."
    ],
    examples: [
      "Diseñar el presupuesto o plan de trabajo de un ministerio principal.",
      "Coordinar la logística, horarios y comisiones para un congreso o evento eclesial.",
      "Organizar los turnos, asignaciones y recursos del equipo de servicio de los domingos."
    ],
    illustration: "src/assets/illustrations/Administrar.png",
  },
  {
    id: 'presidir_liderazgo',
    name: "Presidir / Liderazgo",
    summary: "Capacidad de liderar con visión, inspirar la colaboración en equipo y formar a la siguiente generación de líderes.",
    description: "De líder, influye y dirige hermanos, se suma al de Administración. Están al frente fácilmente, guían con claridad, saben tomar decisiones con sabiduría, envisionan a otros, ayudan a desarrollar líderes. El que preside se centra en las personas, el de Administrar en recursos, procesos, planes.",
    questionCount: 4,
    maxRawScore: 12,
    minRawScore: 4,
    tips: [
      "Lidera con el ejemplo y mantén una actitud de servicio humilde al estilo de Jesús.",
      "Enfócate en identificar y desarrollar el liderazgo de las personas que te rodean.",
      "Comunica la visión del proyecto con claridad, paciencia y entusiasmo contagioso."
    ],
    examples: [
      "Guiar al equipo de líderes de un ministerio principal de la iglesia.",
      "Tomar decisiones estratégicas de crecimiento en momentos de transición o crisis del grupo.",
      "Envisionar e inspirar a la iglesia o a un grupo a sumarse a nuevas iniciativas misioneras."
    ],
    illustration: "src/assets/illustrations/Liderazgo.png",
  },
  {
    id: 'discernimiento',
    name: "Discernimiento",
    summary: "Capacidad para distinguir la verdad bíblica del error sutil, percibiendo el origen espiritual de enseñanzas y actitudes.",
    description: "Es una capacidad sobrenatural de distinguir el origen espiritual de un mensaje o enseñanza (si viene de Dios o del hombre o demonios). Es importante conocer la sana doctrina y no exponerse a cualquier enseñanza.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Evita volverte una persona desconfiada, hipercrítica o sospechosa con los demás.",
      "Contrasta siempre tus impresiones internas con la verdad objetiva de la Palabra de Dios.",
      "Busca edificar y alertar sabiamente y en privado, canalizando tus observaciones con el liderazgo."
    ],
    examples: [
      "Identificar errores doctrinales sutiles en libros, videos o prédicas populares que circulan.",
      "Ayudar a resolver un malentendido grupal identificando las verdaderas motivaciones en juego."
    ],
    illustration: "src/assets/illustrations/Discernimiento.png",
  },
  {
    id: 'ciencia_conocimiento',
    name: "Ciencia / Conocimiento",
    summary: "Pasión por profundizar en la sana doctrina, la investigación bíblica rigurosa y la comprensión de las Escrituras.",
    description: "Este don da a entender una verdad bíblica (el de sabiduría dice cómo aplicarla). El de Ciencia revela una verdad doctrinal, el de sabiduría nos muestra cómo actuar a la luz de esa verdad. Solo puede ser basado en la Biblia. Les gusta estudiar.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Estudia no solo para acumular información doctrinal, sino para edificar espiritualmente a la iglesia.",
      "Comunica las verdades bíblicas con palabras sencillas y prácticas que todos entiendan.",
      "Sé paciente con los hermanos que no estudian o asimilan la doctrina a tu mismo ritmo."
    ],
    examples: [
      "Investigar a fondo un tema teológico para aclarar dudas doctrinales en el grupo.",
      "Redactar guías de estudio teológico o materiales de lectura para grupos de conexión.",
      "Aclarar con paciencia y precisión un malentendido doctrinal en una conversación."
    ],
    illustration: "src/assets/illustrations/Conocimiento.png",
  },
  {
    id: 'sabiduria',
    name: "Sabiduría",
    summary: "Facilidad para orientar en la aplicación práctica de principios bíblicos ante dilemas y decisiones del diario vivir.",
    description: "Útil en consejería. Saber cómo aplicar los principios bíblicos en una situación difícil; es la sabiduría de Dios la que habla. No solo en consejería sino en pláticas formales con hermanos. Tiene que ser basado en la Biblia.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Escucha por completo la situación de la persona antes de ofrecer tu consejo.",
      "Busca la aplicación más simple, bíblica y directa para los problemas cotidianos de la vida.",
      "Mantén siempre una actitud humilde, recordando que la sabiduría proviene del Señor."
    ],
    examples: [
      "Encontrar una solución sensata y basada en principios bíblicos ante un conflicto entre ministerios.",
      "Aconsejar a un hermano sobre cómo tomar decisiones sabias sobre su futuro laboral o académico."
    ],
    illustration: "src/assets/illustrations/Sabiduria.png",
  },
  {
    id: 'ensenanza',
    name: "Enseñanza",
    summary: "Habilidad para estructurar y comunicar pasajes de la Biblia de forma clara, amena y accesible para todos.",
    description: "Capacidad sobrenatural para hacer entendibles enseñanzas de la Palabra de Dios. Puede ser al predicar, o al enseñar en un grupo pequeño, o por escrito. Aun temas no tan fáciles los presenta menos difíciles.",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Sé sumamente ordenado y estructurado al preparar tus clases o exposiciones.",
      "Busca analogías e ilustraciones de la vida cotidiana que hagan sencillo lo complejo.",
      "Modelar en tu propia conducta y vida diaria la verdad que estás enseñando a otros."
    ],
    examples: [
      "Explicar un pasaje bíblico complejo en un grupo de conexión de forma interactiva y legible.",
      "Dictar cursos sistemáticos de doctrina básica o clases de formación de la iglesia.",
      "Preparar lecciones didácticas adaptadas a diferentes edades o niveles de madurez espiritual."
    ],
    illustration: "src/assets/illustrations/Ensenanza.png",
  },
  {
    id: 'profecia',
    name: "Profecía",
    summary: "Comunicación directa de verdades bíblicas que confrontan con amor, edifican y mueven al cambio de conducta.",
    description: "Significa \"hablar un mensaje de Dios\" (no necesariamente sobre el futuro): sirve más para exhortar, consolar, edificar con la Palabra de Dios de una manera profunda y especial. Puede suceder al predicar, pero también al platicar de la Palabra sobre temas especiales.",
    questionCount: 4,
    maxRawScore: 12,
    minRawScore: 4,
    tips: [
      "Habla con valentía y convicción, pero con una profunda compasión y humedad por la iglesia.",
      "Cuida que tu mensaje confronte con la verdad de las Escrituras para edificar y no para herir destructivamente.",
      "Asegúrate de que tus palabras siempre apunten a centrar los corazones en Cristo Jesús."
    ],
    examples: [
      "Predicar un mensaje bíblico confrontador que inspire un arrepentimiento profundo en la congregación.",
      "Dar una palabra de exhortación oportuna y directa frente a la autocomplacencia espiritual del grupo."
    ],
    illustration: "src/assets/illustrations/Profecia.png",
  },
  {
    id: 'misionero_apostol',
    name: "Misionero / Apóstol",
    summary: "Impulso emprendedor para plantar nuevas comunidades de fe e iniciar ministerios donde antes no existían.",
    description: "Tiene la capacidad sobrenatural para empezar un grupo, o una iglesia, ya sea que tenga otros dones o se acompañe de hermanos con dones necesarios (Administrar, Pastor, Evangelismo, Enseñanza, Servir).",
    questionCount: 5,
    maxRawScore: 15,
    minRawScore: 5,
    tips: [
      "Rodéate de personas con dones complementarios de administración y pastoreo para sostener lo que inicias.",
      "Mantén una mentalidad flexible y adaptable a los cambios culturales y de entorno.",
      "No descuides tu vida espiritual personal en el afán por fundar nuevas iniciativas."
    ],
    examples: [
      "Coordinar y liderar el inicio de un nuevo grupo de estudio bíblico en una zona no alcanzada.",
      "Estructurar un equipo de pioneros para plantar o abrir una nueva iglesia local de la red."
    ],
    illustration: "src/assets/illustrations/Apostol.png",
  },
];
