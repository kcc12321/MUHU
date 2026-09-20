<script setup>
import { brand, ticker } from "@/data/content";
import RollText from "@/components/RollText.vue";
</script>

<template>
  <section class="hero" id="top">
    <img
      class="hero-img"
      src="/assets/hero.jpg"
      alt="Familia en un parque recuperado"
      width="1920"
      height="980"
    >
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="pill pill-light">ONG · Infraestructura pública</p>
        <h1><RollText :text="brand.slogan" mode="enter" /></h1>
        <div class="hero-actions">
          <span class="hero-cta">
            <router-link v-magnetic class="btn btn-yellow" to="/proposito">Ver propósito</router-link>
          </span>
          <span class="hero-cta">
            <router-link v-magnetic class="btn btn-white" to="/contacto">Proponer un parque</router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        <span v-for="(item, index) in [...ticker, ...ticker]" :key="`${item}-${index}`">{{ item }}</span>
      </div>
    </div>
  </section>
</template>
