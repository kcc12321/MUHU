<script setup>
import { projects } from "@/data/home";
</script>

<template>
  <section id="proyectos" class="seed-projects" aria-labelledby="projects-title">
    <div class="wrap">
      <div v-reveal>
        <p class="eyebrow section-kicker">02 / De la idea al espacio</p>
        <h2 id="projects-title">Proyectos que transforman espacios y oportunidades</h2>
        <p class="seed-projects-note">Iniciativa en preparación y trayectoria del equipo. El material visual es referencial hasta contar con fichas e imágenes verificadas de MUHU.</p>
      </div>
      <div class="seed-project-grid">
        <article v-for="(project, index) in projects" :key="project.id" v-reveal="`reveal-delay-${index + 1}`" class="seed-project-card">
          <figure>
            <img :src="project.image" :alt="project.alt" width="960" height="640" loading="lazy" decoding="async">
          </figure>
          <div class="seed-project-copy">
            <p class="seed-project-status">{{ project.status }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
