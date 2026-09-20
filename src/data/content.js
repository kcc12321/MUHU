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

export const currentProject = {
  name: "Parque Los Álamos",
  place: "Villa Sur",
  status: "Diagnóstico cerrado · obra Q2–Q3 2026",
  copy: "Recuperamos 1,8 ha de predio abandonado: senderos, drenaje, iluminación y 140 especies nativas.",
  images: ["/assets/project-hawthorn.jpg", "/assets/project-ashridge.jpg", "/assets/project-birch.jpg"],
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

export const team = [
  { name: "Lina Vargas", role: "Dirección", image: "/assets/gardener.png" },
  { name: "Mateo Ríos", role: "Obra y diseño", image: "/assets/why.jpg" },
  { name: "Sofía Alem", role: "Territorio", image: "/assets/about.jpg" },
  { name: "Nicolás Pereyra", role: "Alianzas", image: "/assets/rating.png" },
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
  { q: "¿MUHU construye en cualquier barrio?", a: "Priorizamos zonas con poco acceso a verde seguro. El form de vecinos es el primer filtro." },
  { q: "¿Cuánto tarda un parque?", a: "Entre diagnóstico e inauguración apuntamos a 8–12 meses, según permisos y clima." },
  { q: "¿Cómo aporta una empresa?", a: "Fondeo de un tramo de obra, materiales o voluntariado. Escribínos en Empresas." },
  { q: "¿Dónde veo los fondos?", a: "En Nosotros publicamos la distribución y los documentos de template." },
];

export const nav = [
  { to: "/", label: "Inicio" },
  { to: "/proposito", label: "Propósito" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/empresas", label: "Empresas" },
  { to: "/nosotros", label: "Nosotros" },
];
