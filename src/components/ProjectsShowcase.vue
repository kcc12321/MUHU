<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { projects } from '@/data/home';
import { prefersReducedMotion } from '@/composables/useReducedMotion';
import ActionButton from '@/components/ActionButton.vue';
import CarouselControls from '@/components/CarouselControls.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const track = ref(null), runway = ref(null), current = ref(0);
let observer, scrollFrame, manual = false, lastScrollIndex = -1;
const scrollToIndex = (index) => {
  const item = track.value?.children[index];
  if (item) track.value.scrollTo({ left: item.offsetLeft, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
};
const select = (index) => { manual = true; scrollToIndex(index); };
const onScroll = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    if (!runway.value || innerWidth <= 960 || innerHeight < 760 || prefersReducedMotion()) return;
    const rect = runway.value.getBoundingClientRect();
    if (rect.top > innerHeight || rect.bottom < 0) { manual = false; lastScrollIndex = -1; return; }
    if (manual || rect.top > 112) return;
    const travel = Math.max(1, rect.height - runway.value.firstElementChild.offsetHeight);
    const progress = Math.min(1, Math.max(0, (112 - rect.top) / travel));
    const index = Math.min(projects.length - 1, Math.floor(progress * projects.length));
    if (index !== lastScrollIndex) { lastScrollIndex = index; scrollToIndex(index); }
  });
};
const onKey = (event) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  select(event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (current.value + (event.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length);
};
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting && entry.intersectionRatio >= 0.6) current.value = Number(entry.target.dataset.index);
  }, { root: track.value, threshold: 0.6 });
  for (const child of track.value.children) observer.observe(child);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
});
onUnmounted(() => { observer?.disconnect(); cancelAnimationFrame(scrollFrame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); });
</script>
<template>
  <section id="proyectos" class="projects home-projects" aria-labelledby="projects-title">
    <div class="wrap">
      <div class="section-row" v-reveal><div><p class="eyebrow section-kicker">02 / De la idea al espacio</p><h2 id="projects-title">Proyectos que transforman espacios y oportunidades</h2></div></div>
      <p id="project-instructions" class="project-instructions">Desliza para explorar nuestra iniciativa en preparación y la trayectoria del equipo. Con teclado, usa las flechas.</p>
      <div ref="runway" class="project-runway"><div class="project-stage">
      <div id="project-track" ref="track" class="project-track" role="region" aria-roledescription="carrusel" aria-label="Iniciativas y trayectoria" aria-describedby="project-instructions" tabindex="0" @keydown="onKey" @pointerdown="manual = true">
        <div v-for="(project, index) in projects" :key="project.id" class="project-panel" :data-index="index" role="group" aria-roledescription="diapositiva" :aria-label="`${index + 1} de ${projects.length}`"><ProjectCard :project="project" /></div>
      </div>
      <div class="project-toolbar"><div class="project-control-group"><span aria-live="polite" aria-atomic="true" class="project-counter">{{ String(current + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span><CarouselControls :count="projects.length" :current="current" label="Proyecto" controls="project-track" @select="select" /></div><ActionButton to="/proyectos">Ver proyectos <span aria-hidden="true">↗</span></ActionButton></div>
      </div></div>
    </div>
  </section>
</template>
