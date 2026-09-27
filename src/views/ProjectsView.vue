<script setup>
import { ref, computed } from "vue";
import Icon from "@/components/Icon.vue";
import ActionButton from "@/components/ActionButton.vue";
import { projectsData, plannedProjects, completedProjects } from "@/data/projects";
import { asset } from "@/lib/assets";

const activeFilter = ref("all"); // 'all' | 'planned' | 'completed'

// Carousel state per project
const activeSlides = ref({
  "cds-musa": 0,
  "casa-de-todos-acho": 0,
  "casa-de-todos-palomino": 0,
});

const nextSlide = (projectId, total) => {
  activeSlides.value[projectId] = ((activeSlides.value[projectId] || 0) + 1) % total;
};

const prevSlide = (projectId, total) => {
  activeSlides.value[projectId] = ((activeSlides.value[projectId] || 0) - 1 + total) % total;
};

const setSlide = (projectId, index) => {
  activeSlides.value[projectId] = index;
};

const filteredProjects = computed(() => {
  if (activeFilter.value === "planned") return plannedProjects;
  if (activeFilter.value === "completed") return completedProjects;
  return projectsData;
});

const setFilter = (filter) => {
  activeFilter.value = filter;
};
</script>

<template>
  <div class="projects-page">
    <!-- Hero Section -->
    <section class="page-hero projects-hero" aria-labelledby="projects-hero-title">
      <img
        :src="asset('/assets/projects/cds-musa.jpg')"
        alt="Infraestructura social y proyectos arquitectónicos de MUHU"
        width="1920"
        height="980"
        fetchpriority="high"
        decoding="async"
      />
      <div class="wrap hero-wrap">
        <div v-reveal>
          <p class="pill pill-light">Infraestructura &amp; Hábitat Social</p>
          <h1 id="projects-hero-title">Proyectos</h1>
          <p class="projects-hero-subtitle">
            Arquitectura con vocación de servicio. Desde intervenciones de acogida y hábitat definitivo hasta nuevos centros comunitarios sostenibles en Lima.
          </p>
          <!-- Quick Project Indicators -->
          <div class="hero-kpis">
            <div class="hero-kpi-item">
              <span class="kpi-num">01</span>
              <span class="kpi-desc">Proyecto Planificado (Musa · 20%)</span>
            </div>
            <div class="hero-kpi-divider" aria-hidden="true"></div>
            <div class="hero-kpi-item">
              <span class="kpi-num">02</span>
              <span class="kpi-desc">Proyectos Completados (Acho y Palomino)</span>
            </div>
            <div class="hero-kpi-divider" aria-hidden="true"></div>
            <div class="hero-kpi-item">
              <span class="kpi-num">100%</span>
              <span class="kpi-desc">Destino Social &amp; Beneficio Comunitario</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Controls & Filter Bar -->
    <section class="projects-filter-bar" aria-label="Filtro de proyectos">
      <div class="wrap">
        <div class="filter-wrapper">
          <div class="filter-buttons" role="tablist" aria-label="Filtrar por estado">
            <button
              type="button"
              role="tab"
              :aria-selected="activeFilter === 'all'"
              class="filter-pill"
              :class="{ 'is-active': activeFilter === 'all' }"
              @click="setFilter('all')"
            >
              <span>Todos los proyectos</span>
              <span class="filter-count">{{ projectsData.length }}</span>
            </button>
            <button
              type="button"
              role="tab"
              :aria-selected="activeFilter === 'planned'"
              class="filter-pill"
              :class="{ 'is-active': activeFilter === 'planned' }"
              @click="setFilter('planned')"
            >
              <span class="dot dot-amber" aria-hidden="true"></span>
              <span>Proyectos Planificados</span>
              <span class="filter-count">{{ plannedProjects.length }}</span>
            </button>
            <button
              type="button"
              role="tab"
              :aria-selected="activeFilter === 'completed'"
              class="filter-pill filter-pill-completed"
              :class="{ 'is-active': activeFilter === 'completed' }"
              @click="setFilter('completed')"
            >
              <span class="dot dot-green" aria-hidden="true"></span>
              <span>Proyectos Completados</span>
              <span class="filter-count">{{ completedProjects.length }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 1: PROYECTOS PLANIFICADOS -->
    <section
      v-if="activeFilter === 'all' || activeFilter === 'planned'"
      id="planificados"
      class="projects-section section-planned"
      aria-labelledby="planned-heading"
    >
      <div class="wrap">
        <div class="section-header" v-reveal>
          <div class="section-kicker-row">
            <span class="section-kicker">01 / Iniciativa en Desarrollo</span>
            <span class="status-badge badge-planned">
              <span class="pulse-dot" aria-hidden="true"></span>
              <span>En Planificación · 20%</span>
            </span>
          </div>
          <h2 id="planned-heading">Proyectos <em>Planificados</em></h2>
          <p class="section-subtitle">
            Iniciativas de infraestructura pública y comunitaria en formulación técnica, estructuración de especialidades y gestión institucional.
          </p>
        </div>

        <!-- Ficha de Proyecto Planificado: CDS MUSA -->
        <div class="project-showcase-list">
          <article
            v-for="project in plannedProjects"
            :key="project.id"
            class="project-detail-card planned-card"
            v-reveal
          >
            <!-- Card Top Header -->
            <div class="card-meta-header">
              <div class="meta-tags">
                <span class="project-type-tag">Proyecto Planificado</span>
                <span class="client-tag">{{ project.client }}</span>
                <span class="region-tag">{{ project.country }} · {{ project.region }}</span>
              </div>
              <div class="progress-pill">
                <span class="progress-label">Avance actual</span>
                <strong class="progress-val">{{ project.progress }}%</strong>
              </div>
            </div>

            <!-- Title & Main Info -->
            <div class="project-title-row">
              <div>
                <h3 class="project-main-title">{{ project.name }}</h3>
                <p class="project-location-sub">
                  <span>{{ project.client }}</span>
                  <span class="dot-sep" aria-hidden="true">·</span>
                  <span>{{ project.region }}, {{ project.country }}</span>
                </p>
              </div>
              <div class="projection-badge-box">
                <span class="proj-label">Proyección de culminación:</span>
                <span class="proj-date">{{ project.projection }}</span>
              </div>
            </div>

            <!-- PROGRESO Y PROYECCIÓN DESTACADA (20%) -->
            <div class="progress-banner-box">
              <div class="progress-header-line">
                <div class="progress-title-group">
                  <span class="stage-tag">Fase 01: Planificación &amp; Expediente Técnico</span>
                  <span class="progress-text-info">{{ project.statusDetail }}</span>
                </div>
                <div class="progress-numerical-badge">
                  <span>{{ project.progress }}% Completado</span>
                </div>
              </div>

              <!-- Main Progress Bar -->
              <div
                class="progress-track"
                role="progressbar"
                :aria-valuenow="project.progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="`Progreso de ${project.name}: ${project.progress}%`"
              >
                <div class="progress-fill" :style="{ width: `${project.progress}%` }">
                  <span class="progress-glow"></span>
                </div>
              </div>

              <!-- Milestones / Hitos de Avance -->
              <div class="milestones-grid" v-if="project.milestones">
                <div
                  v-for="(milestone, idx) in project.milestones"
                  :key="milestone.name"
                  class="milestone-item"
                  :class="`is-${milestone.state}`"
                >
                  <div class="milestone-top">
                    <span class="milestone-step">0{{ idx + 1 }}</span>
                    <span class="milestone-pct">{{ milestone.percent }}%</span>
                  </div>
                  <span class="milestone-name">{{ milestone.name }}</span>
                  <div class="milestone-mini-bar">
                    <div class="mini-fill" :style="{ width: `${milestone.percent}%` }"></div>
                  </div>
                </div>
              </div>

              <!-- Projection Callout Note -->
              <div class="projection-callout">
                <div class="callout-icon">
                  <Icon name="calendar" />
                </div>
                <div class="callout-text">
                  <strong>Entrega proyectada: {{ project.projectionQuarter }} · {{ project.projection }}</strong>
                  <p>{{ project.projectionDetail }}</p>
                </div>
              </div>
            </div>

            <!-- GALERÍA DE IMÁGENES (CARRUSEL PROTAGONISTA) -->
            <div class="project-gallery-block">
              <div class="gallery-viewport">
                <Transition name="gallery-crossfade" mode="out-in">
                  <img
                    :key="activeSlides[project.id] || 0"
                    :src="project.gallery[activeSlides[project.id] || 0].src"
                    :alt="project.gallery[activeSlides[project.id] || 0].caption"
                    class="gallery-main-img"
                    width="1200"
                    height="640"
                    loading="lazy"
                  />
                </Transition>
                <!-- Overlaid Navigation Arrows -->
                <button
                  type="button"
                  class="gallery-arrow arrow-prev"
                  @click="prevSlide(project.id, project.gallery.length)"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="gallery-arrow arrow-next"
                  @click="nextSlide(project.id, project.gallery.length)"
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>
                <!-- Slide Counter Badge -->
                <span class="gallery-counter">
                  {{ (activeSlides[project.id] || 0) + 1 }} / {{ project.gallery.length }}
                </span>
              </div>
              <div class="gallery-caption-row">
                <p class="gallery-caption-text">
                  {{ project.gallery[activeSlides[project.id] || 0].caption }}
                </p>
                <div class="gallery-dots">
                  <button
                    v-for="(_, dotIdx) in project.gallery"
                    :key="dotIdx"
                    type="button"
                    class="gallery-dot"
                    :class="{ 'is-active': (activeSlides[project.id] || 0) === dotIdx }"
                    @click="setSlide(project.id, dotIdx)"
                    :aria-label="`Ir a imagen ${dotIdx + 1}`"
                  ></button>
                </div>
              </div>
            </div>

            <!-- DESCRIPCIÓN Y MEMORIA DE DISEÑO -->
            <div class="project-info-row">
              <div class="project-text-col">
                <h4>Memoria de diseño arquitectónico</h4>
                <p class="project-desc">{{ project.description }}</p>
                <ul class="features-list" v-if="project.features">
                  <li v-for="feat in project.features" :key="feat">
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- COMPACT GOOGLE MAPS WIDGET (ESPACIO REDUCIDO Y EFICIENTE) -->
              <div class="compact-map-box">
                <div class="compact-map-header">
                  <div class="compact-map-meta">
                    <svg class="pin-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{{ project.location }}</span>
                  </div>
                  <a
                    :href="project.mapExternalUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-maps-compact"
                    :aria-label="`Abrir ubicación de ${project.name} en Google Maps`"
                  >
                    <span>Google Maps</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
                <div class="compact-map-iframe">
                  <iframe
                    :src="project.mapEmbedUrl"
                    width="100%"
                    height="180"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    :title="`Mapa de Google Maps con la ubicación de ${project.name}`"
                  ></iframe>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2: PROYECTOS COMPLETADOS -->
    <section
      v-if="activeFilter === 'all' || activeFilter === 'completed'"
      id="completados"
      class="projects-section section-completed"
      aria-labelledby="completed-heading"
    >
      <div class="wrap">
        <div class="section-header" v-reveal>
          <div class="section-kicker-row">
            <span class="section-kicker">02 / Trayectoria &amp; Obras Ejecutadas</span>
            <span class="status-badge badge-completed">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Completados con Éxito</span>
            </span>
          </div>
          <h2 id="completed-heading">Proyectos <em class="em-leaf">Completados</em></h2>
          <p class="section-subtitle">
            Intervenciones de emergencia y conjuntos habitacionales de acogida definitiva entregados y operativos para la Beneficencia de Lima.
          </p>
        </div>

        <div class="completed-projects-stack">
          <!-- CARD COMPLETADO: CASA DE TODOS (ACHO / PALOMINO) -->
          <article
            v-for="project in completedProjects"
            :key="project.id"
            class="project-detail-card completed-card"
            v-reveal
          >
            <!-- Card Top Header -->
            <div class="card-meta-header">
              <div class="meta-tags">
                <span class="project-type-tag is-completed">Proyecto Completado</span>
                <span class="client-tag">{{ project.client }}</span>
                <span class="region-tag">{{ project.country }} · {{ project.region }}</span>
              </div>
              <div class="completed-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>100% Ejecutado</span>
              </div>
            </div>

            <!-- Title & Main Info -->
            <div class="project-title-row">
              <div>
                <h3 class="project-main-title">{{ project.name }}</h3>
                <p class="project-location-sub">
                  <span>{{ project.client }}</span>
                  <span class="dot-sep" aria-hidden="true">·</span>
                  <span>{{ project.region }}, {{ project.country }}</span>
                </p>
              </div>
              <div class="projection-badge-box completed-box">
                <span class="proj-label">Estado de la infraestructura:</span>
                <span class="proj-date">{{ project.projection }}</span>
              </div>
            </div>

            <!-- Completed Status Bar -->
            <div class="completed-status-bar">
              <div class="status-summary">
                <div class="status-icon-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <strong>{{ project.statusDetail }}</strong>
                  <p>Infraestructura asistencial operativa entregada a la Beneficencia de Lima.</p>
                </div>
              </div>
              <div class="progress-bar-complete">
                <div class="fill-100"></div>
              </div>
            </div>

            <!-- GALERÍA DE IMÁGENES (CARRUSEL PROTAGONISTA) -->
            <div class="project-gallery-block">
              <div class="gallery-viewport">
                <Transition name="gallery-crossfade" mode="out-in">
                  <img
                    :key="activeSlides[project.id] || 0"
                    :src="project.gallery[activeSlides[project.id] || 0].src"
                    :alt="project.gallery[activeSlides[project.id] || 0].caption"
                    class="gallery-main-img"
                    width="1200"
                    height="640"
                    loading="lazy"
                  />
                </Transition>
                <!-- Overlaid Navigation Arrows -->
                <button
                  type="button"
                  class="gallery-arrow arrow-prev"
                  @click="prevSlide(project.id, project.gallery.length)"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="gallery-arrow arrow-next"
                  @click="nextSlide(project.id, project.gallery.length)"
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>
                <!-- Slide Counter Badge -->
                <span class="gallery-counter">
                  {{ (activeSlides[project.id] || 0) + 1 }} / {{ project.gallery.length }}
                </span>
              </div>
              <div class="gallery-caption-row">
                <p class="gallery-caption-text">
                  {{ project.gallery[activeSlides[project.id] || 0].caption }}
                </p>
                <div class="gallery-dots">
                  <button
                    v-for="(_, dotIdx) in project.gallery"
                    :key="dotIdx"
                    type="button"
                    class="gallery-dot"
                    :class="{ 'is-active': (activeSlides[project.id] || 0) === dotIdx }"
                    @click="setSlide(project.id, dotIdx)"
                    :aria-label="`Ir a imagen ${dotIdx + 1}`"
                  ></button>
                </div>
              </div>
            </div>

            <!-- DESCRIPCIÓN Y MEMORIA DE DISEÑO -->
            <div class="project-info-row">
              <div class="project-text-col">
                <h4>Alcance e impacto de la obra</h4>
                <p class="project-desc">{{ project.description }}</p>
                <ul class="features-list" v-if="project.features">
                  <li v-for="feat in project.features" :key="feat">
                    <svg class="check-icon is-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- COMPACT GOOGLE MAPS WIDGET (ESPACIO REDUCIDO Y EFICIENTE) -->
              <div class="compact-map-box">
                <div class="compact-map-header">
                  <div class="compact-map-meta">
                    <svg class="pin-svg is-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{{ project.location }}</span>
                  </div>
                  <a
                    :href="project.mapExternalUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-maps-compact is-green"
                    :aria-label="`Abrir ubicación de ${project.name} en Google Maps`"
                  >
                    <span>Google Maps</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
                <div class="compact-map-iframe">
                  <iframe
                    :src="project.mapEmbedUrl"
                    width="100%"
                    height="180"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    :title="`Mapa de Google Maps con la ubicación de ${project.name}`"
                  ></iframe>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="projects-cta-section" aria-labelledby="cta-projects-title">
      <div class="wrap">
        <div class="projects-cta-card" v-reveal>
          <div class="cta-inner">
            <span class="pill pill-cta-badge">Construyamos juntos</span>
            <h2 id="cta-projects-title">Arquitectura que transforma la vida de quienes más lo necesitan</h2>
            <p class="lede">
              Como entidad perceptora de donaciones calificada por la SUNAT, canalizamos recursos públicos y privados para convertir planes y diseños en espacios dignos y perdurables.
            </p>
            <div class="cta-buttons">
              <ActionButton tone="yellow" to="/#quiero-ayudar">Quiero ayudar <span aria-hidden="true">↗</span></ActionButton>
              <ActionButton tone="dark" to="/contacto">Contáctanos <span aria-hidden="true">↗</span></ActionButton>
            </div>
            <p class="cta-contact-direct">
              Asociación MUHU · Entidad Perceptora de Donaciones con Beneficio Tributario · RUC: 20611534354
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==========================================================================
   VISTA PROYECTOS: REFINED STYLES
   ========================================================================== */

.projects-page {
  background: transparent;
  color: var(--ink);
}

/* Hero Section */
.projects-hero {
  min-height: 500px;
  padding: 160px 0 72px;
  background: var(--ink);
  color: #fff;
  position: relative;
  display: grid;
  place-items: end start;
}

.projects-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75);
}

.projects-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(21, 37, 29, 0.45) 0%,
    rgba(16, 26, 21, 0.88) 100%
  );
  pointer-events: none;
}

.hero-wrap {
  position: relative;
  z-index: 2;
  width: min(1420px, calc(100% - 56px));
  margin: 0 auto;
}

.projects-hero h1 {
  font-size: clamp(48px, 6.5vw, 84px);
  margin: 16px 0 20px;
  line-height: 1.05;
  color: #fff;
  font-family: Figtree, sans-serif;
  font-weight: 500;
}

.projects-hero-subtitle {
  font-size: clamp(17px, 2vw, 22px);
  max-width: 50ch;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.9);
}

.hero-kpis {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  flex-wrap: wrap;
}

.hero-kpi-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.hero-kpi-item:hover {
  transform: translateY(-2px);
}

.kpi-num {
  font-family: Figtree, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #f0b48f;
  transition: color 0.25s ease, text-shadow 0.25s ease;
}

.hero-kpi-item:hover .kpi-num {
  color: #ffffff;
  text-shadow: 0 0 16px rgba(240, 180, 143, 0.7);
}

.kpi-desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 24ch;
  line-height: 1.35;
}

.hero-kpi-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.18);
}

/* Filter Bar: Elegante, limpio y sin franja blanca invasiva al scrollear */
.projects-filter-bar {
  background: transparent;
  border-bottom: none;
  padding: 36px 0 8px;
  position: static;
  z-index: 10;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}

.filter-buttons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(28, 26, 22, 0.1);
  padding: 6px 8px;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--stone);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.filter-pill:hover {
  background: rgba(28, 26, 22, 0.06);
  color: var(--ink);
  transform: translateY(-1px);
}

.filter-pill.is-active {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
  transform: scale(1.02);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.filter-pill-completed {
  color: var(--leaf) !important;
  font-weight: 600;
}

.filter-pill-completed:hover {
  border-color: var(--leaf);
  color: var(--leaf) !important;
  transform: translateY(-1px);
}

.filter-pill-completed.is-active {
  background: var(--leaf) !important;
  color: #fff !important;
  border-color: var(--leaf) !important;
  transform: scale(1.02);
  box-shadow: 0 4px 14px rgba(27, 56, 36, 0.25);
}

.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 11.5px;
  background: rgba(0, 0, 0, 0.08);
}

.filter-pill.is-active .filter-count {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
}

.filter-pill-completed .filter-count {
  background: rgba(47, 94, 58, 0.12);
  color: var(--leaf);
}

.filter-pill-completed.is-active .filter-count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-amber {
  background: var(--clay);
}

.dot-green {
  background: var(--leaf);
}

/* Sections */
.projects-section {
  padding: 80px 0;
  background: transparent;
  border: none;
}

.section-header {
  margin-bottom: 40px;
}

/* Fixed Alignment for Kicker and Badge */
.section-kicker-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.section-kicker-row .section-kicker {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: var(--stone);
  margin-bottom: 0 !important;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.badge-planned {
  background: #fdf3eb;
  color: #a94825;
  border: 1px solid #f6cca7;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a94825;
  box-shadow: 0 0 0 0 rgba(169, 72, 37, 0.6);
  animation: pulseAmber 2s infinite;
  flex-shrink: 0;
}

@keyframes pulseAmber {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(169, 72, 37, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(169, 72, 37, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(169, 72, 37, 0); }
}

.badge-completed {
  background: #eaf3e9;
  color: var(--leaf);
  border: 1px solid #c0d8be;
}

.section-header h2 {
  font-size: clamp(34px, 4.2vw, 54px);
  margin-bottom: 14px;
  line-height: 1.15;
}

.section-header em {
  font-family: "Playfair Display", serif;
  color: var(--clay);
  font-style: italic;
  font-weight: 500;
}

.section-header em.em-leaf {
  color: var(--leaf) !important;
}

.section-subtitle {
  font-size: 17px;
  color: var(--stone);
  max-width: 64ch;
  line-height: 1.6;
}

/* Detail Card Container */
.project-detail-card {
  background: #fff;
  border-radius: 28px;
  border: 1px solid var(--rule);
  padding: 36px 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
  margin-bottom: 48px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}

.project-detail-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.08);
}

.planned-card {
  border-top: 5px solid var(--clay);
}

.completed-card {
  border-top: 5px solid var(--leaf);
}

/* Card Header Meta */
.card-meta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--rule);
  flex-wrap: wrap;
}

.meta-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.project-type-tag {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 5px 12px;
  border-radius: 6px;
  background: #fdf3eb;
  color: #a94825;
}

.project-type-tag.is-completed {
  background: #eaf3e9;
  color: var(--leaf);
}

.client-tag {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--stone);
  background: var(--paper);
  padding: 4px 10px;
  border-radius: 6px;
}

.region-tag {
  font-size: 12px;
  font-weight: 500;
  color: var(--stone);
}

.progress-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 999px;
  background: #fdf3eb;
  border: 1px solid #f6cca7;
}

.progress-label {
  font-size: 12px;
  color: #a94825;
}

.progress-val {
  font-size: 15px;
  color: #a94825;
  font-family: Figtree, sans-serif;
  font-weight: 700;
}

.completed-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  background: #eaf3e9;
  border: 1px solid #c0d8be;
  color: var(--leaf);
  font-size: 13px;
  font-weight: 600;
}

/* Title & Subtitle Row */
.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin: 22px 0 24px;
  flex-wrap: wrap;
}

.project-main-title {
  font-size: clamp(22px, 2.8vw, 34px);
  font-family: Figtree, sans-serif;
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 6px;
  color: var(--ink);
}

.project-location-sub {
  font-size: 14.5px;
  color: var(--stone);
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot-sep {
  opacity: 0.5;
}

.projection-badge-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: var(--sand);
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid var(--rule);
}

.projection-badge-box.completed-box {
  background: #f4f8f3;
  border-color: #d2e4d0;
}

.proj-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--stone);
  font-weight: 600;
}

.proj-date {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  font-family: Figtree, sans-serif;
}

/* PROGRESS BAR (20%) & TIMELINE BLOCK */
.progress-banner-box {
  background: linear-gradient(145deg, #fdfaf6, var(--sand));
  border: 1px solid #eedecf;
  border-radius: 18px;
  padding: 22px 24px;
  margin-bottom: 28px;
}

.progress-header-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.progress-title-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stage-tag {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clay);
}

.progress-text-info {
  font-size: 14px;
  color: var(--stone);
}

.progress-numerical-badge {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--clay);
  background: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid #eedecf;
}

.progress-track {
  width: 100%;
  height: 12px;
  background: #e8e2d8;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #c46a3a 0%, #d87c4b 100%);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.progress-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
  transform: translateX(-100%);
  animation: shimmerProgress 2.8s infinite ease-in-out;
}

@keyframes shimmerProgress {
  0% { transform: translateX(-100%); }
  60%, 100% { transform: translateX(200%); }
}

.progress-glow {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: #fff;
  opacity: 0.6;
  filter: blur(2px);
}

.milestones-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(28, 26, 22, 0.08);
}

.milestone-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(28, 26, 22, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.milestone-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

.milestone-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.milestone-step {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--stone);
  opacity: 0.7;
}

.milestone-pct {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink);
}

.milestone-item.is-completed .milestone-pct {
  color: var(--leaf);
}

.milestone-item.is-in-progress .milestone-pct {
  color: var(--clay);
}

.milestone-name {
  display: block;
  font-size: 11.5px;
  line-height: 1.35;
  color: var(--stone);
  font-weight: 500;
  min-height: 30px;
  margin-bottom: 6px;
}

.milestone-mini-bar {
  height: 4px;
  background: #e6dfd5;
  border-radius: 99px;
  overflow: hidden;
}

.mini-fill {
  height: 100%;
  background: var(--moss);
  border-radius: 99px;
}

.milestone-item.is-in-progress .mini-fill {
  background: var(--clay);
}

.projection-callout {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid #eedecf;
}

.callout-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #fdf3eb;
  color: var(--clay);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.callout-text strong {
  display: block;
  font-size: 13.5px;
  color: var(--ink);
}

.callout-text p {
  font-size: 12.5px;
  color: var(--stone);
  margin-top: 2px;
}

/* Completed Status Banner */
.completed-status-bar {
  background: #f4f8f3;
  border: 1px solid #c9dec7;
  border-radius: 16px;
  padding: 18px 22px;
  margin-bottom: 24px;
}

.status-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.status-icon-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--leaf);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.status-summary strong {
  display: block;
  font-size: 14px;
  color: var(--ink);
}

.status-summary p {
  font-size: 12.5px;
  color: var(--stone);
  margin-top: 2px;
}

.progress-bar-complete {
  width: 100%;
  height: 6px;
  background: #d6e8d4;
  border-radius: 999px;
  overflow: hidden;
}

.fill-100 {
  width: 100%;
  height: 100%;
  background: var(--leaf);
}

/* ==========================================================================
   GALERÍA DE IMÁGENES / CARRUSEL
   ========================================================================== */
.project-gallery-block {
  margin-bottom: 28px;
  background: var(--sand);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--rule);
}

.gallery-viewport {
  position: relative;
  width: 100%;
  height: clamp(440px, 45vw, 600px);
  background: #1c1a16;
  overflow: hidden;
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-viewport:hover .gallery-main-img {
  transform: scale(1.02);
}

/* Transición fotográfica cinematográfica en galería */
.gallery-crossfade-enter-active,
.gallery-crossfade-leave-active {
  transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.gallery-crossfade-enter-from {
  opacity: 0;
  transform: scale(1.025);
}
.gallery-crossfade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(28, 26, 22, 0.72);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 24px;
  line-height: 1;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 5;
}

.gallery-arrow:hover {
  background: rgba(28, 26, 22, 0.95);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.arrow-prev {
  left: 18px;
}

.arrow-prev:hover {
  transform: translateY(-50%) scale(1.1) translateX(-3px);
}

.arrow-next {
  right: 18px;
}

.arrow-next:hover {
  transform: translateY(-50%) scale(1.1) translateX(3px);
}

.gallery-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(21, 37, 29, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  letter-spacing: 0.04em;
  z-index: 5;
}

.gallery-caption-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #fff;
  border-top: 1px solid var(--rule);
  gap: 16px;
}

.gallery-caption-text {
  font-size: 13.5px;
  color: var(--stone);
  font-weight: 500;
  margin: 0;
}

.gallery-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.gallery-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #d6cfc4;
  border: 0;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.gallery-dot.is-active {
  background: var(--clay);
  width: 22px;
  border-radius: 99px;
}

/* DESCRIPCIÓN & WIDGET COMPACTO DE MAPA */
.project-info-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 28px;
  align-items: start;
}

.project-text-col h4 {
  font-size: 17px;
  font-family: Figtree, sans-serif;
  font-weight: 600;
  margin-bottom: 8px;
}

.project-desc {
  font-size: 14.5px;
  color: var(--stone);
  line-height: 1.6;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: var(--ink);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.features-list li:hover {
  transform: translateX(4px);
  color: #111;
}

.check-icon {
  color: var(--clay);
  flex-shrink: 0;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.features-list li:hover .check-icon {
  transform: scale(1.25);
  color: var(--leaf);
}

.check-icon.is-green {
  color: var(--leaf);
}

/* MAPA COMPACTO */
.compact-map-box {
  background: var(--paper);
  border-radius: 16px;
  border: 1px solid var(--rule);
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.25s ease;
}

.compact-map-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(28, 26, 22, 0.16);
}

.compact-map-header {
  padding: 10px 14px;
  background: #fff;
  border-bottom: 1px solid var(--rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.compact-map-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--stone);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pin-svg {
  color: var(--clay);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.compact-map-box:hover .pin-svg {
  animation: pinBounce 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes pinBounce {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  75% { transform: translateY(-1.5px); }
}

.pin-svg.is-green {
  color: var(--leaf);
}

.btn-maps-compact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--clay);
  text-decoration: none;
  padding: 5px 12px;
  border-radius: 8px;
  background: #fdf2eb;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.btn-maps-compact svg {
  transition: transform 0.22s ease;
}

.btn-maps-compact:hover {
  background: var(--clay);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(169, 72, 37, 0.25);
}

.btn-maps-compact:hover svg {
  transform: translate(2px, -2px);
}

.btn-maps-compact.is-green {
  color: var(--leaf);
  background: #f0f6ef;
}

.btn-maps-compact.is-green:hover {
  background: var(--leaf);
  color: #fff;
  box-shadow: 0 4px 12px rgba(27, 56, 36, 0.25);
}

.compact-map-iframe {
  height: 180px;
  background: #e5e3df;
}

.compact-map-iframe iframe {
  width: 100%;
  height: 100%;
  display: block;
}

/* Call to Action Section */
.projects-cta-section {
  padding: 32px 0 96px;
  background: transparent;
  border: none;
}

.projects-cta-card {
  background: #ffffff !important;
  border-radius: 28px;
  padding: 64px 40px;
  text-align: center;
  border: 1px solid var(--rule);
  box-shadow: 0 16px 40px -8px rgba(28, 26, 22, 0.06);
}

.cta-inner {
  max-width: 680px;
  margin: 0 auto;
}

.pill-cta-badge {
  background: rgba(47, 94, 58, 0.12);
  color: var(--leaf);
  border: 1px solid rgba(47, 94, 58, 0.28);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.projects-cta-card h2 {
  font-size: clamp(28px, 3.6vw, 44px);
  margin: 20px 0 16px;
  line-height: 1.18;
}

.projects-cta-card .lede {
  margin: 0 auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.cta-contact-direct {
  margin-top: 24px;
  font-size: 13px;
  color: var(--stone);
  opacity: 0.85;
}

/* Responsive Breakpoints */
@media (max-width: 960px) {
  .project-info-row {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .gallery-viewport {
    height: 320px;
  }

  .milestones-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .project-detail-card {
    padding: 24px 20px;
    border-radius: 22px;
    margin-bottom: 36px;
  }

  .card-meta-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .project-title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .progress-header-line {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .gallery-viewport {
    height: 240px;
  }

  .gallery-arrow {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }

  .arrow-prev {
    left: 8px;
  }

  .arrow-next {
    right: 8px;
  }

  .hero-kpis {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .hero-kpi-divider {
    display: none;
  }

  .filter-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .projection-badge-box {
    align-items: flex-start;
    width: 100%;
  }

  .projects-hero {
    padding-top: 130px;
    min-height: 420px;
  }
}

@media (max-width: 640px) {
  .filter-buttons {
    width: 100%;
    border-radius: 18px;
    padding: 6px;
    gap: 6px;
  }

  .filter-pill {
    width: 100%;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 13px;
  }

  .milestones-grid {
    grid-template-columns: 1fr;
  }

  .compact-map-header {
    flex-wrap: wrap;
    gap: 8px;
  }

  .compact-map-meta {
    max-width: 100%;
  }

  .compact-map-iframe {
    height: 180px;
  }

  .gallery-caption-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .cta-buttons .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .project-detail-card {
    padding: 20px 16px;
    border-radius: 18px;
  }

  .gallery-viewport {
    height: 210px;
  }

  .project-main-title {
    font-size: 22px;
  }

  .progress-banner-box {
    padding: 18px 14px;
  }

  .meta-tags {
    gap: 6px;
  }

  .client-tag, .project-type-tag {
    font-size: 11px;
    padding: 3px 8px;
  }
}
</style>
