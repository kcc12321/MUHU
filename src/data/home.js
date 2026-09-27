// Fotografías de referencia existentes, no documentación de obras de MUHU.
// Sustituir aquí por material autorizado; toda la información de portada vive aquí.
export const homeNav = [
  { to: '/#top', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/#quiero-ayudar', label: 'Quiero ayudar' },
];
export const heroSlides = [
  { src: '/assets/hero.jpg', alt: 'Espacio verde abierto junto a una edificación', caption: 'Espacios para encontrarnos' },
  { src: '/assets/projects/cds-musa.jpg', alt: 'Centro de Desarrollo Social - Musa en La Molina', caption: 'Diseño arquitectónico con vocación social' },
  { src: '/assets/projects/casa-de-todos-palomino.jpg', alt: 'Casa de Todos Palomino', caption: 'Hábitat digno y comunidades seguras' },
];
export const aboutImage = {
  src: '/assets/about.jpg',
  alt: 'Espacio arquitectónico y de encuentro comunitario',
  caption: 'Espacios para encontrarnos y crecer. Fotografía referencial.',
};
export const projects = [
  {
    id: 'cds-musa',
    title: 'Centro de Desarrollo Social - MUSA',
    description: 'Infraestructura pública comunitaria ecosostenible concebida para la Municipalidad de La Molina con cubierta tensada bioclimática.',
    status: 'Planificado · Avance 20% · Proyección Q4 2027',
    date: 'Q4 2027',
    category: 'Proyecto Planificado',
    image: '/assets/projects/cds-musa.jpg',
    alt: 'Render del Centro de Desarrollo Social - Musa',
    note: 'Cliente: Municipalidad de La Molina · Lima, Perú',
    detail: 'En fase de planificación y diseño técnico con 20% de avance. Diseñado para brindar atención comunitaria integral y espacios de recreación.',
  },
  {
    id: 'casa-de-todos-acho',
    title: 'Casa de Todos - Acho',
    description: 'Albergue humanitario de emergencia adaptado en la Plaza de Toros de Acho con energía solar y módulos habitacionales dignos.',
    status: 'Completado · 100% Ejecutado',
    date: '2020',
    category: 'Proyecto Completado',
    image: '/assets/projects/casa-de-todos-acho.jpg',
    alt: 'Casa de Todos en la Plaza de Acho',
    note: 'Cliente: Beneficencia de Lima · Lima, Perú',
    detail: 'Respuesta humanitaria inmediata con energía solar fotovoltaica, dormitorios modulares, comedor y asistencia médica durante la emergencia sanitaria.',
  },
  {
    id: 'casa-de-todos-palomino',
    title: 'Casa de Todos - Palomino',
    description: 'Complejo residencial permanente de acogida para adultos mayores con diseño bioclimático, accesibilidad universal y amplias áreas verdes.',
    status: 'Completado · Sede Definitiva',
    date: 'Operativo',
    category: 'Proyecto Completado',
    image: '/assets/projects/casa-de-todos-palomino.jpg',
    alt: 'Instalaciones de Casa de Todos Palomino',
    note: 'Cliente: Beneficencia de Lima · Lima, Perú',
    detail: 'Sede definitiva entregada para garantizar un envejecimiento digno, seguro y en comunidad para personas en desamparo social.',
  },
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
