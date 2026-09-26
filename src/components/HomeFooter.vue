<script setup>
import { brand } from '@/data/content';
import { contact, homeNav } from '@/data/home';
import { legalNav } from '@/data/legal';
</script>
<template>
  <footer class="site-footer home-footer">
    <div class="wrap footer-grid">
      <div><RouterLink class="brand-mark" to="/#top" aria-label="MUHU inicio"><span aria-hidden="true"></span>{{ brand.name }}</RouterLink><p>{{ brand.slogan }}</p><p>Arquitectura y espacios dignos al servicio de las personas.</p></div>
      <nav aria-label="Pie de página"><p class="footer-label">Explora MUHU</p><ul><li v-for="item in homeNav" :key="item.to"><RouterLink :to="item.to">{{ item.label }}</RouterLink></li></ul></nav>
      <div><p class="footer-label">Construyamos juntos</p><p>Entidad perceptora de donaciones. Emitimos comprobantes de recepción de donaciones por los aportes confirmados.</p><p v-if="contact.email"><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p><p v-if="contact.ruc">RUC: {{ contact.ruc }}</p><ul v-if="contact.socialLinks.length"><li v-for="social in contact.socialLinks" :key="social.href"><a :href="social.href" target="_blank" rel="noopener noreferrer">{{ social.label }}</a></li></ul></div>
    </div>
    <div class="wrap footer-legal">
      <p>© {{ new Date().getFullYear() }} MUHU · Asociación sin fines de lucro · RUC: 20611534354 · Partida Registral N° 15381975 (Oficina Registral de Lima)</p>
      <nav class="legal-links" aria-label="Documentos legales">
        <RouterLink v-for="item in legalNav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>
