<script setup>
import CountUp from "@/components/CountUp.vue";
import { documents, team, transparency } from "@/data/content";
</script>

<template>
  <section class="page-hero">
    <img src="/assets/why.jpg" alt="Equipo MUHU con vecinos en el predio" width="728" height="694">
    <div class="wrap">
      <p class="pill pill-light">Nosotros</p>
      <h1>Quiénes están detrás de MUHU</h1>
    </div>
  </section>

  <section class="about">
    <div class="wrap">
      <p v-reveal class="eyebrow">Equipo</p>
      <h2 v-reveal>Cuatro roles, un mismo predio</h2>
      <div class="team-grid">
        <article v-for="(person, index) in team" :key="person.name" v-reveal="index ? `clip reveal-delay-${index}` : 'clip'">
          <img :src="person.image" :alt="person.name">
          <h3>{{ person.name }}</h3>
          <p>{{ person.role }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="stats">
    <div class="wrap">
      <p v-reveal class="eyebrow">Transparencia</p>
      <h2 v-reveal>A dónde van los fondos</h2>
      <div class="transparency">
        <div v-reveal class="fund-bars">
          <div v-for="(item, index) in transparency" :key="item.label" :style="{ '--i': index }">
            <p>{{ item.label }} · <CountUp :to="item.value" suffix="%" /></p>
            <div class="bar" aria-hidden="true"><span :style="{ '--bar': `${item.value}%` }"></span></div>
          </div>
        </div>
        <div v-reveal="'reveal-delay-2'">
          <p class="eyebrow">Documentos</p>
          <ul>
            <li v-for="doc in documents" :key="doc.title">
              <a :href="doc.href">{{ doc.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
