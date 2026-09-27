<script setup>
import ContactForm from "@/components/ContactForm.vue";
import { faqs } from "@/data/content";
</script>

<template>
  <div class="contact-page">
    <section class="page-hero contact-hero" aria-labelledby="contact-hero-title">
      <img src="/assets/hero.jpg" alt="Contacto institucional Asociación MUHU" width="1920" height="980" fetchpriority="high" decoding="async">
      <div class="wrap">
        <p class="pill pill-light">Contacto Institucional</p>
        <h1 id="contact-hero-title">Hablemos de nuevos <em>proyectos y colaboración</em></h1>
        <p class="lede contact-hero-subtitle">
          Canalizamos iniciativas y recursos para diseñar y construir espacios dignos. Contáctanos para alianzas, donaciones con beneficio tributario oficial ante la SUNAT o formulación de infraestructura social.
        </p>
      </div>
    </section>

    <!-- Formulario de Contacto Real -->
    <ContactForm />

    <!-- Preguntas Frecuentes Institucionales con Animaciones Enriquecidas -->
    <section class="process contact-faqs" aria-labelledby="faq-title">
      <div class="wrap">
        <div class="section-header" v-reveal>
          <div class="section-kicker-row">
            <p class="section-kicker">Transparencia &amp; Gestión</p>
            <span class="chapter-tag tag-clay">Respuestas Claras</span>
          </div>
          <h2 id="faq-title">Preguntas <em>Frecuentes</em></h2>
          <p class="section-subtitle">Información clave sobre cómo colaboramos con aliados, empresas y municipios.</p>
        </div>

        <div class="faq-cards-stack">
          <details
            v-for="(item, index) in faqs"
            :key="item.q"
            class="faq-card-animated"
            v-reveal="`scale reveal-delay-${(index % 4) + 1}`"
          >
            <summary class="faq-summary-row">
              <span class="faq-question-text">{{ item.q }}</span>
              <span class="faq-badge-bubble" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </summary>
            <div class="faq-body-wrapper">
              <div class="faq-content-inner">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  min-height: 440px;
  padding: 160px 0 72px;
  background: var(--ink);
  color: #fff;
}

.contact-hero h1 {
  font-size: clamp(40px, 5.5vw, 72px);
  margin: 16px 0 20px;
  line-height: 1.08;
}

.contact-hero em {
  font-family: 'Playfair Display', serif;
  color: #f0b48f;
  font-style: italic;
  font-weight: 500;
}

.contact-hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  max-width: 54ch;
  font-size: 18px;
  line-height: 1.6;
}

.contact-faqs {
  padding: 88px 0;
  background: transparent !important;
  border-top: 1px solid var(--rule);
}

.contact-faqs em {
  font-family: 'Playfair Display', serif;
  color: var(--clay);
  font-style: italic;
  font-weight: 500;
}

.section-kicker-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.chapter-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 12px;
  border-radius: 99px;
  line-height: 1.4;
}

.chapter-tag.tag-clay {
  background: #f8ece6;
  color: var(--clay);
  border: 1px solid rgba(169, 72, 37, 0.2);
}

/* Pila de Tarjetas FAQ Animadas */
.faq-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 36px;
  max-width: 900px;
}

.faq-card-animated {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(28, 26, 22, 0.09);
  border-radius: 18px;
  padding: 22px 26px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.25s ease, background-color 0.25s ease;
  user-select: none;
}

.faq-card-animated:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(28, 26, 22, 0.06);
  border-color: rgba(169, 72, 37, 0.25);
}

.faq-card-animated[open] {
  background: #ffffff;
  border-color: rgba(169, 72, 37, 0.35);
  border-left: 5px solid var(--clay);
  box-shadow: 0 14px 36px rgba(169, 72, 37, 0.08);
}

.faq-summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  cursor: pointer;
  list-style: none;
}

.faq-summary-row::-webkit-details-marker {
  display: none;
}

.faq-question-text {
  font-size: clamp(16px, 1.8vw, 19px);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.35;
  transition: color 0.2s ease;
}

.faq-card-animated:hover .faq-question-text {
  color: var(--clay);
}

.faq-card-animated[open] .faq-question-text {
  color: var(--clay);
}

/* Burbuja interactiva con rotación al abrir */
.faq-badge-bubble {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fdf3eb;
  color: var(--clay);
  border: 1px solid rgba(169, 72, 37, 0.15);
  display: grid;
  place-items: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  flex-shrink: 0;
}

.faq-card-animated:hover .faq-badge-bubble {
  background: #fae4d7;
  transform: scale(1.08);
}

.faq-card-animated[open] .faq-badge-bubble {
  transform: rotate(45deg) scale(1.05);
  background: var(--clay);
  color: #ffffff;
  border-color: var(--clay);
}

/* Expansión suave y gradual del contenido */
.faq-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-card-animated[open] .faq-body-wrapper {
  grid-template-rows: 1fr;
}

.faq-content-inner {
  overflow: hidden;
}

.faq-card-animated[open] .faq-content-inner p {
  margin: 16px 0 4px;
  padding-top: 16px;
  border-top: 1px dashed rgba(28, 26, 22, 0.1);
  color: var(--stone);
  font-size: 15px;
  line-height: 1.65;
  animation: faqAnswerFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes faqAnswerFade {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 640px) {
  .contact-hero {
    min-height: 400px;
    padding: 130px 0 56px;
  }
  .contact-faqs {
    padding: 64px 0;
  }
  .faq-card-animated {
    padding: 18px 18px;
    border-radius: 16px;
  }
  .faq-question-text {
    font-size: 16px;
  }
  .faq-badge-bubble {
    width: 30px;
    height: 30px;
  }
}
</style>
