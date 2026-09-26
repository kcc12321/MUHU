const phoneOk = (value) => !value.trim() || /^\+?[\d\s().-]{7,20}$/.test(value.trim());

export function validateContact(form) {
  return {
    firstName: form.firstName.trim() ? "" : "Ingresa tu nombre.",
    lastName: form.lastName.trim() ? "" : "Ingresa tu apellido.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? "" : "Ingresa un correo electrónico válido.",
    phone: phoneOk(form.phone || "") ? "" : "Ingresa un celular válido o déjalo vacío.",
    privacy: form.privacy ? "" : "Debes aceptar la Política de Privacidad para enviar el formulario.",
  };
}
// Solo un backend del mismo origen; sin servicios externos ni secretos públicos.
export function resolveContactEndpoint(value, origin) {
  if (!value) return null;
  try {
    const endpoint = new URL(value, origin);
    if (endpoint.origin !== origin || endpoint.username || endpoint.password || endpoint.hash) return null;
    return endpoint.href;
  } catch { return null; }
}
export async function sendContact(endpoint, payload, requestId, signal) {
  const response = await fetch(endpoint, {
    method: 'POST', credentials: 'same-origin', redirect: 'error',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Idempotency-Key': requestId },
    body: JSON.stringify(payload), signal,
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) throw new Error('unconfirmed');
}
