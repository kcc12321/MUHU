<script setup>
import { mission } from "@/data/content";
</script>

<template>
  <section class="about">
    <div class="wrap about-grid">
      <div v-reveal>
        <p class="pill">Nuestro propósito</p>
        <h2>Infraestructura que da vida</h2>
        <p class="lede">{{ mission }}</p>
        <router-link class="btn btn-dark" to="/proposito">Leer el propósito</router-link>
      </div>
      <figure v-reveal="'clip reveal-delay-2'">
        <img src="/assets/about.jpg" alt="Planta creciendo entre el hormigón" width="660" height="700">
      </figure>
    </div>
  </section>
</template>
