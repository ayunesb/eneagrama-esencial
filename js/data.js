/* Contenido de la plataforma — conserva cursos, precios, docentes y sesiones originales */
window.EE = window.EE || {};

EE.types = [
  {
    id: 1, name: "El Reformador", aka: "El Perfeccionista",
    center: "Instinto", emotion: "Ira",
    desire: "Ser bueno, íntegro y ético",
    fear: "Ser corrupto, defectuoso o malo",
    passion: "Ira / resentimiento", virtue: "Serenidad",
    fixation: "Resentimiento",
    wingLeft: 9, wingRight: 2,
    stress: 4, growth: 7,
    color: "#6B7C85",
    summary: "Busca integridad. Mejora lo que toca y se exige un estándar que casi nadie —ni él mismo— puede sostener.",
    body: "El Tipo 1 percibe el mundo como algo que podría ser mejor. Su brújula interna es un sentido agudo de lo correcto y lo incorrecto. En su mejor versión es ético, responsable y coherente. En automático se vuelve crítico, rígido y se enfada con lo imperfecto —empezando por sí mismo.",
    strengths: ["Principios claros", "Disciplina", "Mejora continua", "Confiable"],
    shadows: ["Autocrítica dura", "Rabia contenida", "Perfeccionismo", "Juicio moral"],
    growthTips: [
      "Separar 'correcto' de 'perfecto': lo bueno de verdad suele ser incompleto.",
      "Nombrar la ira antes de disfrazarla de 'solo estoy siendo objetivo'.",
      "Practicar descanso sin merecerlo. El valor no se gana a pulso todo el día."
    ],
    work: "Brilla en roles donde la calidad y la ética importan: auditoría, edición, medicina, diseño de procesos, activismo.",
    relations: "Ofrece lealtad y claridad. Le cuesta aceptar que el otro no viva según su mapa. Necesita que le recuerden que el afecto no se gana siendo irreprochable."
  },
  {
    id: 2, name: "El Ayudador", aka: "El Dador",
    center: "Emoción", emotion: "Orgullo",
    desire: "Ser amado y necesario",
    fear: "No ser querido o quedarse sin valor para los demás",
    passion: "Orgullo", virtue: "Humildad",
    fixation: "Halago",
    wingLeft: 1, wingRight: 3,
    stress: 8, growth: 4,
    color: "#C45C6A",
    summary: "Se define por lo que da. Lee necesidades ajenas antes que las propias y confunde utilidad con amor.",
    body: "El Tipo 2 se mueve hacia las personas. Anticipa, cuida, sostiene. En su mejor versión es generoso y cálido de verdad. En automático da para que lo necesiten, se ofende si no recíprocan y niega sus propias necesidades hasta que explotan.",
    strengths: ["Empatía práctica", "Generosidad", "Lectura emocional", "Hospitalidad"],
    shadows: ["Dar con factura oculta", "Dificultad para pedir", "Orgullo de ser indispensable", "Manipulación afectiva"],
    growthTips: [
      "Preguntar '¿esto lo pido o lo doy para que me deban?' antes de ofrecer.",
      "Practicar recibir sin devolver al instante.",
      "Escribir una lista de necesidades propias y honrar al menos una al día."
    ],
    work: "Educación, salud, hospitalidad, community, coaching. Cuidado con roles donde el límite es el producto.",
    relations: "Crea intimidad rápido. Puede sentir que 'si yo doy tanto, ¿por qué no me eligen igual?'. El trabajo es amar sin desaparecer."
  },
  {
    id: 3, name: "El Triunfador", aka: "El Adaptador",
    center: "Emoción", emotion: "Engaño / vanidad",
    desire: "Ser valioso y admirable",
    fear: "No valer nada sin logros",
    passion: "Engaño", virtue: "Veracidad",
    fixation: "Vanidad",
    wingLeft: 2, wingRight: 4,
    stress: 9, growth: 6,
    color: "#C9A227",
    summary: "Convierte la vida en proyecto. Excelente ejecutando; el riesgo es confundir la imagen de éxito con quién es.",
    body: "El Tipo 3 lee qué se valora en cada sala y se adapta para brillar. En su mejor versión es eficaz, inspirador y concreto. En automático se desconecta del sentir, compite incluso con quien ama y no sabe quién es cuando no hay meta.",
    strengths: ["Ejecución", "Energía", "Adaptabilidad", "Orientación a resultados"],
    shadows: ["Imagen por encima de verdad", "Workaholism", "Emociones pospuestas", "Miedo al fracaso visible"],
    growthTips: [
      "Decir una verdad que no mejore la imagen, una vez al día.",
      "Agendar vacío: tiempo sin optimizar.",
      "Preguntar '¿qué siento?' antes de '¿qué logro?'."
    ],
    work: "Emprendimiento, ventas, dirección, comunicación, deporte de alto rendimiento.",
    relations: "Puede amar a través del logro compartido. La pareja necesita presencia, no solo un plan de vida impresionante."
  },
  {
    id: 4, name: "El Individualista", aka: "El Romántico",
    center: "Emoción", emotion: "Envidia",
    desire: "Ser único y auténtico",
    fear: "No tener identidad ni significancia",
    passion: "Envidia", virtue: "Equanimidad",
    fixation: "Melancolía",
    wingLeft: 3, wingRight: 5,
    stress: 2, growth: 1,
    color: "#7B4B94",
    summary: "Vive en la intensidad de lo que falta. Crea belleza y profundidad; a veces se queda atrapado en la herida.",
    body: "El Tipo 4 busca lo auténtico y lo singular. Siente que hay una pieza que a los demás les dieron y a él no. En su mejor versión es original, honesto y capaz de sostener matices. En automático dramatiza, se compara y se enamora de lo ausente.",
    strengths: ["Sensibilidad estética", "Honestidad emocional", "Creatividad", "Empatía con el dolor"],
    shadows: ["Envidia", "Identidad = sufrimiento", "Idealizar lo que no está", "Retraimiento orgulloso"],
    growthTips: [
      "Hacer lo ordinario con presencia: la identidad no necesita ser excepcional todo el rato.",
      "Cuando aparezca 'me falta', nombrar también lo que sí hay.",
      "Crear con disciplina, no solo cuando el ánimo acompaña."
    ],
    work: "Arte, escritura, terapia, diseño, marcas con alma.",
    relations: "Quiere ser visto en lo íntimo. Puede probar al otro con distancia o intensidad. Necesita constancia más que grandilocuencia."
  },
  {
    id: 5, name: "El Investigador", aka: "El Observador",
    center: "Mente", emotion: "Avaricia (de energía)",
    desire: "Ser competente y entender",
    fear: "Ser inútil, invadido o sin recursos",
    passion: "Avaricia", virtue: "Desapego / no-apego generoso",
    fixation: "Tacañería (de sí)",
    wingLeft: 4, wingRight: 6,
    stress: 7, growth: 8,
    color: "#3D6B6B",
    summary: "Protege su energía y su mente. Observa antes de entrar. Sabe mucho; a veces vive poco de lo que sabe.",
    body: "El Tipo 5 siente que el mundo pide más de lo que hay dentro. Se retira para pensar, especializarse, conservar. En su mejor versión es lúcido, original e independiente. En automático se aísla, acumula conocimiento sin encarnarlo y trata las emociones como datos incómodos.",
    strengths: ["Análisis", "Autonomía", "Concentración", "Límites claros"],
    shadows: ["Aislamiento", "Tacañería de tiempo y afecto", "Vivir en la cabeza", "Miedo a la demanda"],
    growthTips: [
      "Entregar algo incompleto. La competencia se prueba en el mundo, no solo en el cuaderno.",
      "Programar contacto humano como se programa estudio.",
      "Notar el cuerpo: hambre, frío, cansancio. El 5 se olvida de que tiene uno."
    ],
    work: "Investigación, ingeniería, escritura técnica, estrategia, oficios solitarios de alta especialización.",
    relations: "Quiere intimidad con espacio. El otro puede leer distancia; él lee invasión. Pactar tiempos de soledad evita el corte."
  },
  {
    id: 6, name: "El Leal", aka: "El Escéptico",
    center: "Mente", emotion: "Miedo",
    desire: "Tener seguridad y apoyo",
    fear: "Quedarse sin guía ni respaldo",
    passion: "Miedo", virtue: "Valor",
    fixation: "Cobardía / duda",
    wingLeft: 5, wingRight: 7,
    stress: 3, growth: 9,
    color: "#8B7355",
    summary: "Anticipa lo que puede fallar. Leal hasta el hueso cuando confía; vigilante cuando duda. El coraje suyo no es ausencia de miedo: es actuar con él.",
    body: "El Tipo 6 escanea amenazas. Busca sistemas, personas o ideas que den suelo. En su mejor versión es responsable, colaborativo y valiente. En automático duda de sí, prueba a la autoridad, y oscila entre sumisión y rebelión (fóbico / contrafóbico).",
    strengths: ["Lealtad", "Pensamiento de riesgo", "Compromiso", "Olfato para inconsistencias"],
    shadows: ["Ansiedad anticipatoria", "Procrastinar por 'y si…'", "Proyectar desconfianza", "Buscar un salvador"],
    growthTips: [
      "Separar hecho de escenario. El 6 vive en futuros que aún no existen.",
      "Confiar una decisión pequeña sin consultar a tres personas.",
      "El cuerpo en el presente (pies, respiración) baja el radar mejor que otro argumento."
    ],
    work: "Operaciones, legal, seguridad, equipos, análisis de riesgo, comunidad.",
    relations: "Prueba si el otro se queda. Puede ser el compañero más fiable o el más inquisidor. Necesita promesas que se cumplan, no discursos."
  },
  {
    id: 7, name: "El Entusiasta", aka: "El Epicúreo",
    center: "Mente", emotion: "Gula (de experiencia)",
    desire: "Ser feliz y satisfecho",
    fear: "Quedarse atrapado en el dolor o el aburrimiento",
    passion: "Gula", virtue: "Sobriedad",
    fixation: "Planning / huida",
    wingLeft: 6, wingRight: 8,
    stress: 1, growth: 5,
    color: "#5A8F4D",
    summary: "Abre opciones. Enciende habitaciones. Huye del límite, del tedio y de la pena como si fueran jaulas.",
    body: "El Tipo 7 reencuadra lo pesado en posibilidad. En su mejor versión es alegre, visionario y resiliente. En automático satura la agenda, evita el duelo y confunde libertad con no comprometerse.",
    strengths: ["Optimismo", "Ideación", "Versatilidad", "Humor"],
    shadows: ["Huida del dolor", "Exceso", "Compromisos a medias", "FOMO crónico"],
    growthTips: [
      "Quedarse 10 minutos más en lo incómodo antes de cambiar de tema o de plan.",
      "Elegir menos. La libertad del 7 maduro es profundidad, no menú infinito.",
      "Una práctica de silencio o de foco (el movimiento al 5) lo aterriza."
    ],
    work: "Innovación, viajes, medios, facilitación, emprendimientos múltiples.",
    relations: "Trae aire y juego. Puede asustarse cuando la relación pide constancia gris. Amar es también estar los martes aburridos."
  },
  {
    id: 8, name: "El Desafiador", aka: "El Protector",
    center: "Instinto", emotion: "Lujuria (intensidad)",
    desire: "Protegerse y dirigir su vida",
    fear: "Ser controlado, vulnerable o traicionado",
    passion: "Lujuria / exceso", virtue: "Inocencia",
    fixation: "Venganza",
    wingLeft: 7, wingRight: 9,
    stress: 5, growth: 2,
    color: "#8B2E2E",
    summary: "Va de frente. Protege lo suyo y a los suyos. Confunde vulnerabilidad con peligro y justicia con fuerza.",
    body: "El Tipo 8 no espera permiso. Toma espacio, decide, enfrenta. En su mejor versión es magnánimo, directo y protector. En automático intimida, no pide, y parte el mundo en fuertes y débiles —y se niega a ser de los segundos.",
    strengths: ["Liderazgo natural", "Honestidad cruda", "Protección", "Energía"],
    shadows: ["Control", "Negar la ternura", "Exceso", "Todo o nada"],
    growthTips: [
      "Revelar una necesidad sin convertirla en exigencia.",
      "Bajar el volumen un 20%: la verdad no necesita gritarse para ser verdad.",
      "El movimiento al 2: cuidar sin poseer."
    ],
    work: "Dirección, emprendimiento, justicia, oficios de alto impacto, negociación.",
    relations: "Ama con lealtad feroz. Puede aplastar sin querer. El otro necesita poder decir 'para' y que el 8 no lo tome como ataque."
  },
  {
    id: 9, name: "El Pacificador", aka: "El Mediador",
    center: "Instinto", emotion: "Pereza (de sí)",
    desire: "Paz interior y armonía",
    fear: "Conflicto, separación, no importar",
    passion: "Pereza / inercia", virtue: "Acción justa",
    fixation: "Olvido de sí",
    wingLeft: 8, wingRight: 1,
    stress: 6, growth: 3,
    color: "#7A8F3D",
    summary: "Une. Suaviza. Se fusiona con el entorno hasta olvidar qué quiere. La paz que compra callándose le sale cara.",
    body: "El Tipo 9 siente el conflicto como amenaza al vínculo. En su mejor versión es estable, inclusivo y sabio. En automático pospone, se adormece con rutinas y dice que 'da igual' cuando sí importa.",
    strengths: ["Mediación", "Paciencia", "Visión de conjunto", "Presencia calmada"],
    shadows: ["Inercia", "Autoanulación", "Rabia pasiva", "Dificultad para priorizarse"],
    growthTips: [
      "Decidir una cosa pequeña al día sin consultar el clima de la habitación.",
      "Notar la anestesia: series, comida, siestas que no son cansancio.",
      "El movimiento al 3: poner fecha y enseñar el trabajo."
    ],
    work: "Facilitación, HR, terapia, oficios artesanales, equipos que necesitan cohesión.",
    relations: "Es fácil convivir con un 9… hasta que el resentimiento acumulado sale por la puerta de atrás. Necesita que le pregunten —y que él responda— qué quiere de verdad."
  }
];

EE.centers = [
  { name: "Instinto (cuerpo)", types: [8, 9, 1], text: "Rabia y control del espacio. Gut, límites, acción." },
  { name: "Emoción (corazón)", types: [2, 3, 4], text: "Imagen y conexión. Vergüenza, valor, identidad sentida." },
  { name: "Mente (cabeza)", types: [5, 6, 7], text: "Miedo y estrategia. Anticipar, entender, planear." }
];

EE.instincts = [
  { id: "sp", name: "Conservación (sp)", text: "Hogar, cuerpo, recursos, rituales. '¿Estoy a salvo y abastecido?'" },
  { id: "so", name: "Social (so)", text: "Grupo, lugar, contribución. '¿Dónde encajo y qué rol ocupo?'" },
  { id: "sx", name: "Sexual / uno a uno (sx)", text: "Intensidad, química, fusión. '¿Quién me enciende y a quién elijo?'" }
];

EE.instructors = {
  "Lupe Naredo": {
    role: "Coach y docente · ENNEA",
    bio: "Eneatipo 4w5. Coach/teacher certificada por EANT, UAB y Oxford. Instructora de yoga RYT 200+. Autora. Más de una década estudiando y enseñando eneagrama. En Instagram: @lupe_naredo. Hashtag #meconozcometransformo."
  }
};

EE.courses = [
  {
    id: "fundamentos",
    level: "Principiante",
    title: "Fundamentos del Eneagrama",
    instructor: "Lupe Naredo",
    price: 2499,
    seats: 8,
    weeks: 6,
    hours: "12 h en vivo + material",
    rating: 4.7,
    tagline: "El mapa completo para quien empieza: 9 tipos, alas, flechas y cómo no confundirte de número.",
    includes: [
      "6 sesiones en vivo de 2 horas",
      "Fichas de los 9 tipos y centros",
      "Ejercicio guiado de confirmación de tipo",
      "Foro del grupo y grabaciones 90 días",
      "Certificado de participación"
    ],
    syllabus: [
      "Origen del sistema y para qué sirve (y para qué no)",
      "Los tres centros: cuerpo, corazón, mente",
      "Retrato de los tipos 8-9-1",
      "Retrato de los tipos 2-3-4",
      "Retrato de los tipos 5-6-7",
      "Alas, flechas y primeros pasos de crecimiento"
    ]
  },
  {
    id: "transformacion-1-3",
    level: "Intermedio",
    title: "Transformación Personal Tipo 1–3",
    instructor: "Lupe Naredo",
    price: 3299,
    seats: 3,
    weeks: 8,
    hours: "16 h + prácticas",
    rating: 4.8,
    tagline: "Trabajo profundo con el centro del corazón y el instinto del 1: ética, imagen y el deseo de ser visto.",
    includes: [
      "8 sesiones en vivo",
      "Prácticas semanales de cuerpo y registro",
      "Dinámicas de ala y flecha para 1, 2 y 3",
      "Una tutoría breve de 20 min",
      "Material de integración"
    ],
    syllabus: [
      "Tipo 1: ira santa vs. resentimiento",
      "Tipo 2: dar sin factura",
      "Tipo 3: quitarse la máscara del logro",
      "Relación 1-2-3 entre sí",
      "Movimientos de estrés y crecimiento",
      "Diseño de un hábito de 30 días"
    ]
  },
  {
    id: "maestria",
    level: "Avanzado",
    title: "Maestría del Eneagrama",
    instructor: "Lupe Naredo",
    price: 5499,
    seats: 11,
    weeks: 12,
    hours: "24 h + supervisión",
    rating: 4.8,
    tagline: "Programa avanzado para profundizar en las alas, flechas y subtipos del Eneagrama.",
    includes: [
      "12 semanas de sesión semanal",
      "Módulo de 27 subtipos (sp / so / sx)",
      "Niveles de desarrollo (salud)",
      "Supervisión de un caso o de tu propio proceso",
      "Certificado de finalización de Maestría"
    ],
    syllabus: [
      "Revisión rigurosa de los 9",
      "Alas dominantes y secundarias",
      "Flechas como camino, no como destino",
      "Los 27 subtipos de Naranjo",
      "Tríadas de harma y hornevianas",
      "Cómo acompañar a otros sin diagnosticar"
    ]
  }
];

EE.sessions = [
  {
    id: "s1", kind: "Individual",
    date: "Miércoles, 5 de noviembre",
    time: "10:00 (60 min)",
    instructor: "Lupe Naredo",
    price: 899,
    text: "Sesión individual personalizada para explorar tu tipo de eneagrama en profundidad."
  },
  {
    id: "s2", kind: "Individual",
    date: "Jueves, 13 de noviembre",
    time: "18:00 (60 min)",
    instructor: "Lupe Naredo",
    price: 899,
    text: "Lectura de resultado del test, contraste con biografía y primer plan de crecimiento."
  },
  {
    id: "s3", kind: "Grupal",
    date: "Sábado, 15 de noviembre",
    time: "11:00 (120 min)",
    instructor: "Lupe Naredo",
    price: 549,
    text: "Laboratorio grupal: instintos y cómo se ven en la vida cotidiana. Cupo 12."
  },
  {
    id: "s4", kind: "Grupal",
    date: "Martes, 25 de noviembre",
    time: "19:00 (90 min)",
    instructor: "Lupe Naredo",
    price: 449,
    text: "Círculo de tipos: cada quien habla desde su número. Práctica de escucha y límites."
  }
];

EE.events = [
  {
    id: "e1", kind: "Conferencia",
    title: "Conferencia: Eneagrama y Relaciones",
    place: "Online",
    price: 299,
    seats: 50,
    date: "8 de noviembre, 19:00 (CDMX)",
    text: "Cómo se enganchan las flechas en pareja y en equipos. 90 minutos + preguntas."
  },
  {
    id: "e2", kind: "Retiro",
    title: "Retiro de Eneagrama en la Naturaleza",
    place: "Valle de Bravo",
    price: 5999,
    seats: 4,
    date: "12–15 de diciembre",
    text: "Tres noches. Meditación, tipo e instinto, silencio y fogata. Incluye hospedaje y comida."
  }
];

EE.library = [
  {
    id: "lib-gratis",
    kind: "PDF",
    title: "Mapa de bolsillo de los 9 tipos",
    text: "Una página por tipo: miedo, deseo, ala y una pregunta para confirmar. Para empezar hoy.",
    meta: "18 páginas",
    price: 0
  },
  {
    id: "lib-guia",
    kind: "PDF",
    title: "Guía Completa del Eneagrama",
    text: "Manual sobre los 9 tipos, alas, flechas y subtipos. Incluye ejercicios prácticos.",
    meta: "150 páginas",
    price: 299
  },
  {
    id: "lib-audio",
    kind: "Audio",
    title: "Meditaciones por Tipo",
    text: "9 meditaciones guiadas personalizadas para cada tipo de eneagrama.",
    meta: "2 h 15 min",
    price: 399
  },
  {
    id: "lib-ebook",
    kind: "eBook",
    title: "El Camino de la Transformación",
    text: "El libro de Lupe Naredo: introducción clara a los 9 eneatipos, para quien empieza y para quien ya lleva camino y quiere consultar.",
    meta: "220 páginas",
    price: 499
  }
];

EE.likert = [
  { t: 1, q: "Me exijo un estándar alto y me molesta dejar las cosas 'más o menos'." },
  { t: 1, q: "Noto enseguida lo que está mal o incompleto, en mí y en lo demás." },
  { t: 1, q: "Me cuesta descansar si siento que todavía hay algo que corregir." },
  { t: 1, q: "Cuando alguien hace las cosas a la ligera, se me tensa el cuerpo." },
  { t: 2, q: "Me doy cuenta rápido de lo que el otro necesita, a veces antes que él." },
  { t: 2, q: "Me siento valioso cuando alguien depende de mi ayuda." },
  { t: 2, q: "Me cuesta pedir. Prefiero dar y esperar que lo noten." },
  { t: 2, q: "Si ayudo mucho y no hay reciprocidad, me duele más de lo que digo." },
  { t: 3, q: "Organizo mi día en torno a metas visibles y resultados." },
  { t: 3, q: "Sé adaptarme al tono de cada ambiente para que las cosas salgan." },
  { t: 3, q: "Si no produzco, siento que mi valor baja." },
  { t: 3, q: "Pospongo lo que siento si interfiere con el rendimiento." },
  { t: 4, q: "Necesito que lo que hago tenga un sello mío, no genérico." },
  { t: 4, q: "A menudo siento que a los demás les dieron algo que a mí me falta." },
  { t: 4, q: "Las emociones intensas —melancolía incluida— me parecen más verdaderas que lo plano." },
  { t: 4, q: "Me retiro cuando siento que no me ven como soy." },
  { t: 5, q: "Protejo mi tiempo y mi energía: la gente cansa si no hay margen." },
  { t: 5, q: "Prefiero observar y entender antes de meterme." },
  { t: 5, q: "Acumulo información porque me da suelo." },
  { t: 5, q: "Las demandas emocionales repentinas me hacen querer desaparecer." },
  { t: 6, q: "Antes de decidir, recorro lo que podría salir mal." },
  { t: 6, q: "Soy leal con las personas y los sistemas en los que confío." },
  { t: 6, q: "Dudo de mi propio criterio y busco una segunda (o tercera) voz." },
  { t: 6, q: "Detecto contradicciones e inconsistencias con facilidad." },
  { t: 7, q: "Cuando algo se pone pesado, mi mente ya está en la siguiente opción." },
  { t: 7, q: "Me anima tener varios planes y poco encierro." },
  { t: 7, q: "Reencuadro lo difícil con humor o con una idea nueva." },
  { t: 7, q: "Me resisto a límites, rutinas largas y conversaciones que no se mueven." },
  { t: 8, q: "Voy directo. Prefiero la verdad incómoda a rodeos." },
  { t: 8, q: "Si siento injusticia o control ajeno, empujo." },
  { t: 8, q: "Me cuesta mostrar vulnerabilidad; la leo como riesgo." },
  { t: 8, q: "Tomo las riendas cuando nadie más lo hace." },
  { t: 9, q: "Cedo en lo mío para que no haya roce." },
  { t: 9, q: "A veces no sé qué quiero hasta que el ambiente se calma." },
  { t: 9, q: "Pospongo decisiones y me distraigo con lo fácil." },
  { t: 9, q: "El conflicto me agota; busco el camino que suavice." }
];

EE.situational = [
  {
    q: "¿Cómo sueles reaccionar cuando las cosas no salen según lo planeado?",
    opts: [
      { t: 1, a: "Me frustro y busco corregir lo que está mal" },
      { t: 2, a: "Me adapto rápidamente para ayudar a otros" },
      { t: 3, a: "Busco alternativas para lograr mi objetivo" },
      { t: 4, a: "Me retiro a reflexionar sobre lo sucedido" },
      { t: 5, a: "Analizo qué salió mal para entenderlo mejor" },
      { t: 6, a: "Me preocupo por las posibles consecuencias" },
      { t: 7, a: "Cambio de planes y busco algo más divertido" },
      { t: 8, a: "Tomo el control de la situación inmediatamente" },
      { t: 9, a: "Acepto lo que pasó y busco mantener la calma" }
    ]
  },
  {
    q: "Cuando alguien cercano está mal, lo primero que haces suele ser…",
    opts: [
      { t: 1, a: "Señalar con tacto qué podría hacerse mejor" },
      { t: 2, a: "Acercarme y preguntar en qué ayudo" },
      { t: 3, a: "Proponer un plan concreto para resolverlo" },
      { t: 4, a: "Acompañar el sentimiento sin pretender arreglarlo" },
      { t: 5, a: "Dar espacio y, si me lo piden, un marco para entenderlo" },
      { t: 6, a: "Anticipar riesgos y ofrecer respaldo práctico" },
      { t: 7, a: "Intentar levantar el ánimo y cambiar de ambiente" },
      { t: 8, a: "Proteger y, si hace falta, confrontar la causa" },
      { t: 9, a: "Estar presente, sin presionar, hasta que pase" }
    ]
  },
  {
    q: "En el trabajo, te reconocen más por…",
    opts: [
      { t: 1, a: "La calidad y el criterio ético" },
      { t: 2, a: "El cuidado del equipo y de las personas" },
      { t: 3, a: "Cumplir y verse bien haciéndolo" },
      { t: 4, a: "Un enfoque original, con sensibilidad" },
      { t: 5, a: "La profundidad con la que entiendes el tema" },
      { t: 6, a: "La lealtad y prever lo que puede fallar" },
      { t: 7, a: "Las ideas y la energía cuando hay que inventar" },
      { t: 8, a: "Decidir y no dejar que se estanque" },
      { t: 9, a: "Mediar y mantener el clima usable" }
    ]
  },
  {
    q: "Lo que más te cuesta admitir de ti es…",
    opts: [
      { t: 1, a: "La rabia que cargo cuando el mundo no cumple mi norma" },
      { t: 2, a: "Que doy para que me elijan" },
      { t: 3, a: "Que a veces no sé quién soy sin un logro" },
      { t: 4, a: "Que me identifico con lo que me falta" },
      { t: 5, a: "Que me escondo para no gastarme" },
      { t: 6, a: "Que la duda me gobierna más de lo que digo" },
      { t: 7, a: "Que huyo del dolor con opciones nuevas" },
      { t: 8, a: "Que la dureza me protege de sentirme pequeño" },
      { t: 9, a: "Que digo 'da igual' cuando sí me importa" }
    ]
  }
];

EE.faq = [
  { q: "¿Este test es 'oficial'?", a: "No existe un único test oficial del eneagrama. El RHETI del Enneagram Institute es el más citado en la línea Riso-Hudson. El nuestro es un instrumento de orientación (36 afirmaciones + 4 situaciones) para acotar tipo y ala. La confirmación se hace leyendo los nueve retratos." },
  { q: "¿Cuánto tarda y qué obtengo?", a: "Entre 12 y 18 minutos. Al terminar ves la puntuación de los nueve tipos, el tipo probable, el ala dominante, las flechas de estrés y crecimiento, y una gía breve. Puedes guardar el resultado en este navegador." },
  { q: "¿Y si salgo empatado entre dos números?", a: "Es habitual. Lee ambos retratos fijándote en el miedo y el deseo de fondo, no en el comportamiento. El tipo es la motivación, no la profesión ni el humor del mes." },
  { q: "¿Trabajan subtipos?", a: "Sí. En Fundamentos se presentan. En Maestría se trabajan los 27 (conservación, social y sexual × 9 tipos), en la línea que popularizó Claudio Naranjo." },
  { q: "¿Los cursos incluyen factura?", a: "Sí, en MXN. Tras inscribirte desde la ficha del curso te contactamos para pago y datos fiscales. La reserva de sesión se confirma por correo." },
  { q: "¿Puedo cancelar?", a: "Cursos: 80% hasta 7 días antes del inicio; después se puede posponer una edición. Sesiones individuales: hasta 24 h antes sin costo. El retiro de Valle de Bravo tiene política propia en la ficha." }
];

EE.testimonials = [
  { name: "Comunidad ENNEA", type: "Desde Instagram", text: "Lupe no te encasilla en un número. Te enseña a mirar el patrón —y a no tomártelo como destino." },
  { name: "Alumna de Fundamentos", type: "Tipo 2", text: "Por fin distinguí ala y eneatipo. El tono es el de sus reels: claro, sin humo, con trabajo de verdad." },
  { name: "Lectura del libro", type: "Quien empieza", text: "Si ya conoces el mapa es gía de consulta. Si llegas nueva, explica lo que necesitas de los 9 sin enredarte." }
];
