export const siteName = "ENDO Wellness Club";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/schedule", label: "Classes" },
  { href: "/membership", label: "Membership" },
];

export const pillars = [
  {
    title: "Strength Lab",
    description:
      "Powerlifting racks, selectorized machines, open lifting platforms, and coached small-group training designed for progression.",
  },
  {
    title: "Mindful Movement",
    description:
      "Pilates reformer sessions, dance conditioning, mat mobility, and recovery classes that keep intensity balanced with precision.",
  },
  {
    title: "Nutrition Studio",
    description:
      "Registered nutrition professionals, metabolic coaching, meal strategy reviews, and habit support built around real schedules.",
  },
  {
    title: "Recovery Social",
    description:
      "Cold therapy, breathwork, stretching lounges, infrared heat, and calm spaces that make wellness feel like a club, not a checklist.",
  },
];

export const stats = [
  { value: "6", label: "Studios under one membership" },
  { value: "38", label: "Weekly coached classes" },
  { value: "1:1", label: "Nutrition and recovery guidance" },
  { value: "5am–10pm", label: "Daily club access" },
];

export const featuredPrograms = [
  {
    name: "Foundations of Strength",
    tag: "Powerlifting",
    description:
      "Technique-focused coaching across squat, bench, deadlift, and machine-based accessory work for new and returning lifters.",
  },
  {
    name: "Reformer Reset",
    tag: "Pilates",
    description:
      "Low-impact precision sessions that build posture, control, and core strength without flattening the nervous system.",
  },
  {
    name: "Club Rhythm",
    tag: "Dance",
    description:
      "High-energy movement classes blending choreography, conditioning, and genuine fun for people who want cardio without dread.",
  },
  {
    name: "Eat to Perform",
    tag: "Nutrition",
    description:
      "Small-group support led by nutrition pros focused on fueling training, reducing inflammation, and building sustainable routines.",
  },
];

export const galleryImages = [
  {
    src: "/wellness-club/hero-club.png",
    title: "Arrival Lounge",
    description: "A hotel-grade welcome space with warm materials, café seating, and club-level calm.",
  },
  {
    src: "/wellness-club/pilates-studio.png",
    title: "Pilates Studio",
    description: "Sunlit reformer and mat programming for alignment, strength, and mobility.",
  },
  {
    src: "/wellness-club/strength-floor.png",
    title: "Strength Floor",
    description: "Plate-loaded machines, lifting platforms, and coaching lanes built for serious work.",
  },
  {
    src: "/wellness-club/nutrition-lab.png",
    title: "Nutrition Lounge",
    description: "Professional consultations, body composition reviews, and habit-planning sessions.",
  },
];

export const classSchedule = [
  {
    day: "Monday",
    sessions: [
      { time: "6:15 AM", title: "Foundations of Strength", coach: "Coach Mara", room: "Strength Lab" },
      { time: "12:00 PM", title: "Desk Reset Pilates", coach: "Leonie", room: "Studio One" },
      { time: "6:30 PM", title: "Club Rhythm", coach: "Ari", room: "Movement Hall" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "7:00 AM", title: "Power + Mobility", coach: "Devin", room: "Strength Lab" },
      { time: "1:00 PM", title: "Eat to Perform Clinic", coach: "Dr. Sato", room: "Nutrition Studio" },
      { time: "7:15 PM", title: "Infrared Stretch", coach: "Mina", room: "Recovery Suite" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "6:30 AM", title: "Reformer Reset", coach: "Leonie", room: "Studio One" },
      { time: "5:30 PM", title: "Olympic Lift Prep", coach: "Coach Mara", room: "Strength Lab" },
      { time: "7:00 PM", title: "Breathwork Social", coach: "Nico", room: "Recovery Suite" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "7:15 AM", title: "Pilates for Runners", coach: "Celine", room: "Studio Two" },
      { time: "12:30 PM", title: "Metabolic Lunch Lab", coach: "Dr. Sato", room: "Nutrition Studio" },
      { time: "6:45 PM", title: "Dance Cardio Club", coach: "Ari", room: "Movement Hall" },
    ],
  },
  {
    day: "Friday",
    sessions: [
      { time: "6:00 AM", title: "Barbell Basics", coach: "Devin", room: "Strength Lab" },
      { time: "5:00 PM", title: "Athlete Recovery Flow", coach: "Mina", room: "Recovery Suite" },
      { time: "7:00 PM", title: "Friday Club Stretch", coach: "Nico", room: "Sky Lounge" },
    ],
  },
];

export const membershipTiers = [
  {
    name: "Club Access",
    price: "$189",
    cadence: "/month",
    description: "For members who want all-floor training access with a curated class rhythm.",
    perks: ["Unlimited gym access", "4 classes per month", "Recovery lounge access", "Quarterly goal review"],
  },
  {
    name: "Wellness Signature",
    price: "$289",
    cadence: "/month",
    description: "The full wellness-club experience with nutrition and recovery built in.",
    perks: [
      "Unlimited classes",
      "Monthly nutrition consultation",
      "Cold + infrared recovery",
      "Priority booking window",
    ],
  },
  {
    name: "Performance Concierge",
    price: "$459",
    cadence: "/month",
    description: "High-touch coaching for members training with specific strength, body-composition, or lifestyle goals.",
    perks: [
      "Biweekly coaching check-ins",
      "Customized training roadmap",
      "Nutrition protocol support",
      "Guest pass each month",
    ],
  },
];

export const clubNotes = [
  "Member café with recovery beverages and anti-inflammatory meal options",
  "On-site professionals for nutrition, performance, and habit coaching",
  "Open gym zones balanced with restorative spaces and social programming",
];

export type FaqItem = {
  question: string;
  answer: string[];
  bullets?: string[];
};

export const frequentlyAskedQuestions: FaqItem[] = [
  {
    question: "¿Qué significa que somos un centro multidisciplinar?",
    answer: [
      "Significa que no trabajamos de forma aislada.",
      "Si vienes por una lesión, tu tratamiento no se limita a una sola área: fisioterapia, entrenamiento, nutrición y psicología trabajan de forma coordinada para acelerar tu recuperación y mejorar resultados. Todo el equipo está alineado con un único objetivo: tu salud.",
    ],
  },
  {
    question: "No estoy en forma, ¿puedo apuntarme?",
    answer: [
      "Sí. De hecho, es el mejor momento para empezar.",
      "No necesitas estar en forma para venir: vienes precisamente para conseguirlo. Adaptamos cada sesión a tu nivel actual, sin importar tu punto de partida.",
    ],
  },
  {
    question: "¿Cómo sé por qué servicio debo empezar?",
    answer: [
      "No tienes que decidirlo tú.",
      "En tu primera visita realizamos una valoración inicial y, en función de tu situación y objetivos, te recomendamos el camino más eficiente.",
    ],
  },
  {
    question: "¿Las sesiones de entrenamiento son grupales o individuales?",
    answer: ["Trabajamos ambas opciones."],
    bullets: [
      "Grupos reducidos (máx. 6 personas): atención personalizada + motivación de grupo.",
      "Sesiones individuales: máxima personalización y exigencia.",
    ],
  },
  {
    question: "Tengo poco tiempo o una rutina complicada, ¿es para mí?",
    answer: [
      "Sí.",
      "Disponemos de un amplio abanico de horarios y adaptamos los servicios a tu estilo de vida. El objetivo es que el proceso encaje contigo, no al revés.",
    ],
  },
  {
    question: "Tengo una lesión o dolor crónico, ¿puedo entrenar?",
    answer: [
      "Sí, y es precisamente donde más sentido tiene.",
      "Al contar con fisioterapeutas en el equipo, diseñamos programas de entrenamiento adaptados a patologías y procesos de recuperación, garantizando seguridad y progresión.",
    ],
  },
  {
    question: "¿Es obligatorio seguir una dieta si solo quiero entrenar?",
    answer: [
      "No es obligatorio.",
      "Puedes contratar solo entrenamiento, pero siempre te orientaremos en nutrición porque es una parte clave del progreso.",
    ],
  },
  {
    question: "¿Por qué hay un psicólogo en el centro?",
    answer: [
      "Porque el cambio no es solo físico.",
      "Trabajamos aspectos como motivación, relación con la comida, estrés o adherencia al proceso. Es una pieza fundamental para conseguir resultados duraderos.",
    ],
  },
  {
    question: "¿Hacéis dietas milagro o usáis suplementos obligatorios?",
    answer: [
      "No.",
      "Trabajamos con alimentación real, sostenible y basada en evidencia científica. La suplementación nunca es obligatoria: solo se recomienda si aporta valor en tu caso concreto.",
    ],
  },
  {
    question: "¿Qué pasa si no puedo asistir a una sesión?",
    answer: [
      "Puedes cancelarla o reprogramarla avisando con la antelación mínima establecida, sin coste adicional.",
    ],
  },
  {
    question: "¿Qué tengo que llevar el primer día?",
    answer: ["Ropa deportiva cómoda, agua y toalla.", "Nosotros nos encargamos del resto."],
  },
  {
    question: "¿Qué duración tienen los bonos?",
    answer: ["Los bonos tienen validez mensual.", "Buscamos continuidad y resultados, no acumulación de sesiones."],
  },
  {
    question: "¿Puedo darme de baja cuando quiera?",
    answer: [
      "Sí, no hay permanencia.",
      "Solo pedimos aviso antes del día 15 del mes anterior para gestionar la baja correctamente.",
    ],
  },
  {
    question: "¿Quién puede beneficiarse de este servicio?",
    answer: ["Cualquier persona que quiera mejorar su salud."],
    bullets: [
      "Pérdida de grasa.",
      "Ganancia muscular.",
      "Mejora del rendimiento.",
      "Recuperación de lesiones.",
      "Mejora general del bienestar.",
    ],
  },
  {
    question: "¿Cómo resuelvo mis dudas durante el proceso?",
    answer: [
      "Tendrás contacto directo con el equipo a través de WhatsApp o email.",
      "Las dudas se resuelven de forma ágil y continua.",
    ],
  },
  {
    question: "Si contrato el servicio, ¿tendré resultados?",
    answer: [
      "Nosotros ponemos el sistema, el seguimiento y la experiencia.",
      "Los resultados dependen de la implicación en el proceso. Si hay compromiso, los resultados llegan.",
    ],
  },
  {
    question: "¿Los planes nutricionales incluyen suplementación?",
    answer: [
      "Son 100% personalizados.",
      "La suplementación es opcional y solo se recomienda si es útil para tu objetivo. La decisión final siempre es tuya.",
    ],
  },
  {
    question: "¿Cuál es el precio de los servicios?",
    answer: [
      "Trabajamos con un modelo flexible basado en membresías y servicios individuales, adaptados a tus necesidades y objetivos.",
      "El precio no depende únicamente del nivel de personalización, sino del tipo de servicio y del acompañamiento que necesites en cada momento.",
      "Tras una primera valoración, te recomendaremos la opción más adecuada para ti. Nuestro objetivo es que pagues solo por lo que realmente necesitas, ni más ni menos.",
    ],
    bullets: [
      "Membresías centradas en entrenamiento.",
      "Planes más completos que integran varias áreas (entrenamiento, fisioterapia, nutrición, etc.).",
      "Servicios puntuales o sesiones individuales.",
    ],
  },
];
