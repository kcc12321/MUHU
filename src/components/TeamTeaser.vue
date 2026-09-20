<script setup>
import { founder } from "@/data/content";
</script>

<template>
  <section class="insights">
    <div class="wrap about-grid">
      <figure v-reveal>
        <img src="/assets/why.jpg" alt="Equipo MUHU en el predio" width="728" height="694">
      </figure>
      <div v-reveal="'reveal-delay-2'">
        <p class="eyebrow">Quiénes somos</p>
        <blockquote>
          <p>“{{ founder.quote }}”</p>
        </blockquote>
        <p class="lede">{{ founder.name }}, {{ founder.role }}</p>
        <router-link class="btn btn-dark" to="/nosotros">Conocer al equipo</router-link>
      </div>
    </div>
  </section>
</template>
