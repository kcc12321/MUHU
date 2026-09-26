# Portada de MUHU

Se conserva Vue 3, Vite, Vue Router, las fuentes, los colores verde/terracota,
las animaciones de texto, las apariciones al desplazarse y las transiciones de página.
No se añadieron dependencias.

## Alcance y contenido

- La portada contiene Inicio, Nosotros, Proyectos, Quiero ayudar y contacto.
- La navegación del encabezado y el pie utiliza anclas a la portada, también desde otras rutas.
- “Conoce más sobre MUHU” lleva a la información del equipo. “Ver proyectos”, debajo del carrusel, abre el catálogo ampliado dentro de la portada.
- La portada dejó de mostrar estadísticas, nombres, cronogramas y testimonios de demostración. Los componentes anteriores permanecen en el repositorio.
- Se distingue una ficha provisional de iniciativa en preparación de la trayectoria previa de Caio y Rossina. No hay obras ejecutadas ni fechas atribuidas a MUHU.
- Las demás vistas antiguas no fueron rediseñadas: aún contienen texto de demostración y requieren revisión antes de publicarlas como información institucional. No están enlazadas desde la nueva portada. Se conservaron sus rutas y componentes.
- El encabezado, el pie y la gestión de anclas son compartidos y sí se actualizaron.

## Configuración pendiente

Copiar `.env.example` a `.env.local`, completar los datos confirmados y reiniciar
Vite o volver a compilar. El prefijo `VITE_` hace públicas estas variables; no usar
credenciales ni claves SMTP en ellas.

| Variable | Qué completar |
| --- | --- |
| `VITE_MUHU_CONTACT_EMAIL` | Correo corporativo confirmado. Aparece en contacto, pie y aviso de privacidad. |
| `VITE_MUHU_FORM_ENDPOINT` | Ruta real del backend propio, por ejemplo `/api/contact`. Debe pertenecer al mismo origen de la web. |
| `VITE_MUHU_RUC` | Opcional: RUC confirmado para el pie. |

Mientras no haya endpoint, el botón de envío está deshabilitado y se explica que
el canal está pendiente. Configurar solo un correo **no** activa el envío.
No se integraron plataformas externas ni se enviaron correos de prueba.

### Contrato del backend

La aplicación envía `POST` con `Content-Type: application/json`, una cabecera
`Idempotency-Key` y este cuerpo:

```json
{
  "firstName": "Nombre",
  "lastName": "Apellido",
  "email": "persona@example.test",
  "country": "Perú",
  "message": "Consulta"
}
```

El backend debe validar los campos y longitudes, aplicar límites de frecuencia,
comprobar el origen, deduplicar `Idempotency-Key` y remitir o registrar la consulta
en el sistema institucional autorizado. Las credenciales de correo y el destino
real, por ejemplo `MUHU_CONTACT_EMAIL`, se configuran en el **servidor**.

Responder con HTTP 2xx y JSON `{"ok":true}` únicamente después de aceptar la
consulta de forma fiable. Una página HTML de fallback, un JSON vacío o un estado
de error nunca producen una confirmación. El navegador cancela la espera a los
15 segundos y conserva los datos para reintentar con la misma clave si el cuerpo
no cambió. También bloquea solicitudes simultáneas, aplica una espera de 5 segundos
y evita repetir el último mensaje confirmado durante esa sesión del componente.
Estas protecciones del cliente no sustituyen las del servidor.

El aviso de privacidad explica el flujo implementado. Antes de habilitar el canal,
completar el correo de atención y adaptar el aviso al tratamiento efectivo del backend.

## Reemplazar contenido e imágenes

Editar `src/data/home.js`: diapositivas del hero, imagen institucional, proyectos,
etiquetas, estados, fechas opcionales, descripciones y enlaces sociales.
Las imágenes reutilizadas de `public/assets` están rotuladas como referenciales.
No se descargaron fotos nuevas ni se verificó la licencia de los archivos de origen;
sustituirlas por fotografías propias/autorizadas antes de la publicación definitiva.
No se muestran correo, RUC o redes ficticios mientras sus valores estén vacíos.

## Archivos modificados

- `.gitignore`: exclusión de configuración local.
- `index.html`: descripción institucional.
- `src/App.vue`: pie actualizado y foco compatible con anclas.
- `src/main.js`: carga de estilos de portada.
- `src/router/index.js`: navegación a secciones tras la transición y foco accesible.
- `src/views/HomeView.vue`: composición de la nueva portada.
- `src/components/SiteHeader.vue`: cuatro enlaces, menú móvil, Escape y foco.

## Archivos añadidos

- `.env.example` y `ENTREGA-MUHU.md`.
- `src/data/home.js` y `src/home.css`.
- `src/lib/contact.js` y `tests/contact.test.mjs`.
- `src/components/ActionButton.vue` y `CarouselControls.vue`.
- `src/components/HomeHero.vue` y `AboutSection.vue`.
- `src/components/ProjectCard.vue` y `ProjectsShowcase.vue`.
- `src/components/HelpSection.vue`, `ContactForm.vue` y `HomeFooter.vue`.

## Verificaciones

- Compilación de producción con `npm run build`.
- Cinco pruebas con `node --test tests/contact.test.mjs`: validación, restricción
  del destino, respuestas falsas/erróneas, contrato de petición y fallo de red.
- Inspección visual en escritorio (1440 × 900), tablet (768 × 1024) y móvil
  (390 × 844), sin desbordamiento horizontal de la página.
- Menú móvil de cuatro enlaces, cierre al navegar y foco en el campo Nombre al
  acceder al formulario.
- Anclas de la portada e imágenes comprobadas sin destinos rotos.
- Carrusel de proyectos con botones, teclado, scroll snap y cambio coordinado por
  scroll vertical en escritorio con altura suficiente; el CTA permanece junto al carrusel.
- Sin errores ni avisos de consola en la portada durante las comprobaciones.
- Formulario sin configuración deshabilitado, con explicación visible.
- En un servidor exclusivo de pruebas local: campos vacíos, carga con bloqueo de
  envío, respuesta 503 con conservación de datos y respuesta confirmada con limpieza.
  Ese servidor no forma parte del código de producción y no envía correos.

La entrega prepara la integración del formulario; no incluye un backend de correo
operativo porque el proyecto original no tenía uno ni se facilitó un destino real.
