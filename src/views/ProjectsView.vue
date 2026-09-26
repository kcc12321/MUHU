<script setup>
import { ref, computed } from "vue";
import Icon from "@/components/Icon.vue";
import ActionButton from "@/components/ActionButton.vue";
import { projectsData, plannedProjects, completedProjects } from "@/data/projects";

const activeFilter = ref("all"); // 'all' | 'planned' | 'completed'

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
        src="/assets/projects/cds-musa.jpg"
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
              class="filter-pill"
              :class="{ 'is-active': activeFilter === 'completed' }"
              @click="setFilter('completed')"
            >
              <span class="dot dot-green" aria-hidden="true"></span>
              <span>Proyectos Completados</span>
              <span class="filter-count">{{ completedProjects.length }}</span>
            </button>
          </div>
          <div class="quick-nav">
            <a href="#planificados" class="quick-link" v-if="activeFilter !== 'completed'">Ir a Planificados ↓</a>
            <a href="#completados" class="quick-link" v-if="activeFilter !== 'planned'">Ir a Completados ↓</a>
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
              <span class="pulse-dot"></span>
              En Planificación · 20%
            </span>
          </div>
          <h2 id="planned-heading">Proyectos <em>Planificados</em></h2>
          <p class="section-subtitle">
            Iniciativas de infraestructura pública y comunitaria en formulación técnica, estructuración de especialidades y gestión institucional para responder a necesidades urbanas esenciales.
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
                <p class="project-location">
                  <svg class="geo-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{{ project.location }}</span>
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

            <!-- Architectural Specs Grid -->
            <div class="specs-data-grid">
              <div class="spec-cell">
                <span class="spec-label">Cliente / Entidad</span>
                <strong class="spec-val">{{ project.client }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">País / Región</span>
                <strong class="spec-val">{{ project.country }} · {{ project.region }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Ubicación exacta</span>
                <strong class="spec-val">{{ project.location }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Tipología de proyecto</span>
                <strong class="spec-val">{{ project.category }}</strong>
              </div>
            </div>

            <!-- Content Split: Photo and Google Maps -->
            <div class="media-map-split">
              <!-- Left: Project Photo & Description -->
              <div class="project-media-col">
                <div class="photo-wrapper">
                  <img
                    :src="project.image"
                    :alt="project.alt"
                    width="800"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="photo-overlay">
                    <span class="photo-badge">Render Oficial de Anteproyecto</span>
                  </div>
                </div>
                <div class="project-description-block">
                  <h4>Memoria de diseño arquitectónico</h4>
                  <p>{{ project.description }}</p>
                  <ul class="features-list" v-if="project.features">
                    <li v-for="feat in project.features" :key="feat">
                      <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{{ feat }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right: Interactive Google Maps Embed -->
              <div class="project-map-col">
                <div class="map-card">
                  <div class="map-card-header">
                    <div class="map-header-info">
                      <div class="map-icon-box">
                        <svg class="pin-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h5>Ubicación en Google Maps</h5>
                        <p class="map-address">{{ project.location }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- Iframe Google Maps -->
                  <div class="map-iframe-container">
                    <iframe
                      :src="project.mapEmbedUrl"
                      width="100%"
                      height="320"
                      style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      :title="`Mapa de Google Maps con la ubicación de ${project.name}`"
                    ></iframe>
                  </div>
                  <div class="map-card-footer">
                    <span class="map-meta">Distrito de La Molina, Lima</span>
                    <a
                      :href="project.mapExternalUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-maps-link"
                      :aria-label="`Abrir ubicación de ${project.name} en Google Maps (nueva pestaña)`"
                    >
                      <span>Abrir en Google Maps</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Completados con Éxito
            </span>
          </div>
          <h2 id="completed-heading">Proyectos <em>Completados</em></h2>
          <p class="section-subtitle">
            Intervenciones de emergencia y conjuntos habitacionales de acogida definitiva entregados y operativos para la Beneficencia de Lima, brindando cobijo digno y atención integral.
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
                <p class="project-location">
                  <svg class="geo-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{{ project.location }}</span>
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

            <!-- Architectural Specs Grid -->
            <div class="specs-data-grid">
              <div class="spec-cell">
                <span class="spec-label">Cliente / Entidad</span>
                <strong class="spec-val">{{ project.client }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">País / Región</span>
                <strong class="spec-val">{{ project.country }} · {{ project.region }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Ubicación</span>
                <strong class="spec-val">{{ project.location }}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Tipología</span>
                <strong class="spec-val">{{ project.category }}</strong>
              </div>
            </div>

            <!-- Content Split: Photo and Google Maps -->
            <div class="media-map-split">
              <!-- Left: Project Photo & Description -->
              <div class="project-media-col">
                <div class="photo-wrapper">
                  <img
                    :src="project.image"
                    :alt="project.alt"
                    width="800"
                    height="480"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="photo-overlay">
                    <span class="photo-badge is-verified">Obra Ejecutada</span>
                  </div>
                </div>
                <div class="project-description-block">
                  <h4>Alcance e impacto de la obra</h4>
                  <p>{{ project.description }}</p>
                  <ul class="features-list" v-if="project.features">
                    <li v-for="feat in project.features" :key="feat">
                      <svg class="check-icon is-green" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{{ feat }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right: Interactive Google Maps Embed -->
              <div class="project-map-col">
                <div class="map-card">
                  <div class="map-card-header">
                    <div class="map-header-info">
                      <div class="map-icon-box is-green">
                        <svg class="pin-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h5>Ubicación en Google Maps</h5>
                        <p class="map-address">{{ project.location }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- Iframe Google Maps -->
                  <div class="map-iframe-container">
                    <iframe
                      :src="project.mapEmbedUrl"
                      width="100%"
                      height="320"
                      style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      :title="`Mapa de Google Maps con la ubicación de ${project.name}`"
                    ></iframe>
                  </div>
                  <div class="map-card-footer">
                    <span class="map-meta">{{ project.region }}, {{ project.country }}</span>
                    <a
                      :href="project.mapExternalUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-maps-link"
                      :aria-label="`Abrir ubicación de ${project.name} en Google Maps (nueva pestaña)`"
                    >
                      <span>Abrir en Google Maps</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
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
            <span class="pill pill-light">Construyamos juntos</span>
            <h2 id="cta-projects-title">Arquitectura que transforma la vida de quienes más lo necesitan</h2>
            <p class="lede">
              Como entidad perceptora de donaciones calificada por la SUNAT, canalizamos recursos públicos y privados para convertir planes y diseños en espacios dignos y perdurables.
            </p>
            <div class="cta-buttons">
              <ActionButton tone="yellow" to="/#quiero-ayudar">Quiero ayudar <span aria-hidden="true">↗</span></ActionButton>
              <ActionButton tone="white" to="/contacto">Contáctanos</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==========================================================================
   VISTA PROYECTOS: STYLES
   ========================================================================== */

.projects-page {
  background: var(--paper);
  color: var(--ink);
}

/* Hero Section */
.projects-hero {
  min-height: 520px;
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
  filter: brightness(0.78);
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
  width: min(1200px, calc(100% - 48px));
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
}

.kpi-num {
  font-family: Figtree, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #f0b48f;
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

/* Filter Bar */
.projects-filter-bar {
  background: #fff;
  border-bottom: 1px solid var(--rule);
  padding: 16px 0;
  position: sticky;
  top: 72px;
  z-index: 30;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.92);
}

.filter-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--rule);
  background: var(--paper);
  color: var(--ink);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s var(--ease);
}

.filter-pill:hover {
  background: var(--sand);
  border-color: #c8c2b7;
}

.filter-pill.is-active {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
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

.quick-nav {
  display: flex;
  gap: 16px;
}

.quick-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--leaf);
  text-decoration: none;
}

.quick-link:hover {
  text-decoration: underline;
}

/* Sections */
.projects-section {
  padding: 88px 0;
}

.section-planned {
  background: var(--sand);
  border-bottom: 1px solid var(--rule);
}

.section-completed {
  background: var(--paper);
}

.section-header {
  margin-bottom: 48px;
}

.section-kicker-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.section-kicker {
  text-transform: uppercase;
  font-size: 12.5px;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: var(--stone);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-planned {
  background: #fdf3eb;
  color: #a94825;
  border: 1px solid #f6cca7;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a94825;
  box-shadow: 0 0 0 0 rgba(169, 72, 37, 0.6);
  animation: pulseAmber 2s infinite;
}

@keyframes pulseAmber {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(169, 72, 37, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(169, 72, 37, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(169, 72, 37, 0); }
}

.badge-completed {
  background: #eaf3e9;
  color: var(--leaf);
  border: 1px solid #c0d8be;
}

.section-header h2 {
  font-size: clamp(34px, 4.2vw, 54px);
  margin-bottom: 16px;
  line-height: 1.15;
}

.section-header em {
  font-family: "Playfair Display", serif;
  color: var(--clay);
  font-style: italic;
  font-weight: 500;
}

.section-subtitle {
  font-size: 17.5px;
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  margin-bottom: 48px;
  transition: box-shadow 0.3s ease;
}

.project-detail-card:hover {
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.06);
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
  padding-bottom: 20px;
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
  padding: 6px 14px;
  border-radius: 999px;
  background: #fdf3eb;
  border: 1px solid #f6cca7;
}

.progress-label {
  font-size: 12px;
  color: #a94825;
}

.progress-val {
  font-size: 16px;
  color: #a94825;
  font-family: Figtree, sans-serif;
  font-weight: 700;
}

.completed-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #eaf3e9;
  border: 1px solid #c0d8be;
  color: var(--leaf);
  font-size: 13px;
  font-weight: 600;
}

/* Title & Location Row */
.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin: 24px 0 28px;
  flex-wrap: wrap;
}

.project-main-title {
  font-size: clamp(24px, 3.2vw, 38px);
  font-family: Figtree, sans-serif;
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 8px;
  color: var(--ink);
}

.project-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: var(--stone);
}

.geo-icon {
  color: var(--clay);
  flex-shrink: 0;
}

.projection-badge-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: var(--sand);
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid var(--rule);
}

.projection-badge-box.completed-box {
  background: #f4f8f3;
  border-color: #d2e4d0;
}

.proj-label {
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--stone);
  font-weight: 600;
}

.proj-date {
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  font-family: Figtree, sans-serif;
}

/* PROGRESS BAR (20%) & TIMELINE BLOCK */
.progress-banner-box {
  background: linear-gradient(145deg, #fdfaf6, var(--sand));
  border: 1px solid #eedecf;
  border-radius: 20px;
  padding: 24px 28px;
  margin-bottom: 32px;
}

.progress-header-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.progress-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stage-tag {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clay);
}

.progress-text-info {
  font-size: 14.5px;
  color: var(--stone);
}

.progress-numerical-badge {
  font-size: 14px;
  font-weight: 700;
  color: var(--clay);
  background: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid #eedecf;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.progress-track {
  width: 100%;
  height: 14px;
  background: #e8e2d8;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #c46a3a 0%, #d87c4b 100%);
  border-radius: 999px;
  position: relative;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
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
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(28, 26, 22, 0.08);
}

.milestone-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(28, 26, 22, 0.06);
}

.milestone-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.milestone-step {
  font-size: 11px;
  font-weight: 700;
  color: var(--stone);
  opacity: 0.7;
}

.milestone-pct {
  font-size: 12px;
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
  font-size: 12px;
  line-height: 1.35;
  color: var(--stone);
  font-weight: 500;
  min-height: 32px;
  margin-bottom: 8px;
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
  gap: 14px;
  background: #fff;
  border-radius: 12px;
  padding: 14px 18px;
  border: 1px solid #eedecf;
}

.callout-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #fdf3eb;
  color: var(--clay);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.callout-text strong {
  display: block;
  font-size: 14px;
  color: var(--ink);
}

.callout-text p {
  font-size: 13px;
  color: var(--stone);
  margin-top: 2px;
}

/* Completed Status Banner */
.completed-status-bar {
  background: #f4f8f3;
  border: 1px solid #c9dec7;
  border-radius: 18px;
  padding: 20px 24px;
  margin-bottom: 28px;
}

.status-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.status-icon-check {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--leaf);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.status-summary strong {
  display: block;
  font-size: 14.5px;
  color: var(--ink);
}

.status-summary p {
  font-size: 13px;
  color: var(--stone);
  margin-top: 2px;
}

.progress-bar-complete {
  width: 100%;
  height: 8px;
  background: #d6e8d4;
  border-radius: 999px;
  overflow: hidden;
}

.fill-100 {
  width: 100%;
  height: 100%;
  background: var(--leaf);
}

/* Specs Data Grid */
.specs-data-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background: var(--paper);
  border-radius: 16px;
  padding: 18px 24px;
  border: 1px solid var(--rule);
  margin-bottom: 32px;
}

.spec-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-label {
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--stone);
  font-weight: 600;
}

.spec-val {
  font-size: 14px;
  color: var(--ink);
  font-weight: 600;
  line-height: 1.35;
}

/* Split: Media & Map (50% / 50%) */
.media-map-split {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 28px;
  align-items: stretch;
}

.project-media-col {
  display: flex;
  flex-direction: column;
}

.photo-wrapper {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  height: 300px;
  background: var(--sand);
}

.photo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease);
}

.project-detail-card:hover .photo-wrapper img {
  transform: scale(1.035);
}

.photo-overlay {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
}

.photo-badge {
  background: rgba(21, 37, 29, 0.82);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  letter-spacing: 0.03em;
}

.photo-badge.is-verified {
  background: rgba(47, 94, 58, 0.9);
}

.project-description-block {
  padding: 20px 4px 0;
  flex: 1;
}

.project-description-block h4 {
  font-size: 16px;
  font-family: Figtree, sans-serif;
  font-weight: 600;
  margin-bottom: 8px;
}

.project-description-block p {
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
}

.check-icon {
  color: var(--clay);
  flex-shrink: 0;
}

.check-icon.is-green {
  color: var(--leaf);
}

/* Map Column & Embed Card */
.project-map-col {
  display: flex;
}

.map-card {
  width: 100%;
  background: var(--paper);
  border-radius: 18px;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}

.map-card-header {
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid var(--rule);
}

.map-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.map-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #fdf3eb;
  color: var(--clay);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.map-icon-box.is-green {
  background: #eaf3e9;
  color: var(--leaf);
}

.map-card-header h5 {
  font-size: 14.5px;
  font-weight: 600;
  margin: 0;
}

.map-address {
  font-size: 12.5px;
  color: var(--stone);
  margin: 2px 0 0;
}

.map-iframe-container {
  flex: 1;
  min-height: 280px;
  position: relative;
  background: #e5e3df;
}

.map-iframe-container iframe {
  width: 100%;
  height: 100%;
  min-height: 280px;
  display: block;
}

.map-card-footer {
  padding: 12px 18px;
  background: #fff;
  border-top: 1px solid var(--rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.map-meta {
  font-size: 12px;
  color: var(--stone);
}

.btn-maps-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--leaf);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: #f0f6ef;
  transition: all 0.2s ease;
}

.btn-maps-link:hover {
  background: var(--leaf);
  color: #fff;
}

/* Call to Action Section */
.projects-cta-section {
  padding: 32px 0 96px;
}

.projects-cta-card {
  background: var(--sand);
  border-radius: 28px;
  padding: 64px 40px;
  text-align: center;
  border: 1px solid var(--rule);
}

.cta-inner {
  max-width: 680px;
  margin: 0 auto;
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
  margin-top: 36px;
  flex-wrap: wrap;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .media-map-split {
    grid-template-columns: 1fr;
  }

  .photo-wrapper {
    height: 320px;
  }

  .specs-data-grid {
    grid-template-columns: 1fr 1fr;
  }

  .milestones-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .project-detail-card {
    padding: 24px 20px;
    border-radius: 20px;
  }

  .specs-data-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }

  .milestones-grid {
    grid-template-columns: 1fr;
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
    min-height: 440px;
  }
}
</style>
