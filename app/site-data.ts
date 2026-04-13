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
