<script setup>
import { brand } from "@/data/content";
</script>

<template>
  <section v-reveal="'clip'" class="cta-band">
    <img src="/assets/satisfaction.jpg" alt="Manos trabajando en un espacio verde" width="1920" height="800">
    <div v-reveal class="cta-copy">
      <h2>{{ brand.slogan }}</h2>
      <p>Recuperamos espacios públicos para que el barrio vuelva a usarse.</p>
      <router-link v-magnetic class="btn btn-yellow" :to="{ path: '/', hash: '#contacto-vecinos' }">Proponer un parque</router-link>
    </div>
  </section>
</template>
