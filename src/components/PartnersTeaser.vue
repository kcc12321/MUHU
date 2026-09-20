<script setup>
import Icon from "./Icon.vue";
import { partnerBenefits } from "@/data/content";
</script>

<template>
  <section class="why">
    <div class="wrap">
      <p v-reveal class="eyebrow">Empresas</p>
      <h2 v-reveal>Impacto social que potencia tu marca</h2>
      <div class="partner-cards">
        <article v-for="(item, index) in partnerBenefits" :key="item.title" v-reveal="`reveal-delay-${index + 1}`" class="partner-card">
          <span class="stat-icon"><Icon :name="item.icon" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
      <router-link class="btn btn-dark" to="/empresas">Soy una empresa</router-link>
    </div>
  </section>
</template>
