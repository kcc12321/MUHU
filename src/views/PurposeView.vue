<script setup>
import CountUp from "@/components/CountUp.vue";
import Icon from "@/components/Icon.vue";
import { brand, mission, pillars, problemStats, vision } from "@/data/content";
import { asset } from "@/lib/assets";
</script>

<template>
  <section class="page-hero">
    <img :src="asset('/assets/cta.jpg')" alt="Comunidad en un espacio recuperado" width="1421" height="690">
    <div class="wrap">
      <p class="pill pill-light">Nuestro propósito</p>
      <h1>Por qué recuperamos espacios públicos</h1>
    </div>
  </section>

  <section class="stats">
    <div class="wrap">
      <p v-reveal class="eyebrow">La evidencia que usamos de template</p>
      <h2 v-reveal>Sin verde seguro, el barrio se encoge</h2>
      <p v-reveal class="lede">{{ brand.demoNote }}</p>
      <div class="stats-grid">
        <article v-for="(stat, index) in problemStats" :key="stat.label" v-reveal="`reveal-delay-${index + 1}`" class="stat-card">
          <span class="stat-icon"><Icon :name="stat.icon" /></span>
          <p class="stat-label">{{ stat.label }}</p>
          <b><CountUp :to="stat.to" :suffix="stat.suffix" /></b>
          <span>{{ stat.copy }}</span>
        </article>
      </div>
    </div>
  </section>

  <section class="process">
    <div class="wrap">
      <p v-reveal class="eyebrow">Metodología</p>
      <h2 v-reveal>Tres pilares del cambio</h2>
      <div class="pillars">
        <article v-for="(pillar, index) in pillars" :key="pillar.title" v-reveal="`reveal-delay-${index + 1}`" class="partner-card">
          <span class="stat-icon"><Icon :name="pillar.icon" /></span>
          <h3>{{ pillar.title }}</h3>
          <p class="lede">{{ pillar.copy }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="about">
    <div class="wrap">
      <p v-reveal class="eyebrow">Efecto semilla</p>
      <h2 v-reveal>Misión y visión</h2>
      <div class="seed-grid">
        <div v-reveal>
          <h3>Misión</h3>
          <p class="lede">{{ mission }}</p>
        </div>
        <div v-reveal="'reveal-delay-2'">
          <h3>Visión</h3>
          <p class="lede">{{ vision }}</p>
        </div>
      </div>
      <div class="hero-actions" style="margin-top: 32px">
        <router-link class="btn btn-dark" to="/empresas">Sumar a tu empresa</router-link>
        <router-link class="btn btn-yellow" to="/contacto">Escribirnos</router-link>
      </div>
    </div>
  </section>
</template>
