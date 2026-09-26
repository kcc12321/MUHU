<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { brand } from '@/data/content';
import { contact, homeNav } from '@/data/home';
const privacyOpen = ref(false);
const route = useRoute();
watch(() => route.hash, () => { if (route.hash === '#privacidad') privacyOpen.value = true; }, { immediate: true });
</script>
<template>
  <footer class="site-footer home-footer">
    <div class="wrap footer-grid">
      <div><RouterLink class="brand-mark" to="/#top" aria-label="MUHU inicio"><span aria-hidden="true"></span>{{ brand.name }}</RouterLink><p>{{ brand.slogan }}</p><p>Arquitectura y espacios dignos al servicio de las personas.</p></div>
      <nav aria-label="Pie de página"><p class="footer-label">Explora MUHU</p><ul><li v-for="item in homeNav" :key="item.to"><RouterLink :to="item.to">{{ item.label }}</RouterLink></li></ul></nav>
      <div><p class="footer-label">Construyamos juntos</p><p>Entidad perceptora de donaciones. Emitimos comprobantes de recepción de donaciones por los aportes confirmados.</p><p v-if="contact.email"><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p><p v-if="contact.ruc">RUC: {{ contact.ruc }}</p><ul v-if="contact.socialLinks.length"><li v-for="social in contact.socialLinks" :key="social.href"><a :href="social.href" target="_blank" rel="noopener noreferrer">{{ social.label }}</a></li></ul></div>
    </div>
    <div class="wrap footer-legal"><p>© {{ new Date().getFullYear() }} MUHU · Asociación sin fines de lucro · RUC: 20611534354 · Partida Registral N° 15381975 (Oficina Registral de Lima)</p><RouterLink to="/#privacidad" @click="privacyOpen = true">Política de privacidad</RouterLink></div>
    <details id="privacidad" class="wrap privacy-details" :open="privacyOpen" @toggle="privacyOpen = $event.target.open"><summary>Privacidad del formulario</summary><div><p>MUHU utilizará tu nombre, apellido, correo electrónico y los datos opcionales que proporciones para atender tu consulta y contactarte sobre ella.</p><p>Esta página no guarda el contenido del formulario en el navegador ni lo envía mientras el canal de recepción no esté habilitado. Una vez habilitado, los datos se enviarán al servidor de MUHU.</p><p v-if="contact.email">Para consultar sobre el uso de tus datos o solicitar su actualización o eliminación, escribe a <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>.</p><p v-else>El canal oficial para consultas sobre tus datos se publicará aquí antes de habilitar la recepción de mensajes.</p></div></details>
  </footer>
</template>
