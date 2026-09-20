<script setup>
import NeighborForm from "@/components/NeighborForm.vue";
import { faqs } from "@/data/content";
</script>

<template>
  <section class="page-hero">
    <img src="/assets/blog-clarity.jpg" alt="Mapa de barrio sobre una cartulina" width="1920" height="980">
    <div class="wrap">
      <p class="pill pill-light">Contacto</p>
      <h1>Dateá un parque de tu zona</h1>
    </div>
  </section>

  <NeighborForm />

  <section class="process">
    <div class="wrap">
      <p v-reveal class="eyebrow">Preguntas frecuentes</p>
      <h2 v-reveal>Antes de escribir</h2>
      <div class="faq">
        <details v-for="item in faqs" :key="item.q">
          <summary>{{ item.q }}</summary>
          <div class="faq-body">
            <p>{{ item.a }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
