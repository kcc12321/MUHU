<script setup>
import { donationSteps } from '@/data/home';
import Icon from '@/components/Icon.vue';
import ActionButton from '@/components/ActionButton.vue';
import { asset } from '@/lib/assets';
</script>

<template>
  <section id="quiero-ayudar" class="help-section" aria-labelledby="help-title">
    <div class="wrap">
      <!-- Encabezado con imagen referencial al costado -->
      <div class="help-header-grid">
        <div class="help-heading" v-reveal="'left'">
          <p class="eyebrow section-kicker">03 / Construyámoslo juntos</p>
          <h2 id="help-title">
            Tu apoyo puede ayudar a convertir una idea en un espacio que <em>transforma vidas.</em>
          </h2>
          <p class="lede">
            MUHU está desarrollando sus primeras iniciativas. Tus aportes ayudarán a formular, diseñar y ejecutar proyectos sociales con impacto perdurable y beneficio tributario certificado por la SUNAT.
          </p>
          <div class="help-header-actions">
            <ActionButton tone="yellow" to="/#contacto-vecinos">
              Quiero ayudar <span aria-hidden="true">↗</span>
            </ActionButton>
            <ActionButton tone="white" to="/nosotros#transparencia">
              Ver beneficio tributario
            </ActionButton>
          </div>
        </div>

        <!-- Imagen referencial con diseño orgánico e inspirador -->
        <div class="help-visual-col" v-reveal="'right reveal-delay-1'">
          <figure class="help-feature-figure">
            <div class="help-img-box">
              <img
                :src="asset('/assets/help-transform.jpg')"
                alt="Comunidad y voluntarios colaborando en la transformación de espacios públicos"
                width="640"
                height="420"
                loading="lazy"
                class="help-hero-img"
              />
              <div class="help-img-overlay"></div>
              <span class="help-badge-pill">✦ Fotografía referencial</span>
            </div>
            <figcaption class="help-caption">
              “La arquitectura social cobra vida cuando la comunidad y los aliados se unen con un mismo propósito de dignidad y bienestar.”
            </figcaption>
          </figure>
        </div>
      </div>

      <!-- Tarjetas explicativas de las 3 etapas para sumarse -->
      <div class="partner-cards help-cards">
        <article
          v-for="(step, index) in donationSteps"
          :key="step.title"
          v-reveal="`scale reveal-delay-${index + 1}`"
          class="partner-card"
        >
          <div class="help-card-top">
            <Icon :name="step.icon" />
            <span aria-hidden="true">0{{ index + 1 }}</span>
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
