# Contenido: Dones IGC (v2)

Transcrito de `Cuestionario de Dones Espirituales GZ.docx` y
`Descripcion Dones Espirituales.docx` (Gustavo Zepeda). Fuente de verdad
para `questions.js` y `gifts-data.js` de esta versión.

**Nota de contexto (línea del documento original):** "Es importante
recordar que el contexto de uso de los Dones Espirituales solo es en la
iglesia, usarlos con los hermanos."

## Diferencia estructural clave vs. `Dones_Original`

- **15 dones**, no 16 — este cuestionario no incluye "Hospitalidad".
- **Número de preguntas desigual por don** (4 a 7 según categoría, 76
  preguntas en total) — el motor de `Dones_Original` reparte preguntas a
  dones con una fórmula modular `(id-1) % 16` asumiendo bloques parejos.
  Ese cálculo **no aplica aquí tal cual**; hace falta mapear cada
  pregunta a su don explícitamente (arreglo `{ id, giftId, text }` en vez
  de índice implícito). Ver `REFERENCE.md` §2 para el detalle técnico.
- **Puntaje máximo distinto por don** (ej. Evangelismo: 7 preguntas × 5 =
  35 máx.; Presidir/Liderazgo: 4 preguntas × 5 = 20 máx.) → si se muestran
  puntajes crudos uno junto al otro, no son comparables. Pendiente de
  decidir con el usuario (normalizar a %, o mantener crudo). Ver entrevista
  UX en `BRIEF.md`.

## Los 15 dones, con su cantidad de preguntas y descripción

| # | Don (nombre en cuestionario) | # Preguntas |
|---|-------------------------------|:---:|
| 1 | Evangelismo | 7 |
| 2 | Dar | 5 |
| 3 | Fe | 5 |
| 4 | Servir | 5 |
| 5 | Misericordia | 5 |
| 6 | Exhortar | 5 |
| 7 | Pastor | 6 |
| 8 | Administrar | 5 |
| 9 | Presidir / Liderazgo | 4 |
| 10 | Discernimiento | 5 |
| 11 | Ciencia / Conocimiento | 5 |
| 12 | Sabiduría | 5 |
| 13 | Enseñanza | 5 |
| 14 | Profecía | 4 |
| 15 | Misionero / Apóstol | 5 |

**Total: 76 preguntas.**

### 1. Evangelismo
> Capacidad sobrenatural para dar el evangelio de manera sencilla y breve. Es el único don hacia incrédulos. No lo hace igual con todos, sabe cómo entrarles, no importa su temperamento. Unos lo hacen a grandes públicos, otros 1 a 1, unos por escrito, no necesitan de una actividad de la iglesia: lo pasan haciendo. También son buenos para enseñar a evangelizar.

1. ¿Te gusta evangelizar?
2. ¿Las personas entienden fácilmente cuando les dices que solo es por creer en Jesús y sin obras?
3. ¿Te es fácil hablar de salvación con desconocidos?
4. ¿Te es fácil hablar con tus conocidos acerca de la salvación?
5. ¿Muchas personas han creído por ti?
6. ¿Te es fácil enseñar o animar a otros a evangelizar?
7. ¿Das el Evangelio por escrito? ¿O solo oral?

### 2. Dar
> Capacidad sobrenatural de dar en lo económico, o provisión, medicinas, llena necesidades materiales. A veces en anonimato (no quieren llamar la atención). Pueden identificar necesidades. También apoyan la obra en general (donaciones). Lo hace con liberalidad (sin pesar sino con alegría, generoso, sin condiciones). No siempre es rico, pero dan (a veces absteniéndose de cosas). Promueven la generosidad en otros.

1. ¿Te es fácil dar/ ofrendar/ diezmar? (aunque no seas una persona de dinero)
2. ¿Identificas necesidades económicas o materiales en otros y las suples?
3. ¿Animas a otros a dar a hermanos, a la iglesia, a Proyectos?
4. ¿Miras que has mejorado en el área de Contabilidad/Administración que creíste?
5. ¿Te describe la frase "Dador alegre"?

### 3. Fe
> Es una confianza sobrenatural en Dios para enfrentar situaciones. Pueden estimular la fe de otros. Le creen a Dios. Se les ve en grupos de oración. Pablo confiaba que saldrían vivos de una tormenta en Hechos 27. Son para animar la fe de desanimados, a los que les cuesta creer…

1. ¿Te es fácil creerle a Dios en situaciones difíciles?
2. ¿Eres bueno animando a otros a confiar en Dios?
3. ¿Tu vida de oración es rica?
4. ¿Empiezas o eres parte de grupos de oración?
5. ¿Es frecuente que veas respuesta de tus oraciones?

### 4. Servir
> Capacidad sobrenatural de ver áreas de necesidad, y soluciona de manera práctica y con humildad, sirve sin buscar sobresalir. Ayuda en cosas prácticas de la iglesia: aseo, jalones, poner sillas, reparar, cargar. Ayuda a otros (mudanza, reparar cosas de la casa, carro), ayudar a enfermos. Sirven con gozo, no a la fuerza.

1. ¿Sirves a otros hermanos con alegría?
2. ¿Eres disponible cuando se necesita ayuda?
3. ¿No te es carga dar jalones, trabajar duro en el grupo o iglesia, ayudar a hermanos en sus casas?
4. ¿Sabes animar a otros a servir con buena actitud?
5. ¿Muchas veces sirves desde el anonimato?

### 5. Misericordia
> Parecido al de servir. Es mostrar compasión, aliviar sufrimiento de hermanos. Muy movidos a ayudar enfermos, afligidos, desanimados, solitarios, pobres, en duelo, etc. Pueden dar consejería de manera natural. Lo hacen sin quejarse, no por obligación, sin impaciencia, de corazón, se conectan con la gente. Reflejan la compasión de Cristo a otros. Dorcas es un ejemplo.

1. ¿Te compadeces del hermano que sufre?
2. ¿Visitas hermanos enfermos o que están de duelo, o en la cárcel?
3. ¿Buscas aliviar de maneras prácticas el dolor de hermanos sufriendo?
4. ¿Te entusiasman los Proyectos de ayudar a hermanos?
5. ¿Si alguien lo necesita lo llevas al médico, o le consigues comida, etc?

### 6. Exhortar
> De una manera sobrenatural pueden animar, consolar, exhortar, amonestar, obteniendo resultados. No son positivistas, ni psicólogos, ni motivadores, van más allá. Son buenos en consejería, la gente los busca de manera natural. Ayudan a hacer la voluntad de Dios, llevan a la obediencia sin forzar ni manipular. Consuelan al que sufre. Anima a crecer espiritualmente. Bernabé era así. Usa la Biblia.

1. ¿Te es fácil animar o aconsejar bíblicamente?
2. ¿Sabes amonestar sin herir?
3. ¿Sabes usar la Biblia para corregir, animar, exhortar?
4. ¿Te gusta la consejería bíblica?
5. ¿Te buscan para oír tu consejo u opinión en problemas?

### 7. Pastor
> Implica cuidar ovejas de manera sobrenatural: las alimenta, las cuida, está pendiente de ellas, inspira confianza, está pendiente del que no viene… no se refiere a la posición de pastor. Habla con los hermanos y se sienten cuidados. También les enseña la Palabra, les ayuda a crecer, personal.

1. ¿Eres bueno haciendo discípulos?
2. ¿Te mueve el ayudar a crecer espiritualmente?
3. ¿Te fijas cuando alguien no viene a la reunión, o anda afligido, y le buscas para cuidarlo?
4. ¿Ayudas a hermanos a no tomar malas decisiones, y lo haces con amor, paciencia, comprensión?
5. ¿No te carga guiar, cuidar hermanos?
6. ¿Visitas al desanimado (o te comunicas por teléfono), oras por él?

### 8. Administrar
> "Pilotear un barco", es bueno para organizar, planificar, llevar a cabo, dirige proyectos de la iglesia, ayudan a que funcionen los ministerios y las cosas. No domina, sino que inspira a cumplir la misión de la iglesia local, o el grupo.

1. ¿Te es fácil planear y organizar a hermanos?
2. ¿Eres bueno para crear un trabajo en equipo?
3. ¿Resuelves problemas prácticos de manera fácil?
4. ¿Sabes dirigir planes y recursos en la iglesia?
5. ¿Eres bueno y sabio para delegar?

### 9. Presidir / Liderazgo
> De líder, influye y dirige hermanos, se suma al de Administración. Dice la Biblia que lo haga con solicitud. Están al frente fácilmente, guían con claridad, no se confunden, saben tomar decisiones con sabiduría, envisionan a otros, ayudan a desarrollar líderes. Deben cuidarse de dominar. El que preside se centra en las personas, el de Administrar en recursos, procesos, planes. Ayudan a cumplir la voluntad de Dios.

1. ¿Te es fácil guiar e inspirar a otros para hacer un plan?
2. ¿Sabes desarrollar líderes?
3. ¿Al desarrollar un plan eres más orientado a las personas que al plan en sí?
4. ¿Tienes una visión clara y puedes envisionar a otros?

### 10. Discernimiento
> Es una capacidad sobrenatural de distinguir el origen espiritual de un mensaje o enseñanza (si viene de Dios o del hombre o demonios). Es importante por la abundancia en redes y libros de falsos profetas. No es algo psicológico… Todos tenemos que hacerlo, pero estos hermanos lo hacen sobrenatural. Es importante conocer la sana doctrina y no exponerse a cualquier enseñanza…

1. ¿Distingues si una enseñanza viene de Dios o no?
2. ¿Sabes escuchar poniendo atención a detalles importantes?
3. ¿Sabes identificar falsas doctrinas sutiles?
4. ¿Te piden consejo y distingues fácil entre la verdad y la mentira?
5. ¿Puedes ayudar en situaciones confusas?

### 11. Ciencia / Conocimiento
> O de Conocimiento. Este don da a entender una verdad bíblica (el de sabiduría dice cómo aplicarla). El de Ciencia revela una verdad doctrinal, el de sabiduría nos muestra cómo actuar a la luz de esa verdad. Solo puede ser basado en la Biblia. Les gusta estudiar.

1. ¿Te es fácil profundizar en temas de la sana doctrina?
2. ¿Puedes explicar temas no fáciles?
3. ¿Te sientes movido a que los hermanos sepan y entiendan la sana doctrina?
4. ¿Buscas comprender más y te lleva a estudiar más?
5. ¿Lees bastante?

### 12. Sabiduría
> Útil en consejería. Saber cómo aplicar los principios bíblicos en una situación difícil; es la sabiduría de Dios la que habla. No solo en consejería sino en pláticas formales con hermanos… algunos lo hacen por escrito. Tiene que ser basado en la Biblia.

1. ¿Te gusta aconsejar e identificas qué principios se necesita aplicar?
2. ¿Sabes ayudar a los hermanos a poner en práctica la Biblia?
3. ¿Los hermanos se sienten aliviados cuando les dices cómo poner en práctica principios?
4. ¿Te gusta enseñar sobre la vida práctica cristiana?
5. ¿Tu opinión genera respeto?

### 13. Enseñanza
> Capacidad sobrenatural para hacer entendibles enseñanzas de la Palabra de Dios. Puede ser al predicar, o al enseñar en un grupo pequeño, o por escrito. Aun temas no tan fáciles los presenta menos difíciles.

1. ¿Haces fácilmente entendibles temas bíblicos?
2. ¿Te caracteriza estudiar para explicar de manera entendible?
3. ¿Eres ordenado y claro al explicar un tema, un pasaje o versículo?
4. ¿Te caracteriza enseñar la sana doctrina?
5. ¿Te buscan los hermanos para que les expliques algo?

### 14. Profecía
> Significa "hablar un mensaje de Dios" (no necesariamente sobre el futuro): sirve más para exhortar, consolar, edificar con la Palabra de Dios de una manera profunda y especial. Puede suceder al predicar, pero también al platicar de la Palabra sobre temas especiales.

1. ¿Cuándo enseñas o hablas llegas al corazón?
2. ¿Eres convincente cuando enseñas y mueves a decisiones?
3. ¿Sabes usar la Palabra para edificar, consolar, exhortar cuando hablas a un grupo?
4. ¿Dios te ha usado para que vidas cambien profundamente?

### 15. Misionero / Apóstol
> Tiene la capacidad sobrenatural para empezar un grupo, o una iglesia, ya sea que tenga otros dones o se acompañe de hermanos con dones necesarios (Administrar, Pastor, Evangelismo, Enseñanza, Servir…).

1. ¿Eres bueno para empezar o desarrollar un grupo?
2. ¿Te encantaría ser parte de un equipo para iniciar una nueva iglesia?
3. ¿Te gusta leer o escuchar testimonio de misioneros?
4. ¿Quieres alcanzar lugares nuevos?
5. ¿Oras por grupos nuevos y por otras iglesias de GCLA?
