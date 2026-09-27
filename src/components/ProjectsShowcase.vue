<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { projects } from '@/data/home';
import { prefersReducedMotion } from '@/composables/useReducedMotion';
import ActionButton from '@/components/ActionButton.vue';
import CarouselControls from '@/components/CarouselControls.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const track = ref(null);
const runway = ref(null);
const current = ref(0);
let scrollFrame = null;
let isManual = false;
let manualTimeout = null;

const scrollToIndex = (index) => {
  const item = track.value?.children[index];
  if (item) {
    track.value.scrollTo({
      left: item.offsetLeft,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth'
    });
  }
};

const select = (index) => {
  isManual = true;
  clearTimeout(manualTimeout);
  current.value = index;
  scrollToIndex(index);
  manualTimeout = setTimeout(() => {
    isManual = false;
  }, 1000);
};

const onKey = (event) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  select(event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (current.value + (event.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length);
};

const onScroll = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    if (!runway.value || !track.value || isManual || prefersReducedMotion() || window.innerWidth <= 960) return;

    const rect = runway.value.getBoundingClientRect();
    const runwayHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const stickyTop = 86;
    const totalTravel = runwayHeight - viewportHeight;
    if (totalTravel <= 0) return;

    if (rect.top <= stickyTop && rect.bottom >= viewportHeight) {
      const scrolled = stickyTop - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalTravel));
      const targetIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      if (targetIndex !== current.value) {
        current.value = targetIndex;
        scrollToIndex(targetIndex);
      }
    }
  });
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  cancelAnimationFrame(scrollFrame);
  clearTimeout(manualTimeout);
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <section id="proyectos" class="projects home-projects" aria-labelledby="projects-title">
    <div class="wrap">
      <div class="section-row" v-reveal>
        <div>
          <p class="eyebrow section-kicker">02 / De la idea al espacio</p>
          <h2 id="projects-title">Proyectos que transforman espacios y oportunidades</h2>
        </div>
      </div>
      <p id="project-instructions" class="project-instructions">Desplaza hacia abajo para recorrer las iniciativas o usa los controles laterales.</p>
      
      <div ref="runway" class="project-runway">
        <div class="project-stage">
          <div
            id="project-track"
            ref="track"
            class="project-track"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Iniciativas y trayectoria"
            aria-describedby="project-instructions"
            tabindex="0"
            @keydown="onKey"
          >
            <div
              v-for="(project, index) in projects"
              :key="project.id"
              class="project-panel"
              :class="{ 'is-planned': project.category === 'Proyecto Planificado' || project.id === 'cds-musa' }"
              :data-index="index"
              role="group"
              aria-roledescription="diapositiva"
              :aria-label="`${index + 1} de ${projects.length}`"
            >
              <ProjectCard :project="project" />
            </div>
          </div>
          
          <div class="project-toolbar">
            <div class="project-control-group">
              <span aria-live="polite" aria-atomic="true" class="project-counter">
                {{ String(current + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
              </span>
              <CarouselControls
                :count="projects.length"
                :current="current"
                label="Proyecto"
                controls="project-track"
                @select="select"
              />
            </div>
            <ActionButton to="/proyectos">Ver proyectos <span aria-hidden="true">↗</span></ActionButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
