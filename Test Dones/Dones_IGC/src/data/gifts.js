/**
 * gifts.js
 * Catalogo de los 15 dones espirituales motivacionales de Dones IGC (v2).
 * Fuente: docs/CONTENIDO.md. tips/examples/illustration quedan null —
 * pendientes de contenido (ver docs/BRIEF.md) e ilustracion (Fase 2 — UI).
 *
 * El orden de este arreglo tambien es el criterio de desempate del
 * Score Engine cuando dos dones quedan exactamente iguales (ver
 * docs/SCORE_ENGINE.md).
 */

export const GIFTS_COUNT = 15;

export const gifts = [
  {
    id: 'evangelismo',
    name: "Evangelismo",
    description: "Capacidad sobrenatural para dar el evangelio de manera sencilla y breve. Es el único don hacia incrédulos. No lo hace igual con todos, sabe cómo entrarles, no importa su temperamento. Unos lo hacen a grandes públicos, otros 1 a 1, unos por escrito, no necesitan de una actividad de la iglesia: lo pasan haciendo. También son buenos para enseñar a evangelizar.",
    questionCount: 7,
    maxRawScore: 35,
    minRawScore: 7,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'dar',
    name: "Dar",
    description: "Capacidad sobrenatural de dar en lo económico, o provisión, medicinas, llena necesidades materiales. A veces en anonimato (no quieren llamar la atención). Pueden identificar necesidades. También apoyan la obra en general (donaciones). Lo hace con liberalidad (sin pesar sino con alegría, generoso, sin condiciones). No siempre es rico, pero dan (a veces absteniéndose de cosas). Promueven la generosidad en otros.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'fe',
    name: "Fe",
    description: "Es una confianza sobrenatural en Dios para enfrentar situaciones. Pueden estimular la fe de otros. Le creen a Dios. Se les ve en grupos de oración. Son para animar la fe de desanimados, a los que les cuesta creer.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'servir',
    name: "Servir",
    description: "Capacidad sobrenatural de ver áreas de necesidad, y soluciona de manera práctica y con humildad, sirve sin buscar sobresalir. Ayuda en cosas prácticas de la iglesia. Sirven con gozo, no a la fuerza.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'misericordia',
    name: "Misericordia",
    description: "Parecido al de servir. Es mostrar compasión, aliviar sufrimiento de hermanos. Muy movidos a ayudar enfermos, afligidos, desanimados, solitarios, pobres, en duelo, etc. Pueden dar consejería de manera natural. Lo hacen sin quejarse, de corazón, se conectan con la gente.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'exhortar',
    name: "Exhortar",
    description: "De una manera sobrenatural pueden animar, consolar, exhortar, amonestar, obteniendo resultados. Son buenos en consejería, la gente los busca de manera natural. Ayudan a hacer la voluntad de Dios, llevan a la obediencia sin forzar ni manipular. Usa la Biblia.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'pastor',
    name: "Pastor",
    description: "Implica cuidar ovejas de manera sobrenatural: las alimenta, las cuida, está pendiente de ellas, inspira confianza, está pendiente del que no viene. Habla con los hermanos y se sienten cuidados. También les enseña la Palabra, les ayuda a crecer, personal.",
    questionCount: 6,
    maxRawScore: 30,
    minRawScore: 6,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'administrar',
    name: "Administrar",
    description: "Es bueno para organizar, planificar, llevar a cabo, dirige proyectos de la iglesia, ayudan a que funcionen los ministerios y las cosas. No domina, sino que inspira a cumplir la misión de la iglesia local, o el grupo.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'presidir_liderazgo',
    name: "Presidir / Liderazgo",
    description: "De líder, influye y dirige hermanos, se suma al de Administración. Están al frente fácilmente, guían con claridad, saben tomar decisiones con sabiduría, envisionan a otros, ayudan a desarrollar líderes. El que preside se centra en las personas, el de Administrar en recursos, procesos, planes.",
    questionCount: 4,
    maxRawScore: 20,
    minRawScore: 4,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'discernimiento',
    name: "Discernimiento",
    description: "Es una capacidad sobrenatural de distinguir el origen espiritual de un mensaje o enseñanza (si viene de Dios o del hombre o demonios). Es importante conocer la sana doctrina y no exponerse a cualquier enseñanza.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'ciencia_conocimiento',
    name: "Ciencia / Conocimiento",
    description: "Este don da a entender una verdad bíblica (el de sabiduría dice cómo aplicarla). El de Ciencia revela una verdad doctrinal, el de sabiduría nos muestra cómo actuar a la luz de esa verdad. Solo puede ser basado en la Biblia. Les gusta estudiar.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'sabiduria',
    name: "Sabiduría",
    description: "Útil en consejería. Saber cómo aplicar los principios bíblicos en una situación difícil; es la sabiduría de Dios la que habla. No solo en consejería sino en pláticas formales con hermanos. Tiene que ser basado en la Biblia.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'ensenanza',
    name: "Enseñanza",
    description: "Capacidad sobrenatural para hacer entendibles enseñanzas de la Palabra de Dios. Puede ser al predicar, o al enseñar en un grupo pequeño, o por escrito. Aun temas no tan fáciles los presenta menos difíciles.",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'profecia',
    name: "Profecía",
    description: "Significa \"hablar un mensaje de Dios\" (no necesariamente sobre el futuro): sirve más para exhortar, consolar, edificar con la Palabra de Dios de una manera profunda y especial. Puede suceder al predicar, pero también al platicar de la Palabra sobre temas especiales.",
    questionCount: 4,
    maxRawScore: 20,
    minRawScore: 4,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
  {
    id: 'misionero_apostol',
    name: "Misionero / Apóstol",
    description: "Tiene la capacidad sobrenatural para empezar un grupo, o una iglesia, ya sea que tenga otros dones o se acompañe de hermanos con dones necesarios (Administrar, Pastor, Evangelismo, Enseñanza, Servir).",
    questionCount: 5,
    maxRawScore: 25,
    minRawScore: 5,
    tips: null, // pendiente — ver docs/BRIEF.md
    examples: null, // pendiente — ver docs/BRIEF.md
    illustration: null, // pendiente — Fase 2 (UI)
  },
];
