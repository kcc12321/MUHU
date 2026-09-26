<script setup>
import { computed, nextTick, onUnmounted, reactive, ref } from 'vue';
import { contact } from '@/data/home';
import { resolveContactEndpoint, sendContact, validateContact } from '@/lib/contact';
import ActionButton from '@/components/ActionButton.vue';
const form = reactive({ firstName: '', lastName: '', email: '', phone: '', country: '', message: '', website: '', privacy: false });
const errors = reactive({ firstName: '', lastName: '', email: '', phone: '', privacy: '' });
const fields = [
  { key: 'firstName', label: 'Nombre', autocomplete: 'given-name', type: 'text', max: 100 },
  { key: 'lastName', label: 'Apellido', autocomplete: 'family-name', type: 'text', max: 100 },
  { key: 'email', label: 'Correo electrónico', autocomplete: 'email', type: 'email', max: 254 },
];
const loading = ref(false), status = ref(''), success = ref(false), statusEl = ref(null), formEl = ref(null), cooldown = ref(false);
const endpoint = computed(() => resolveContactEndpoint(contact.endpoint, window.location.origin));
let controller, timeout, cooldownTimer;
let lastPayload = '', pendingPayload = '', requestId = '';
const announce = async (message, ok = false) => {
  status.value = message; success.value = ok;
  await nextTick(); statusEl.value?.focus();
};
const submit = async () => {
  if (loading.value || cooldown.value) return;
  status.value = ''; success.value = false;
  Object.assign(errors, validateContact(form));
  if (Object.values(errors).some(Boolean)) {
    await nextTick(); formEl.value?.querySelector('[aria-invalid="true"]')?.focus(); return;
  }
  if (form.website) return announce('No se pudo procesar la solicitud. Revisa los campos e inténtalo de nuevo.');
  if (!endpoint.value) return announce('El envío desde esta web aún no está disponible. No se han enviado tus datos.');
  const payload = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    country: form.country.trim(),
    message: form.message.trim(),
    privacy: true,
  };
  const fingerprint = JSON.stringify(payload);
  if (fingerprint === lastPayload) return announce('Este mensaje ya fue recibido. No hace falta volver a enviarlo.');
  if (fingerprint !== pendingPayload) { pendingPayload = fingerprint; requestId = crypto.randomUUID(); }
  loading.value = true; controller = new AbortController();
  timeout = setTimeout(() => controller.abort(), 15000);
  try {
    await sendContact(endpoint.value, payload, requestId, controller.signal);
    lastPayload = fingerprint;
    Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', country: '', message: '', website: '', privacy: false });
    await announce('Gracias por tu interés en MUHU. Hemos recibido tus datos y nuestro equipo se pondrá en contacto contigo.', true);
  } catch {
    await announce('No pudimos confirmar la recepción. Conservamos lo que escribiste para que puedas reintentar.');
  } finally {
    clearTimeout(timeout); loading.value = false; cooldown.value = true;
    cooldownTimer = setTimeout(() => { cooldown.value = false; }, 5000);
  }
};
onUnmounted(() => { controller?.abort(); clearTimeout(timeout); clearTimeout(cooldownTimer); });
</script>
<template>
  <section id="contacto-vecinos" class="quote home-contact" aria-labelledby="contact-title" tabindex="-1"><div class="wrap quote-grid">
    <div v-reveal><h2 id="contact-title">El primer paso<br>es <em>conectar.</em></h2><p class="lede">Cuéntanos cómo te gustaría ayudar. Podemos conversar sobre donaciones, colaboración y nuevas posibilidades para MUHU.</p><p v-if="contact.email" class="contact-email"><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p><p v-if="!endpoint" class="contact-availability">El formulario estará disponible próximamente.<template v-if="contact.email"> Mientras tanto, puedes escribirnos al correo indicado.</template><template v-else> Publicaremos aquí nuestro canal oficial de contacto.</template></p></div>
    <form ref="formEl" v-reveal="'reveal-delay-2'" class="quote-form" novalidate :aria-busy="loading" @submit.prevent="submit">
      <p class="form-intro">Los campos con * son obligatorios.</p>
      <fieldset :disabled="loading"><div class="contact-field-grid">
        <div v-for="field in fields" :key="field.key" class="field" :class="{ 'is-invalid': errors[field.key], 'field-wide': field.key === 'email' }"><label :for="`contact-${field.key}`">{{ field.label }} *</label><input :id="`contact-${field.key}`" v-model="form[field.key]" :type="field.type" :autocomplete="field.autocomplete" :maxlength="field.max" :name="field.key" required :aria-invalid="Boolean(errors[field.key])" :aria-describedby="`error-${field.key}`" @input="errors[field.key] = ''; status = ''"><p :id="`error-${field.key}`" class="field-error">{{ errors[field.key] }}</p></div>
      </div>
      <div class="field"><label for="contact-phone">Celular <span>(opcional)</span></label><input id="contact-phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel" maxlength="20" inputmode="tel" :aria-invalid="Boolean(errors.phone)" aria-describedby="error-phone" @input="errors.phone = ''; status = ''"><p id="error-phone" class="field-error">{{ errors.phone }}</p></div>
      <div class="field"><label for="contact-country">País <span>(opcional)</span></label><input id="contact-country" v-model="form.country" name="country" autocomplete="country-name" maxlength="100"></div>
      <div class="field"><label for="contact-message">Mensaje <span>(opcional)</span></label><textarea id="contact-message" v-model="form.message" name="message" rows="4" maxlength="3000" placeholder="Me gustaría colaborar…"></textarea></div>
      <div class="form-trap" aria-hidden="true"><label for="contact-website">Deja este campo vacío</label><input id="contact-website" v-model="form.website" tabindex="-1" autocomplete="off" name="website"></div>
      <p class="privacy-notice">Tus datos se envían de forma cifrada (HTTPS) al servidor de MUHU y, cuando el canal esté activo, a Brevo solo como encargado para responderte. Lee la <RouterLink to="/privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</RouterLink> completa.</p>
      <div class="field field-consent" :class="{ 'is-invalid': errors.privacy }">
        <label class="consent-label" for="contact-privacy">
          <input id="contact-privacy" v-model="form.privacy" type="checkbox" name="privacy" required :aria-invalid="Boolean(errors.privacy)" aria-describedby="error-privacy" @change="errors.privacy = ''; status = ''">
          <span>He leído y acepto la Política de Privacidad y el tratamiento de mis datos personales.</span>
        </label>
        <p class="consent-doc"><RouterLink to="/privacidad" target="_blank" rel="noopener noreferrer">Abrir la Política de Privacidad</RouterLink></p>
        <p id="error-privacy" class="field-error">{{ errors.privacy }}</p>
      </div>
      <ActionButton type="submit" tone="yellow" class="btn-full" :disabled="loading || cooldown || !endpoint">{{ loading ? 'Enviando…' : !endpoint ? 'Envío disponible próximamente' : cooldown ? 'Espera unos segundos…' : 'Enviar mensaje' }}</ActionButton>
      </fieldset>
      <p v-if="status" ref="statusEl" class="form-feedback" :class="{ 'is-success': success }" role="status" aria-live="polite" tabindex="-1">{{ status }}</p>
    </form>
  </div></section>
</template>
