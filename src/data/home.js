// Fotografías de referencia existentes, no documentación de obras de MUHU.
// Sustituir aquí por material autorizado; toda la información de portada vive aquí.
export const homeNav = [
  { to: '/#top', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/#proyectos', label: 'Proyectos' },
  { to: '/#quiero-ayudar', label: 'Quiero ayudar' },
];
export const heroSlides = [
  { src: '/assets/hero.jpg', alt: 'Espacio verde abierto junto a una edificación', caption: 'Espacios para encontrarnos' },
  { src: '/assets/project-hawthorn.jpg', alt: 'Senderos y áreas verdes en un espacio público', caption: 'Diseño al servicio de las personas' },
  { src: '/assets/project-birch.jpg', alt: 'Vista referencial de un espacio verde', caption: 'Un futuro que se construye juntos' },
];
export const aboutImage = heroSlides[1];
export const featuredProject = {
  kicker: 'Datos generales',
  name: 'Centro de Desarrollo Social - MUSA',
  client: 'Municipalidad de La Molina',
  country: 'Perú',
  region: 'Lima',
  aerial: {
    src: '/assets/musa-aerial.jpg',
    alt: 'Vista aérea del entorno urbano del predio en Lima',
  },
  campus: {
    src: '/assets/musa-campus.jpg',
    alt: 'Vista aérea del conjunto propuesto',
  },
  entrance: {
    src: '/assets/musa-entrance.jpg',
    alt: 'Acceso principal del conjunto propuesto',
  },
};
export const projects = [
  {
    id: 'primera-iniciativa', title: 'Un primer espacio, muchas posibilidades',
    description: 'MUHU está desarrollando sus primeras iniciativas de infraestructura social. El lugar, el alcance y el calendario se compartirán cuando estén definidos.',
    status: 'En definición · sin fecha confirmada', date: null,
    category: 'Proyecto en preparación', image: '/assets/project-birch.jpg',
    alt: 'Área verde como referencia de un espacio compartido',
    note: 'Contenido provisional. La imagen no representa un proyecto de MUHU.',
    detail: 'Esta ficha reserva el espacio para el primer proyecto de MUHU. Se actualizará con información confirmada; no representa una obra iniciada o terminada.',
  },
  {
    id: 'trayectoria-equipo', title: 'Una trayectoria que inspira el comienzo',
    description: 'Caio y Rossina aportan experiencia en proyectos sociales y arquitectónicos realizados antes de la creación de MUHU.',
    status: 'Trayectoria anterior a MUHU', date: null,
    category: 'Experiencia previa del equipo', image: '/assets/project-hawthorn.jpg',
    alt: 'Diseño de senderos y áreas de encuentro como referencia visual',
    note: 'Imagen referencial. No corresponde a una obra acreditada al equipo o a MUHU.',
    detail: 'La experiencia pertenece a los directores, no a MUHU. Las fichas individuales se incorporarán cuando se disponga de nombres, fechas, participación e imágenes verificadas.',
  },
];
export const focusCards = [
  { kicker: 'Nombre', title: 'Semilla', copy: 'MUHU significa semilla en quechua: el comienzo de un espacio que puede crecer.', icon: 'seed', label: 'Abrir ficha Semilla' },
  { kicker: 'Oficio', title: 'Espacios dignos', copy: 'Diseño de infraestructura social segura, higiénica y útil para quien más la necesita.', icon: 'leaf', label: 'Abrir ficha Espacios dignos' },
  { kicker: 'Cuidado', title: 'Oficio', copy: 'Priorizamos niños y adultos mayores en situación de vulnerabilidad.', icon: 'shield', label: 'Abrir ficha Oficio' },
  { kicker: 'Apoyo', title: 'Donación', copy: 'Los aportes se destinan a fines sociales según estatutos y normativa vigente.', icon: 'heart', label: 'Abrir ficha Donación' },
  { kicker: 'Cuentas', title: 'Transparencia', copy: 'MUHU es entidad perceptora de donaciones con beneficio tributario ante la SUNAT.', icon: 'map', label: 'Abrir ficha Transparencia' },
];
export const donationSteps = [
  { title: 'Dona a MUHU', icon: 'heart', copy: 'Contáctanos para conocer el procedimiento de donación y recibir los datos oficiales de pago.' },
  { title: 'Recibe confirmación', icon: 'shield', copy: 'Una vez confirmado tu aporte, MUHU emitirá el comprobante de recepción de donaciones correspondiente.' },
  { title: 'Conoce los avances', icon: 'seed', copy: 'Comunicaremos la evolución de las iniciativas y el destino general de los fondos mediante actualizaciones institucionales.' },
];
// Solo información pública confirmada. Vacío = no se muestra. Nunca secretos.
export const contact = {
  email: (import.meta.env.VITE_MUHU_CONTACT_EMAIL || '').trim(),
  endpoint: (import.meta.env.VITE_MUHU_FORM_ENDPOINT || '').trim(),
  ruc: (import.meta.env.VITE_MUHU_RUC || '').trim(),
  socialLinks: [], // Ejemplo: { label: 'Instagram', href: 'https://...' }
};
