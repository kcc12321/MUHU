<script setup>
import { currentProject } from "@/data/content";
</script>

<template>
  <section class="projects" id="proyecto">
    <div class="wrap">
      <div class="section-row">
        <div v-reveal>
          <p class="eyebrow">Proyecto actual</p>
          <h2>{{ currentProject.name }}</h2>
          <p class="lede">{{ currentProject.place }} · {{ currentProject.status }}</p>
        </div>
        <div v-reveal>
          <router-link class="btn btn-dark" to="/proyectos">Ver cronograma</router-link>
        </div>
      </div>
      <div class="project-grid">
        <article v-for="(image, index) in currentProject.images" :key="image" v-reveal="index ? `clip reveal-delay-${index + 1}` : 'clip'">
          <img :src="image" :alt="currentProject.name" width="960" height="490">
        </article>
      </div>
      <p v-reveal class="lede">{{ currentProject.copy }}</p>
    </div>
  </section>
</template>
