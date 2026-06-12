export const site = {
  name: "ENDO Wellness Club",
  domain: "endowellnessclub.es",
  email: "info@endowellnessclub.es",
  address: "C/ Trinquet 4, 46117 Bétera (Valencia)",
  mapsQuery: "C/ Trinquet 4, 46117 Bétera, Valencia, España",
  // Pendientes de alta — se mostrarán cuando existan
  whatsapp: "", // ej. "34600000000" (sin "+")
  phone: "",
  instagram: "",
};

export function whatsappHref() {
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}`
    : `mailto:${site.email}`;
}

export const departmentEmails = [
  { area: "Información general", email: "info@endowellnessclub.es" },
  { area: "Entrenamiento", email: "entrenamiento@endowellnessclub.es" },
  { area: "Nutrición", email: "nutricion@endowellnessclub.es" },
  { area: "Fisioterapia", email: "fisioterapia@endowellnessclub.es" },
  { area: "Psicología", email: "psicologia@endowellnessclub.es" },
];

/* ---------------------------------- Equipo --------------------------------- */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  quote: string;
  license?: string;
  photo: string;
  bio: string[];
};

export const team: TeamMember[] = [
  {
    slug: "roberto",
    name: "Roberto",
    role: "Nutrición y entrenamiento",
    quote: "Ciencia y experiencia al servicio de tu rendimiento integral",
    license: "N.º colegiado: CV02045",
    photo: "/team/roberto.jpg",
    bio: [
      "El enfoque profesional de Roberto combina la ciencia de la alimentación con el rendimiento físico para ofrecer un servicio integral. Es Graduado en Nutrición Humana y Dietética, así como Graduado en Ciencias de la Actividad Física y el Deporte.",
      "Su especialización técnica incluye el Máster del entrenamiento de fuerza en el entrenamiento personal y la acreditación como Experto universitario en nutrición y suplementación deportiva en el alto rendimiento.",
      "Además de su labor en consulta, desarrolla su faceta académica como docente universitario de Nutrición Deportiva en la Universidad Católica de Valencia.",
      "Avalan su trayectoria más de 10 años de experiencia en consulta, ayudando a personas a alcanzar su máximo potencial al frente de la marca Endo System Training con todo tipo de casos: desde deportistas profesionales hasta mejora de patologías intestinales, pasando por recomposiciones corporales y rendimiento en oposiciones.",
    ],
  },
  {
    slug: "andres",
    name: "Andrés",
    role: "Fisioterapia",
    quote: "La fisioterapia que va más allá de la lesión",
    license: "N.º colegiado: 8466",
    photo: "/team/andres.jpg",
    bio: [
      "Andrés es fisioterapeuta y graduado en Ciencias de la Actividad Física y el Deporte. Completó su formación como Experto Universitario en Fisioterapia Invasiva, con especialización en ecografía patológica y en movimientos olímpicos. Porque cuanto más entiende el movimiento, mejor puede ayudarte a recuperarlo.",
      "Esa doble formación no es un detalle técnico: es lo que le permite ver al paciente completo. No solo la lesión, sino la persona que hay detrás y lo que quiere volver a hacer.",
      "Su objetivo no es solo que te duela menos. Es que puedas volver a lo que importa: entrenar, moverte sin miedo, jugar con tus hijos, o simplemente sentirte bien en tu propio cuerpo.",
      "Antes de cualquier técnica, escucha. Cada persona llega con una historia diferente, y Andrés necesita entender bien la tuya antes de intervenir.",
      "Trabaja con evidencia científica actualizada, pero también con algo que no aparece en los estudios: sentarse contigo, explicarte qué está pasando y por qué se hace lo que se hace. Para que no dependas de la consulta más de lo necesario — y seas parte activa de tu recuperación.",
      "Puede ayudarte con lesiones del día a día, dolor relacionado con el deporte, readaptación deportiva, pacientes neurológicos — ictus, Parkinson — y cualquier caso donde el movimiento y la calidad de vida estén comprometidos.",
      "Utiliza ecografía para afinar el diagnóstico y técnicas invasivas cuando realmente están indicadas. No como rutina, sino cuando tiene sentido para ti.",
      "Lo que diferencia a Andrés, en el fondo, es esto: cada persona llega con un punto de partida distinto. Su trabajo es adaptarse a ese punto, acompañarte sin prisas innecesarias y avanzar contigo hacia un objetivo claro. Sin dependencias. Con confianza. A tu ritmo.",
    ],
  },
  {
    slug: "carlos",
    name: "Carlos",
    role: "Entrenamiento y readaptación",
    quote: "Rendimiento, recuperación y bienestar",
    photo: "/team/carlos.jpg",
    bio: [
      "Carlos es graduado en Ciencias de la Actividad Física y del Deporte, además de graduado en Fisioterapia, una combinación que le permite entender el cuerpo desde una perspectiva completa: movimiento, rendimiento y recuperación.",
      "Ha trabajado en el campo del entrenamiento y la readaptación de lesiones, ayudando a personas a mejorar su estado físico, recuperarse y volver a sentirse seguras en su propio cuerpo. Su objetivo no es solo que avances, sino que lo hagas con una base sólida y duradera.",
      "Además, su trayectoria en el ámbito deportivo le ha enseñado la importancia de la disciplina, la constancia y la toma de decisiones en momentos clave, valores que aplica cada día en su forma de trabajar.",
      "Cree en un enfoque donde el trabajo bien hecho y el buen ambiente van de la mano. Por eso, sus sesiones combinan cercanía, motivación y profesionalidad, adaptándose a cada persona y a sus necesidades, independientemente de su punto de partida.",
      "Este espacio está pensado para todos: para quien quiere empezar a cuidarse, para quien busca recuperarse, y para quien quiere dar un paso más en su rendimiento. Porque al final, no se trata solo de entrenar, sino de construir una mejor versión de ti mismo, paso a paso.",
    ],
  },
  {
    slug: "teddy",
    name: "Teddy",
    role: "Coordinación y atención al cliente",
    quote: "Coordinación y experiencia para el bienestar del socio",
    photo: "/team/teddy.jpg",
    bio: [
      "El enfoque profesional de Teddy se centra en la gestión operativa y la optimización de la experiencia del cliente dentro del centro, asegurando que cada área funcione de forma coordinada y eficiente.",
      "Su labor abarca la coordinación del día a día, la organización de procesos internos y la supervisión del funcionamiento general del espacio, garantizando un entorno fluido tanto para el equipo como para los clientes.",
      "Como responsable de recepción y atención al cliente, actúa como primer punto de contacto, ofreciendo una atención cercana, resolutiva y alineada con los valores del centro desde el primer momento.",
      "Además, gestiona la zona social y de cafetería, cuidando tanto la calidad del servicio como la experiencia global del usuario, creando un espacio cómodo, funcional y coherente con la filosofía del proyecto.",
      "Su enfoque está orientado a la eficiencia, la organización y la mejora continua, siendo una pieza clave en la construcción de una experiencia integral de calidad para cada cliente.",
    ],
  },
];

/* --------------------------------- Servicios -------------------------------- */

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  image: string;
  hidden?: boolean;
  items: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    slug: "entrenamiento",
    name: "Entrenamiento",
    tagline: "Fuerza con propósito",
    intro:
      "Desde tu primera sesión hasta el alto rendimiento: programas individualizados y grupos reducidos con supervisión técnica constante.",
    image: "/photos/entrenamiento.jpg",
    items: [
      {
        title: "Entrenamiento personal (1 a 1)",
        description:
          "Máxima individualización. Un plan diseñado exclusivamente para ti, con supervisión técnica constante para optimizar cada repetición.",
      },
      {
        title: "Entrenamientos grupales",
        description:
          "Motivación y comunidad. Sesiones dinámicas en grupos reducidos donde la energía del equipo te ayudará a alcanzar tu mejor versión.",
      },
      {
        title: "Readaptación de lesiones",
        description:
          "El puente entre la camilla y el deporte. Trabajamos junto al fisioterapeuta para devolverte la funcionalidad y confianza tras una lesión.",
      },
      {
        title: "Preparación para oposiciones",
        description:
          "Entrenamiento específico para superar las pruebas físicas de cuerpos de seguridad (Policía, Bomberos, etc.) con garantías de éxito.",
      },
      {
        title: "Alto rendimiento deportivo",
        description:
          "Optimización de la fuerza, potencia y resistencia para atletas que buscan llevar su capacidad física al siguiente nivel.",
      },
      {
        title: "Entrenamiento de fuerza y salud",
        description:
          "Programas enfocados en la mejora de la composición corporal, longevidad y prevención de enfermedades metabólicas.",
      },
    ],
  },
  {
    slug: "nutricion",
    name: "Nutrición",
    tagline: "Comer bien, vivir mejor",
    intro:
      "Alimentación real, sostenible y basada en evidencia científica. Sin dietas milagro: planes 100 % personalizados a tu vida y a tu objetivo.",
    image: "/photos/nutricion.jpg",
    items: [
      {
        title: "Nutrición deportiva",
        description: "Optimización del rendimiento y competición.",
      },
      {
        title: "Patologías digestivas",
        description:
          "Mejora de sintomatología en patologías como SIBO, síndrome del ovario poliquístico, intolerancias, celiaquía y/o colon irritable, entre otras.",
      },
      {
        title: "Recomposición corporal",
        description:
          "Pérdida de grasa y ganancia de masa muscular, adaptada a tu día a día y a tus necesidades.",
      },
      {
        title: "Antropometrías completas",
        description:
          "Conoce tu estado actual y los posibles puntos débiles sobre los que actuar.",
      },
      {
        title: "Nutrición en distintas etapas de la vida",
        description:
          "Un niño, un anciano o una mujer embarazada tienen necesidades nutricionales muy distintas. Por eso es fundamental adaptar tu alimentación a cada etapa de tu vida.",
      },
      {
        title: "Educación nutricional",
        description:
          "Estudio y mejora de hábitos nutricionales, corrección de errores, lectura de etiquetas y lista de la compra.",
      },
      {
        title: "Suplementación deportiva",
        description:
          "Evita gastar dinero en suplementos que no necesitas: ajuste de necesidades basado en tu objetivo y en la evidencia científica.",
      },
      {
        title: "Psiconutrición",
        description:
          "Enfoque multidisciplinar para la mejora y tratamiento de TCA, gestión emocional del hambre y trastornos digestivos.",
      },
    ],
  },
  {
    slug: "fisioterapia",
    name: "Fisioterapia",
    tagline: "Más allá de la lesión",
    intro:
      "Diagnóstico preciso, tratamiento basado en evidencia y un objetivo claro: que vuelvas a moverte sin miedo y sin depender de la camilla.",
    image: "/photos/fisioterapia.jpg",
    items: [
      {
        title: "Fisioterapia musculoesquelética",
        description:
          "Valoración y tratamiento de lesiones del aparato locomotor: tendinopatías, esguinces, dolor cervical, lumbar y articular, entre otras.",
      },
      {
        title: "Fisioterapia deportiva y readaptación",
        description:
          "Recuperación de lesiones deportivas y retorno progresivo a la actividad física con garantías.",
      },
      {
        title: "Fisioterapia neurológica",
        description:
          "Tratamiento especializado para personas con ictus, Parkinson y otras patologías del sistema nervioso.",
      },
      {
        title: "Fisioterapia invasiva",
        description:
          "Punción seca y otras técnicas invasivas aplicadas con precisión cuando están clínicamente indicadas.",
      },
      {
        title: "Ecografía diagnóstica",
        description:
          "Valoración ecográfica de tejidos blandos para un diagnóstico más preciso y un tratamiento más dirigido.",
      },
      {
        title: "Entrenamiento terapéutico",
        description:
          "Programas de ejercicio adaptado orientados a la recuperación funcional, la prevención de recaídas y la mejora del rendimiento.",
      },
      {
        title: "Exploración con ecógrafo",
        description:
          "Observación del tejido en vivo a través de tecnología de último nivel para identificar el alcance de las lesiones.",
      },
      {
        title: "Recuperación post-quirúrgica",
        description:
          "Acompañamiento especializado tras cirugías para asegurar una rehabilitación óptima.",
      },
    ],
  },
  {
    slug: "psicologia",
    name: "Psicología",
    tagline: "El cambio empieza dentro",
    intro:
      "Porque el cambio no es solo físico: motivación, relación con la comida, estrés y adherencia al proceso. La pieza que hace que los resultados duren.",
    image: "/photos/psicologia.jpg",
    items: [
      {
        title: "Gestión emocional y estrés",
        description:
          "Herramientas prácticas para que el ritmo del día a día no te pase factura. Aprende a dominar el estrés antes de que él te domine a ti.",
      },
      {
        title: "Psicología deportiva",
        description:
          "Maximiza tu foco, mejora tu confianza y rompe las barreras mentales que te impiden alcanzar tu mejor versión en el entrenamiento.",
      },
      {
        title: "Mindful eating",
        description:
          "Reconcíliate con la comida. Trabajamos para entender qué hay detrás de tu hambre y cómo disfrutar de alimentarte sin culpa ni ansiedad.",
      },
      {
        title: "Autoestima y autocuidado",
        description:
          "Un espacio seguro para redescubrirte, fortalecer tu seguridad personal y construir una relación sana contigo mismo.",
      },
      {
        title: "Terapia para el bienestar vital",
        description:
          "Apoyo profesional ante procesos de cambio, duelo o simplemente cuando necesites herramientas para volver a sentirte tú mismo.",
      },
      {
        title: "Abordaje integral de los TCA",
        description:
          "Trabajamos de forma conjunta (psicología + nutrición) para el tratamiento de los TCA.",
      },
    ],
  },
  {
    slug: "podologia",
    name: "Podología",
    tagline: "Salud desde la base",
    intro:
      "Del estudio biomecánico de la pisada al cuidado integral del pie: prevención, tecnología y tratamiento experto.",
    image: "/photos/hero-gym.jpg",
    hidden: true,
    items: [
      {
        title: "Estudio biomecánico de la pisada",
        description:
          "Analizamos cómo caminas y corres con tecnología de vanguardia para prevenir lesiones y optimizar tu postura desde la base.",
      },
      {
        title: "Podología deportiva",
        description:
          "Especialistas en el corredor y el deportista. Si te duelen los pies al entrenar, encontramos la causa y la solución técnica.",
      },
      {
        title: "Plantillas personalizadas",
        description:
          "Diseñamos soportes a medida que se adaptan a tu calzado y a tu ritmo de vida, no al revés. Comodidad absoluta en cada paso.",
      },
      {
        title: "Quiropodología y cuidado integral",
        description:
          "Tratamiento experto de durezas, callosidades y problemas en las uñas. Porque unos pies sanos son unos pies que no duelen.",
      },
      {
        title: "Podología infantil",
        description:
          "Vigilamos el crecimiento de los más pequeños para asegurar que sus pies se desarrollen correctamente y evitar problemas en el futuro.",
      },
    ],
  },
  {
    slug: "medicina-estetica",
    name: "Medicina estética",
    tagline: "Cuidarte también se nota",
    intro:
      "Tratamientos médico-estéticos seguros y naturales, orientados a la prevención y al equilibrio.",
    image: "/photos/hero-gym.jpg",
    hidden: true,
    items: [
      {
        title: "Rejuvenecimiento facial integral",
        description:
          "Neuromoduladores, antiarrugas, ojeras y rejuvenecimiento de la mirada, medicina regenerativa y mesoterapia facial.",
      },
      {
        title: "Reposición de volúmenes",
        description:
          "Pómulos, fosa temporal, surco nasogeniano y líneas de marioneta.",
      },
      {
        title: "Armonización y volumen",
        description:
          "Asimetrías, recuperación de volúmenes perdidos, aumento de labios y proyección del mentón.",
      },
      {
        title: "Tratamientos corporales avanzados",
        description:
          "Soluciones eficaces contra la celulitis, la flacidez y la grasa localizada.",
      },
      {
        title: "Peelings y calidad de la piel",
        description:
          "Eliminamos impurezas y marcas, renovando tu piel para que luzca sana, hidratada y llena de vida.",
      },
      {
        title: "Medicina estética preventiva",
        description:
          "Porque la mejor forma de envejecer bien es cuidar la piel hoy. Planes a medida para mantener tu frescura a lo largo de los años.",
      },
      {
        title: "Correcciones sin cirugía",
        description: "Hialuronidasa, excesos de relleno y rinomodelación.",
      },
      {
        title: "Bienestar y equilibrio",
        description:
          "Sudoración excesiva, bruxismo, mesoterapia capilar y mesoterapia corporal.",
      },
    ],
  },
];

export const visibleServices = services.filter((s) => !s.hidden);

/* -------------------------- Misión, visión, valores ------------------------- */

export const purpose = {
  mission: {
    title: "Nuestra misión",
    headline: "Tu salud no es una parcela, es tu hogar",
    body: "Nuestra misión es transformar el concepto de bienestar alejándonos de soluciones aisladas. Existimos para ofrecer un refugio donde el bienestar físico, emocional y social convergen en un mismo espacio. No solo ayudamos a personas a alcanzar objetivos estéticos o deportivos; trabajamos para que cada persona que cruce nuestra puerta recupere la soberanía sobre su propio cuerpo y mente, construyendo un estilo de vida que valga la pena vivir.",
  },
  vision: {
    title: "Nuestra visión",
    headline: "Ser el referente de la salud integral que cuida de ti, estés donde estés",
    body: "Nuestra visión es ser ese lugar al que siempre quieres volver. Aspiramos a consolidarnos como un refugio de salud donde cada persona se sienta tan cuidada y cómoda como en su propia casa, pero con el respaldo de una metodología de élite. Queremos que nuestra comunidad nos vea no como un centro al que «tienes que ir», sino como el espacio de bienestar que eliges para vivir con plenitud, rodeado de un equipo que conoce tu nombre y se anticipa a tus necesidades.",
  },
  values: {
    title: "Nuestros valores",
    headline: "El alma del centro y el compromiso innegociable con quienes confían en nosotros",
    items: [
      {
        title: "Hospitalidad y cercanía",
        body: "Aquí no eres un número de cliente, eres parte de la familia. Entendemos que para sanar o mejorar el cuerpo, primero hay que sentirse seguro y acogido.",
      },
      {
        title: "Excelencia multidisciplinar",
        body: "Creemos en la fuerza del equipo. No tratamos síntomas, tratamos personas. Fisio, nutricionista, psicólogo y entrenador están en constante comunicación: eso es lo que garantiza un resultado real.",
      },
      {
        title: "Radical honestidad",
        body: "Nuestra prioridad es tu salud. Siempre te diremos lo que necesitas escuchar para mejorar, basándonos en la evidencia científica y la ética profesional, actuando con total transparencia en cada proceso.",
      },
      {
        title: "Compromiso vital",
        body: "Nos tomamos tu objetivo de forma personal. Tu éxito es nuestro combustible. Si te caes, te damos la mano; si vuelas, celebramos contigo. Tu salud está en las mejores manos.",
      },
      {
        title: "Individualización y especificidad",
        body: "Cada historia es única. Abrazamos la diversidad de contextos y situaciones personales con un trato ajustado a ti para asegurar el éxito del tratamiento. Tu objetivo es nuestra meta.",
      },
    ],
  },
};

/* ------------------------------------ FAQ ----------------------------------- */

export const faqs = [
  {
    q: "¿Qué significa que somos un centro multidisciplinar?",
    a: "Significa que no trabajamos de forma aislada. Si vienes por una lesión, tu tratamiento no se limita a una sola área: fisioterapia, entrenamiento, nutrición y psicología trabajan de forma coordinada para acelerar tu recuperación y mejorar resultados. Todo el equipo está alineado con un único objetivo: tu salud.",
  },
  {
    q: "No estoy en forma, ¿puedo apuntarme?",
    a: "Sí. De hecho, es el mejor momento para empezar. No necesitas estar en forma para venir: vienes precisamente para conseguirlo. Adaptamos cada sesión a tu nivel actual, sin importar tu punto de partida.",
  },
  {
    q: "¿Cómo sé por qué servicio debo empezar?",
    a: "No tienes que decidirlo tú. En tu primera visita realizamos una valoración inicial y, en función de tu situación y objetivos, te recomendamos el camino más eficiente.",
  },
  {
    q: "¿Las sesiones de entrenamiento son grupales o individuales?",
    a: "Trabajamos ambas opciones. Grupos reducidos (máx. 6 personas): atención personalizada + motivación de grupo. Sesiones individuales: máxima personalización y exigencia.",
  },
  {
    q: "Tengo poco tiempo o una rutina complicada, ¿es para mí?",
    a: "Sí. Disponemos de un amplio abanico de horarios y adaptamos los servicios a tu estilo de vida. El objetivo es que el proceso encaje contigo, no al revés.",
  },
  {
    q: "Tengo una lesión o dolor crónico, ¿puedo entrenar?",
    a: "Sí, y es precisamente donde más sentido tiene. Al contar con fisioterapeutas en el equipo, diseñamos programas de entrenamiento adaptados a patologías y procesos de recuperación, garantizando seguridad y progresión.",
  },
  {
    q: "¿Es obligatorio seguir una dieta si solo quiero entrenar?",
    a: "No es obligatorio. Puedes contratar solo entrenamiento, pero siempre te orientaremos en nutrición porque es una parte clave del progreso.",
  },
  {
    q: "¿Por qué hay un psicólogo en el centro?",
    a: "Porque el cambio no es solo físico. Trabajamos aspectos como motivación, relación con la comida, estrés o adherencia al proceso. Es una pieza fundamental para conseguir resultados duraderos.",
  },
  {
    q: "¿Hacéis dietas milagro o usáis suplementos obligatorios?",
    a: "No. Trabajamos con alimentación real, sostenible y basada en evidencia científica. La suplementación nunca es obligatoria: solo se recomienda si aporta valor en tu caso concreto.",
  },
  {
    q: "¿Qué pasa si no puedo asistir a una sesión?",
    a: "Puedes cancelarla o reprogramarla avisando con la antelación mínima establecida, sin coste adicional.",
  },
  {
    q: "¿Qué tengo que llevar el primer día?",
    a: "Ropa deportiva cómoda, agua y toalla. Nosotros nos encargamos del resto.",
  },
  {
    q: "¿Qué duración tienen los bonos?",
    a: "Los bonos tienen validez mensual. Buscamos continuidad y resultados, no acumulación de sesiones.",
  },
  {
    q: "¿Puedo darme de baja cuando quiera?",
    a: "Sí, no hay permanencia. Solo pedimos aviso antes del día 15 del mes anterior para gestionar la baja correctamente.",
  },
  {
    q: "¿Quién puede beneficiarse de este servicio?",
    a: "Cualquier persona que quiera mejorar su salud: pérdida de grasa, ganancia muscular, mejora del rendimiento, recuperación de lesiones o mejora general del bienestar.",
  },
  {
    q: "¿Cómo resuelvo mis dudas durante el proceso?",
    a: "Tendrás contacto directo con el equipo a través de WhatsApp o email. Las dudas se resuelven de forma ágil y continua.",
  },
  {
    q: "Si contrato el servicio, ¿tendré resultados?",
    a: "Nosotros ponemos el sistema, el seguimiento y la experiencia. Los resultados dependen de la implicación en el proceso. Si hay compromiso, los resultados llegan.",
  },
  {
    q: "¿Los planes nutricionales incluyen suplementación?",
    a: "Son 100 % personalizados. La suplementación es opcional y solo se recomienda si es útil para tu objetivo. La decisión final siempre es tuya.",
  },
  {
    q: "¿Cuál es el precio de los servicios?",
    a: "Trabajamos con un modelo flexible basado en membresías y servicios individuales, adaptados a tus necesidades y objetivos. Disponemos de membresías centradas en entrenamiento, planes más completos que integran varias áreas (entrenamiento, fisioterapia, nutrición, etc.) y servicios puntuales o sesiones individuales. Tras una primera valoración te recomendaremos la opción más adecuada para ti: que pagues solo por lo que realmente necesitas, ni más ni menos.",
  },
];

/* --------------------------------- Reseñas ---------------------------------- */
// Placeholder hasta conectar las reseñas reales de Google Business.

export const reviews = [
  {
    name: "María G.",
    text: "Llegué con dolor lumbar crónico y entre el fisio y el entrenador me han devuelto la confianza para moverme. Se nota que hablan entre ellos: cada sesión continúa la anterior.",
    stars: 5,
  },
  {
    name: "Javier R.",
    text: "No es el típico gimnasio. Te conocen por tu nombre, la valoración inicial es seria y el plan tiene sentido. En tres meses, mejor forma que en años por mi cuenta.",
    stars: 5,
  },
  {
    name: "Lucía M.",
    text: "La combinación de nutrición y psicología me cambió la relación con la comida. Cero dietas milagro, todo con evidencia y mucha cercanía.",
    stars: 5,
  },
];

/* ----------------------------------- Blog ----------------------------------- */

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "fuerza-mejor-inversion-salud",
    title: "Entrenamiento de fuerza: la mejor inversión para tu salud a largo plazo",
    category: "Entrenamiento",
    excerpt:
      "La masa muscular es el seguro de vida más barato que existe. Te contamos por qué la fuerza debería ser la base de tu entrenamiento, tengas la edad que tengas.",
    date: "2026-05-28",
    readingMinutes: 5,
    image: "/photos/entrenamiento.jpg",
    body: [
      "Durante décadas, el entrenamiento de fuerza se asoció únicamente a la estética o al deporte de competición. Hoy la evidencia científica es contundente: la fuerza es uno de los mejores predictores de salud y longevidad que conocemos.",
      "A partir de los 30 años perdemos entre un 3 % y un 8 % de masa muscular por década si no hacemos nada por evitarlo. Esa pérdida — la sarcopenia — está detrás de muchas caídas, fracturas y pérdidas de autonomía en edades avanzadas. La buena noticia: es reversible a cualquier edad.",
      "Entrenar fuerza no significa levantar pesos máximos desde el primer día. Significa exponer al músculo a un estímulo progresivo, bien dosificado y adaptado a tu punto de partida. Dos o tres sesiones semanales bien planificadas son suficientes para notar cambios en pocas semanas.",
      "Además de los beneficios musculares, el entrenamiento de fuerza mejora la sensibilidad a la insulina, la densidad ósea, la composición corporal y el estado de ánimo. Es, literalmente, medicina preventiva.",
      "En ENDO Wellness Club cada programa de fuerza parte de una valoración inicial y se coordina con el resto del equipo: si hay una lesión previa, el fisioterapeuta participa en la planificación; si el objetivo es la recomposición corporal, la estrategia se alinea con nutrición. Así es como los resultados llegan — y se quedan.",
    ],
  },
  {
    slug: "comer-real-sin-dietas-milagro",
    title: "Comer real: por qué las dietas milagro no funcionan (y qué hacer en su lugar)",
    category: "Nutrición",
    excerpt:
      "Cada año aparece una dieta nueva que promete resultados rápidos. Y cada año, la ciencia repite lo mismo: lo que funciona es lo sostenible.",
    date: "2026-05-14",
    readingMinutes: 4,
    image: "/photos/nutricion.jpg",
    body: [
      "Si una dieta te promete perder mucho peso en poco tiempo, ya sabes cómo acaba: recuperándolo. Las restricciones extremas son insostenibles, generan ansiedad y deterioran tu relación con la comida.",
      "El enfoque que defendemos es más sencillo — y más exigente a la vez: alimentación real, basada en evidencia, ajustada a tu contexto. Verduras, frutas, proteína de calidad, legumbres, cereales integrales y grasas saludables como base; flexibilidad y disfrute como norma.",
      "La clave no está en prohibir alimentos, sino en construir hábitos. Aprender a leer etiquetas, planificar la compra, ajustar raciones a tu actividad y entender qué hay detrás del hambre emocional vale más que cualquier lista de alimentos prohibidos.",
      "¿Y los suplementos? Solo cuando aportan valor real para tu objetivo. La mayoría de las personas no los necesita; ninguna los necesita como punto de partida.",
      "Cada plan nutricional de nuestro centro es 100 % personalizado y evoluciona contigo. Y cuando la relación con la comida es la barrera, nutrición y psicología trabajan juntas: la psiconutrición es una de las herramientas más potentes que existen para lograr cambios duraderos.",
    ],
  },
  {
    slug: "dolor-no-siempre-es-dano",
    title: "Dolor no siempre es daño: lo que la fisioterapia moderna sabe sobre tu lesión",
    category: "Fisioterapia",
    excerpt:
      "El reposo absoluto está sobrevalorado y el movimiento es, casi siempre, parte de la solución. Hablamos de dolor, lesiones y recuperación activa.",
    date: "2026-04-30",
    readingMinutes: 5,
    image: "/photos/fisioterapia.jpg",
    body: [
      "Una de las ideas más dañinas que arrastramos sobre las lesiones es que el dolor equivale a daño y que la solución es dejar de moverse. La neurociencia del dolor nos dice otra cosa: el dolor es una alarma, y esa alarma puede sonar más fuerte o más floja por factores que no son solo el tejido — el estrés, el sueño, el miedo al movimiento.",
      "Por eso la fisioterapia moderna combina el tratamiento en camilla con algo igual de importante: la educación y el ejercicio terapéutico. Entender qué te pasa reduce el miedo; moverte de forma progresiva y guiada recupera la función.",
      "En nuestro centro usamos ecografía para afinar el diagnóstico cuando es necesario, y técnicas invasivas como la punción seca solo cuando están clínicamente indicadas. Ninguna técnica es un fin en sí mismo: son herramientas dentro de un plan.",
      "La readaptación es el puente entre la camilla y tu vida: volver a correr, a entrenar, a jugar con tus hijos. Ese puente lo construimos entre fisioterapeuta y entrenador, con cargas progresivas y criterios objetivos de retorno.",
      "Si tienes una lesión o un dolor que se ha hecho crónico, lo peor que puedes hacer es esperar a que desaparezca solo. Una buena valoración es el primer paso para dejar de girar en círculos.",
    ],
  },
  {
    slug: "salud-mental-el-musculo-invisible",
    title: "El músculo invisible: por qué tu cabeza decide si tus resultados duran",
    category: "Psicología",
    excerpt:
      "Motivación, adherencia, gestión del estrés y relación con la comida: el trabajo psicológico es lo que convierte un plan en un estilo de vida.",
    date: "2026-04-15",
    readingMinutes: 4,
    image: "/photos/psicologia.jpg",
    body: [
      "Casi nadie abandona un proceso de cambio por falta de información. Se abandona por falta de adherencia: la vida aprieta, la motivación cae y el plan — perfecto sobre el papel — se vuelve insostenible.",
      "Ahí es donde entra la psicología. No como recurso de emergencia, sino como parte del sistema desde el primer día. Trabajar la gestión del estrés, las expectativas y la autoexigencia convierte los objetivos en hábitos que sobreviven a las malas semanas.",
      "La relación con la comida merece mención aparte. El hambre emocional, el picoteo por ansiedad o la culpa después de comer son señales de que el problema no está en el menú, sino en lo que hay alrededor. El mindful eating y la psiconutrición abordan exactamente eso.",
      "En el deporte, el rendimiento mental es entrenable igual que la fuerza: foco, confianza, tolerancia a la frustración y rutinas de competición se trabajan con método.",
      "Por eso en ENDO Wellness Club hay un psicólogo en el equipo. Porque tratamos personas, no síntomas — y porque los resultados que no se sostienen por dentro, tarde o temprano se caen por fuera.",
    ],
  },
];

export const blogCategories = [
  "Entrenamiento",
  "Nutrición",
  "Fisioterapia",
  "Psicología",
];
