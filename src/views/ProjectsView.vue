<script setup>
import Icon from "@/components/Icon.vue";
import { currentProject, roadmap } from "@/data/content";
</script>

<template>
  <section class="page-hero">
    <img src="/assets/project-hawthorn.jpg" alt="Obra de parque en curso" width="1920" height="980">
    <div class="wrap">
      <p class="pill pill-light">Proyectos</p>
      <h1>Hoja de ruta 2026</h1>
    </div>
  </section>

  <section class="process">
    <div class="wrap">
      <p v-reveal class="eyebrow">Metas de fin de año</p>
      <h2 v-reveal>Tres diagnósticos, un parque inaugurado</h2>
      <ol v-reveal class="timeline">
        <li v-for="(item, index) in roadmap" :key="item.when" :style="{ '--i': index }">
          <span>{{ item.when }}</span>
          <div>
            <span class="stat-icon stat-icon-sm"><Icon :name="item.icon" /></span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="projects">
    <div class="wrap">
      <p v-reveal class="eyebrow">En obra</p>
      <h2 v-reveal>{{ currentProject.name }}</h2>
      <p v-reveal class="lede">{{ currentProject.place }} · {{ currentProject.status }}</p>
      <div class="project-grid">
        <article v-for="(image, index) in currentProject.images" :key="image" v-reveal="index ? `clip reveal-delay-${index + 1}` : 'clip'">
          <img :src="image" :alt="currentProject.name" width="960" height="490">
        </article>
      </div>
    </div>
  </section>
</template>
