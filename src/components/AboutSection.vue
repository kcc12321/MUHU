<script setup>
import { aboutImage } from '@/data/home';
import ActionButton from '@/components/ActionButton.vue';
</script>
<template>
  <section id="nosotros" class="about home-about" aria-labelledby="about-title">
    <div class="wrap about-grid">
      <div v-reveal>
        <p class="eyebrow section-kicker">01 / Quiénes somos</p>
        <h2 id="about-title">El diseño puede abrir <em>nuevas posibilidades.</em></h2>
        <p class="lede">MUHU es una asociación sin fines de lucro dedicada al desarrollo de infraestructura social y espacios dignos para poblaciones vulnerables.</p>
        <p class="lede">Unimos diseño, arquitectura y propósito social. Contamos con autorización vigente como entidad perceptora de donaciones y emitimos comprobantes de recepción de donaciones.</p>
        <ActionButton to="/nosotros">Conoce más sobre MUHU <span aria-hidden="true">↗</span></ActionButton>
      </div>
      <figure v-reveal="'clip reveal-delay-2'"><img :src="aboutImage.src" :alt="aboutImage.alt" width="660" height="700" loading="lazy" decoding="async"><figcaption>Espacios para compartir. Fotografía referencial.</figcaption></figure>
    </div>
    <div id="nosotros-equipo" class="wrap team-note" tabindex="-1"><p class="section-kicker">Las personas detrás del propósito</p><p><strong>Caio y Rossina, directores de MUHU,</strong> aportan su trayectoria en proyectos sociales y arquitectónicos anteriores a la asociación. Esa experiencia pertenece al equipo y no se presenta como obras ejecutadas por MUHU.</p></div>
  </section>
</template>
