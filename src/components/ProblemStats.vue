<script setup>
import CountUp from "./CountUp.vue";
import Icon from "./Icon.vue";
import { brand, problemStats } from "@/data/content";
</script>

<template>
  <section class="stats" aria-label="Datos de la problemática">
    <div class="wrap">
      <p v-reveal class="eyebrow">La problemática</p>
      <h2 v-reveal class="stats-title">
        <em>1 de cada 3</em>
        vecinos no tiene un parque seguro cerca
      </h2>
      <p v-reveal class="lede">{{ brand.demoNote }}</p>
      <div class="stats-grid">
        <article
          v-for="(stat, index) in problemStats"
          :key="stat.label"
          v-reveal="`reveal-delay-${index + 1}`"
          class="stat-card"
          :style="{ '--d': `${index * 0.18}s` }"
        >
          <span class="stat-icon"><Icon :name="stat.icon" /></span>
          <p class="stat-label">{{ stat.label }}</p>
          <b><CountUp :to="stat.to" :suffix="stat.suffix" /></b>
          <span>{{ stat.copy }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
