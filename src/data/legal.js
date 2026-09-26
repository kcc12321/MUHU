import { institutionalData } from "@/data/content";

const { name, legal } = institutionalData;

export const legalDocs = {
  privacy: {
    path: "/privacidad",
    title: "Política de Privacidad",
    kicker: "Ley N° 29733",
    updated: "25 de septiembre de 2026",
    lede: "Este documento explica cómo la Asociación MUHU trata tus datos personales cuando nos escribes desde la web, en línea con la Ley N° 29733, Ley de Protección de Datos Personales, y su reglamento.",
    sections: [
      {
        title: "1. Responsable del banco de datos",
        paragraphs: [
          `${name} (en adelante, “MUHU”) es la titular y responsable del banco de datos personales “Contacto web y colaboradores”. RUC ${legal.ruc}. Domicilio: ${legal.direccion}. Partida registral ${legal.partidaRegistral}, ${legal.oficina}.`,
          `Canal de contacto para privacidad y derechos ARCO: ${legal.email}.`,
        ],
      },
      {
        title: "2. Datos que recopilamos",
        paragraphs: [
          "A través del formulario de contacto podemos recoger nombre, apellido, correo electrónico, número de celular (si lo indicas), país y el mensaje que nos envíes. También registramos la aceptación de esta política y la fecha del envío.",
          "No pedimos datos sensibles (salud, ideología, biometría u origen étnico) en este formulario. Te pedimos no incluirlos en el mensaje.",
        ],
      },
      {
        title: "3. Finalidad del tratamiento",
        paragraphs: [
          "Usamos tus datos para: (a) responder tu consulta sobre donaciones, colaboración o iniciativas de MUHU; (b) contactarte por correo o celular cuando sea necesario para atender ese pedido; (c) enviarte información institucional sobre proyectos, rendición de cuentas o convocatorias, solo si confirmas tu suscripción (doble opt-in); y (d) cumplir obligaciones legales de una asociación sin fines de lucro y entidad perceptora de donaciones.",
          "No usamos tus datos para venta de bases, perfilado publicitario de terceros ni envío de promociones comerciales ajenas a MUHU.",
        ],
      },
      {
        title: "4. Base legal y consentimiento",
        paragraphs: [
          "El tratamiento se sustenta en tu consentimiento informado, previo, expreso e inequívoco, recabado mediante la casilla obligatoria del formulario, y en el interés legítimo de atender una solicitud que tú inicias.",
          "Puedes revocar el consentimiento en cualquier momento, sin efecto retroactivo, escribiendo al correo de privacidad.",
        ],
      },
      {
        title: "5. Encargados y con quién se comparte",
        paragraphs: [
          "MUHU no vende ni cede tus datos a terceros para sus propios fines. Compartimos datos únicamente con encargados que nos prestan infraestructura, bajo instrucciones de MUHU:",
          "Brevo (Sendinblue SAS, Francia) actúa como encargado del tratamiento: aloja contactos, gestiona el doble opt-in y el envío de correos transaccionales o institucionales. Brevo trata los datos en servidores que pueden estar fuera del Perú; MUHU solo habilitará el envío cuando el flujo esté configurado y el consentimiento esté registrado.",
          "El alojamiento de la web y el servidor que recibe el formulario también pueden ver el envío técnico (dirección IP y fecha) para seguridad y prevención de abuso.",
        ],
      },
      {
        title: "6. Conservación",
        paragraphs: [
          "Conservamos los datos mientras dure la relación de contacto o la suscripción confirmada, y después el tiempo mínimo necesario para atender reclamos o exigencias legales. Si no confirmas el correo del doble opt-in, el alta no queda activa y el registro pendiente se elimina según la política de Brevo.",
        ],
      },
      {
        title: "7. Derechos ARCO y cómo ejercerlos",
        paragraphs: [
          "Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición, así como revocar el consentimiento o pedir la portabilidad de los datos que nos hayas facilitado, escribiendo a " + legal.email + " desde el correo que registraste, indicando tu nombre completo y el derecho que solicitas.",
          "Responderemos en los plazos de la normativa peruana. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
        ],
      },
      {
        title: "8. Seguridad",
        paragraphs: [
          "Aplicamos medidas razonables de acceso restringido, envío cifrado (HTTPS) y no almacenamos el formulario en el navegador. Ningún sistema es infalible; si detectáramos un incidente que afecte tus datos, te informaremos según la ley.",
        ],
      },
      {
        title: "9. Menores de edad",
        paragraphs: [
          "El formulario está pensado para personas adultas que desean colaborar o donar. Si eres padre, madre o tutor y crees que un menor nos envió datos, escríbenos para eliminarlos.",
        ],
      },
      {
        title: "10. Cambios",
        paragraphs: [
          "Podemos actualizar esta política. La fecha de la versión vigente aparece al inicio de esta página. El uso continuado del formulario tras un cambio sustancial requerirá un nuevo consentimiento cuando la ley lo exija.",
        ],
      },
    ],
  },
  terms: {
    path: "/terminos",
    title: "Términos y condiciones",
    kicker: "Uso del sitio",
    updated: "25 de septiembre de 2026",
    lede: "Estos términos regulan el acceso a muhu y a los contenidos institucionales de la Asociación MUHU.",
    sections: [
      {
        title: "1. Aceptación",
        paragraphs: [
          "Al navegar este sitio aceptas estos términos y la Política de Privacidad. Si no estás de acuerdo, no uses el formulario ni nos envíes datos personales.",
        ],
      },
      {
        title: "2. El sitio no es un canal de pago",
        paragraphs: [
          "Esta web informa sobre MUHU y permite pedir contacto. No procesa donaciones en línea. Cualquier aporte se coordina por los canales oficiales que MUHU confirme por escrito. Los comprobantes de recepción de donaciones se emiten según la normativa vigente.",
        ],
      },
      {
        title: "3. Contenido",
        paragraphs: [
          "Textos, marcas y piezas visuales pertenecen a MUHU o se usan como referencia. No copies el sitio con fines comerciales. Parte del material fotográfico es referencial y no documenta obras ejecutadas por MUHU, salvo que se indique lo contrario.",
        ],
      },
      {
        title: "4. Uso permitido",
        paragraphs: [
          "Puedes consultar la información con fines personales o de colaboración legítima. Queda prohibido el uso automatizado abusivo, la introducción de malware y el envío de datos falsos o de terceros sin autorización.",
        ],
      },
      {
        title: "5. Responsabilidad",
        paragraphs: [
          "Publicamos de buena fe información institucional. Los proyectos en preparación pueden cambiar. MUHU no responde por interrupciones del hosting, del correo o de Brevo, ni por decisiones que tomes solo con base en esta web sin contrastar con el equipo.",
        ],
      },
      {
        title: "6. Ley aplicable",
        paragraphs: [
          `Estos términos se rigen por las leyes de la República del Perú. El domicilio de MUHU es ${legal.direccion}.`,
        ],
      },
    ],
  },
  cookies: {
    path: "/cookies",
    title: "Cookies y almacenamiento local",
    kicker: "Transparencia técnica",
    updated: "25 de septiembre de 2026",
    lede: "Hoy este sitio no usa cookies de publicidad ni de analítica de terceros. Te contamos qué sí guardamos en tu navegador y qué podría cambiar cuando el correo institucional quede activo.",
    sections: [
      {
        title: "1. ¿Aplica una política de cookies?",
        paragraphs: [
          "Sí, de forma breve: aunque no instalamos cookies de seguimiento, el navegador puede guardar datos técnicos locales. Si en el futuro añadimos cookies no esenciales (por ejemplo, un medidor de visitas), pediremos tu consentimiento antes de activarlas.",
        ],
      },
      {
        title: "2. Qué usamos ahora",
        paragraphs: [
          "Almacenamiento de sesión (sessionStorage) para recordar la posición de scroll en la landing al recargar la página. No identifica a una persona y se borra al cerrar la pestaña.",
          "Cookies técnicas propias que el servidor o el navegador puedan crear para seguridad de la sesión HTTPS. Son necesarias para el funcionamiento y no requieren casilla adicional.",
        ],
      },
      {
        title: "3. Brevo y el correo",
        paragraphs: [
          "El alta a la lista de contacto se hace en el servidor, no con un píxel en esta landing. Brevo enviará un correo de confirmación (doble opt-in). Ese correo puede incluir enlaces de Brevo; no coloca cookies de marketing en esta web por sí solo.",
        ],
      },
      {
        title: "4. Cómo borrarlos",
        paragraphs: [
          "Puedes borrar datos del sitio desde la configuración de tu navegador (datos de sitios o cookies). Eso no elimina el contacto ya confirmado en Brevo: para eso ejerce tus derechos ARCO en la Política de Privacidad.",
        ],
      },
    ],
  },
};

export const legalNav = [
  { to: "/privacidad", label: "Privacidad" },
  { to: "/terminos", label: "Términos" },
  { to: "/cookies", label: "Cookies" },
];
