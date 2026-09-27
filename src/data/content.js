import { asset } from "@/lib/assets";

export const brand = {
  name: "MUHU",
  slogan: "Construyendo un futuro para todos",
  demoNote: "Contenido de demostración para validar estructura.",
};

export const mission =
  "Impulsar el desarrollo social mediante la planificación y construcción de infraestructura pública ecosostenible que atienda las necesidades de las comunidades más vulnerables.";

export const vision =
  "Ser una organización referente en el desarrollo de infraestructura pública social y ecosostenible que impulse comunidades más prósperas, equitativas y desarrolladas.";

export const values = [
  { title: "Compromiso social", copy: "Las personas están en el centro de cada proyecto." },
  { title: "Sostenibilidad", copy: "Infraestructura que respeta el entorno y dura." },
  { title: "Transparencia", copy: "Procesos claros y rendición de cuentas." },
  { title: "Innovación", copy: "Soluciones técnicas más eficientes y duraderas." },
  { title: "Colaboración", copy: "Comunidad, empresas y gobiernos en la misma mesa." },
];

export const ticker = values.map((item) => item.title);

export const problemStats = [
  { to: 33, suffix: "%", label: "Sin parque cerca", copy: "de los vecinos no llega a un parque seguro en 10 minutos.", icon: "map" },
  { to: 4, suffix: "°C", label: "Más calor", copy: "arriba en barrios sin copa de árbol.", icon: "sun" },
  { to: 2, suffix: "×", label: "Más uso de noche", copy: "cuando hay luz y vereda continua.", icon: "moon" },
];

export const founder = {
  name: "Lina Vargas",
  role: "Fundadora",
  quote:
    "Un parque no es un lujo. Es la infraestructura más barata para que un barrio se vuelva habitable.",
};

export { projectsData, plannedProjects, completedProjects } from "./projects";

export const currentProject = {
  name: "CENTRO DE DESARROLLO SOCIAL - MUSA",
  place: "Av. Musa, La Molina, Lima",
  status: "Planificado · Avance 20% · Proyección Q4 2027",
  copy: "Espacio comunitario multifuncional con cubierta tensada bioclimática concebido para la Municipalidad de La Molina.",
  images: [asset("/assets/projects/cds-musa.jpg"), asset("/assets/projects/casa-de-todos-acho.jpg"), asset("/assets/projects/casa-de-todos-palomino.jpg")],
};

export const roadmap = [
  { when: "Q1 2026", title: "Tres parques diagnosticados", copy: "Mesas barriales y relevamiento técnico en Villa Sur, Norte y el Bajo.", icon: "map" },
  { when: "Q2 2026", title: "Inicio de obra en Los Álamos", copy: "Movimiento de suelo, riego y primera plantación.", icon: "seed" },
  { when: "Q3 2026", title: "Inauguración del primer parque", copy: "Apertura pública y programa de uso comunitario.", icon: "leaf" },
  { when: "Q4 2026", title: "Primer reporte público", copy: "12 talleres barriales y rendición de fondos en la web.", icon: "calendar" },
];

export const partnerBenefits = [
  { title: "Visibilidad", copy: "Tu marca en la inauguración, el mural y el relato del barrio.", icon: "eye" },
  { title: "Reportes de impacto", copy: "Un tablero simple: metros recuperados, vecinos, especies.", icon: "chart" },
  { title: "Cultura", copy: "Jornadas de voluntariado con sentido, no un after de oficina.", icon: "people" },
];

export const pillars = [
  { title: "Salud", copy: "Sombra, aire y un lugar para moverse sin pagar entrada.", icon: "heart" },
  { title: "Seguridad", copy: "Luz, vereda y gente usando el espacio de noche.", icon: "shield" },
  { title: "Clima", copy: "Árboles nativos, suelo vivo y menos isla de calor.", icon: "leaf" },
];

export const institutionalData = {
  name: "Asociación MUHU",
  subtitle: "Entidad sin fines de lucro · Comprometida con el bienestar social",
  slogan: "Diseñamos espacios que transforman vidas",
  legal: {
    ruc: "20611534354",
    partidaRegistral: "N° 15381975",
    oficina: "Oficina Registral de Lima",
    titulo: "N° 2023-02341562 (14/08/2023)",
    sunatResolucion: "Nº 0490050045389",
    calificacionSunat: "Entidad Perceptora de Donaciones con Beneficio Tributario",
    direccion: "Calle La Rueda N° 209 Urb. La Planicie, La Molina, Lima",
    email: "contacto@muhu.org.pe",
    samplePdf: asset("/assets/comprobante-recepcion-donaciones.pdf"),
  },
  presentation: "La Asociación MUHU es una entidad sin fines de lucro creada por una familia de arquitectos con vocación de servicio, comprometida con el desarrollo humano y la mejora de las condiciones de vida de poblaciones vulnerables en el Perú. Su enfoque combina diseño arquitectónico funcional con impacto social sostenible.",
  mission: "Mejorar la calidad de vida de niños y adultos mayores en situación de vulnerabilidad, mediante la construcción de espacios seguros, higiénicos y dignos que atiendan necesidades de sanidad, agua, higiene y nutrición.",
  vision: "Ser una organización referente en infraestructura social inclusiva, con presencia en diversas regiones del país y reconocimiento por su gestión transparente y compromiso comunitario.",
  objectives: [
    {
      title: "Centros de acogida y hábitat",
      desc: "Espacios seguros y adaptados a movilidad reducida para niños y adultos mayores.",
      icon: "shield",
      badge: "Eje Asistencial Prioritario",
      image: asset("/assets/obj-sanitation.jpg"),
      alt: "Espacios habitacionales dignos y centros de acogida asistencial",
    },
    {
      title: "Comedores y nutrición",
      desc: "Infraestructura con enfoque en alimentación segura, agua y estándares sanitarios.",
      icon: "heart",
      badge: "Eje Asistencial Prioritario",
      image: asset("/assets/obj-nutrition.jpg"),
      alt: "Infraestructura para comedores populares e inocuidad alimentaria",
    },
    {
      title: "Desarrollo sostenible y bioclimático",
      desc: "Diseño bioclimático, materiales duraderos y respeto al entorno urbano y social.",
      icon: "leaf",
      badge: "Eje Metodológico",
      image: asset("/assets/obj-sustainability.jpg"),
      alt: "Diseño bioclimático e infraestructura ecológica sostenible",
    },
    {
      title: "Educación y espacios comunitarios",
      desc: "Módulos de capacitación, bibliotecas y talleres de laborterapia comunitaria.",
      icon: "sun",
      badge: "Eje Metodológico",
      image: asset("/assets/obj-education.jpg"),
      alt: "Salas de lectura, talleres y capacitación para comunidades",
    },
    {
      title: "Salud y bienestar preventivo",
      desc: "Tópicos de atención preventiva, sanidad e higiene en comunidades vulnerables.",
      icon: "map",
      badge: "Eje Metodológico",
      image: asset("/assets/obj-health.jpg"),
      alt: "Tópicos de salud preventiva e higiene comunitaria",
    },
  ],
  transparencyPoints: [
    { title: "Sistema Contable Digital", desc: "Registro integral respaldado por Contador Público Colegiado (CPC) y soporte documentario." },
    { title: "Supervisión Técnica Colegiada", desc: "Todos los diseños y planificaciones son validados y supervisados por profesionales colegiados." },
    { title: "Informes Periódicos de Ejecución", desc: "Rendición de cuentas sobre avance técnico y destino presupuestal de cada fondo recibido." },
    { title: "Exclusividad Social", desc: "Cada donación recibida se destina 100% a fines sociales según estatutos y normativa vigente." }
  ]
};

export const team = [
  {
    name: "Gianfranco Cuneo",
    role: "Fundador de MUHU",
    bio: "Impulsor del propósito fundacional de MUHU, articulando visión social, compromiso con el desarrollo humano y canalización de iniciativas para comunidades vulnerables.",
    image: asset("/assets/gianfranco-cuneo.png"),
    linkedin: "https://www.linkedin.com/in/gianfranco-cuneo-5563581/?trk=public_post_feed-actor-name",
    hasActiveLinkedin: true,
  },
  {
    name: "Caio Alessandro Jaccazio Roma",
    role: "Arquitecto & Director",
    bio: "Lidera la dirección técnica y la visión arquitectónica de MUHU, integrando diseño funcional, habitabilidad digna e infraestructura con impacto social.",
    image: asset("/assets/why.jpg"),
    linkedin: null,
    hasActiveLinkedin: false,
  },
  {
    name: "Rossina",
    role: "Arquitecta & Directora",
    bio: "Codirige el desarrollo espacial y la estrategia de proyectos, con especial foco en sostenibilidad comunitaria, accesibilidad e inclusión humana.",
    image: asset("/assets/about.jpg"),
    linkedin: null,
    hasActiveLinkedin: false,
  },
];

export const transparency = [
  { label: "Ejecución de obra y materiales", value: 62 },
  { label: "Gestión social y talleres", value: 22 },
  { label: "Administración y sostenibilidad", value: 16 },
];

export const documents = [
  { title: "Estatuto (borrador de template)", href: "#" },
  { title: "Cronograma 2026", href: "#" },
  { title: "Rendición trimestral", href: "#" },
];

export const faqs = [
  { q: "¿Cómo canalizar donaciones con beneficio tributario?", a: "La Asociación MUHU está calificada como Entidad Perceptora de Donaciones por la SUNAT (R.I. Nº 0490050045389). Emitimos Comprobantes de Recepción de Donaciones oficiales válidos para deducir del Impuesto a la Renta tanto para empresas como personas naturales." },
  { q: "¿Cómo se articulan proyectos con municipios y entidades públicas?", a: "Desarrollamos expedientes técnicos, diseño bioclimático y coordinación interinstitucional para crear infraestructura pública y asistencial adaptada a las necesidades reales de cada comunidad." },
  { q: "¿Qué tipo de obras e infraestructura desarrolla MUHU?", a: "Centros de desarrollo social, complejos de acogida humanitaria y residencial permanente, comedores y espacios de encuentro comunitario con accesibilidad universal." },
  { q: "¿Cómo se asegura la transparencia y trazabilidad de los fondos?", a: "Mediante un sistema contable digital respaldado por Contador Público Colegiado (CPC), supervisión técnica por arquitectos e ingenieros colegiados (CAP/CIP) y destino 100% irrestricto a los fines sociales." },
];

export const nav = [
  { to: "/", label: "Inicio" },
  { to: "/proposito", label: "Propósito" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/empresas", label: "Empresas" },
  { to: "/nosotros", label: "Nosotros" },
];
