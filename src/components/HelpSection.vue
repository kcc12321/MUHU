<script setup>
import { donationSteps } from "@/data/home";
import Icon from "@/components/Icon.vue";
import ActionButton from "@/components/ActionButton.vue";
</script>
<template>
  <section id="quiero-ayudar" class="help-section" aria-labelledby="help-title">
    <div class="wrap">
      <div class="help-heading" v-reveal>
        <h2 id="help-title">Tu apoyo puede ayudar a convertir una idea en un espacio que <em>transforma vidas.</em></h2>
        <p class="lede">MUHU está desarrollando sus primeras iniciativas. Tus aportes ayudarán a preparar y ejecutar proyectos sociales.</p>
      </div>
      <ol class="help-steps">
        <li v-for="step in donationSteps" :key="step.title" v-reveal>
          <Icon :name="step.icon" />
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </div>
        </li>
      </ol>
      <ActionButton tone="yellow" to="/#contacto-vecinos">Quiero ayudar</ActionButton>
    </div>
  </section>
</template>
