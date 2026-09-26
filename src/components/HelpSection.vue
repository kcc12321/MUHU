<script setup>
import { donationSteps } from '@/data/home';
import Icon from '@/components/Icon.vue';
import ActionButton from '@/components/ActionButton.vue';
</script>
<template>
  <section id="quiero-ayudar" class="help-section" aria-labelledby="help-title"><div class="wrap">
    <div class="help-heading" v-reveal><p class="eyebrow section-kicker">03 / Construyámoslo juntos</p><h2 id="help-title">Tu apoyo puede ayudar a convertir una idea en un espacio que <em>transforma vidas.</em></h2><p class="lede">MUHU está desarrollando sus primeras iniciativas. Tus aportes ayudarán a preparar y ejecutar proyectos sociales.</p></div>
    <div class="partner-cards help-cards"><article v-for="(step, index) in donationSteps" :key="step.title" v-reveal="`reveal-delay-${index + 1}`" class="partner-card"><div class="help-card-top"><Icon :name="step.icon" /><span aria-hidden="true">0{{ index + 1 }}</span></div><h3>{{ step.title }}</h3><p>{{ step.copy }}</p></article></div>
    <ActionButton tone="yellow" to="/#contacto-vecinos">Quiero ayudar <span aria-hidden="true">↗</span></ActionButton>
  </div></section>
</template>
