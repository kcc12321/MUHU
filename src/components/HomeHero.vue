<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { brand, ticker } from '@/data/content';
import { heroSlides } from '@/data/home';
import RollText from '@/components/RollText.vue';
import ActionButton from '@/components/ActionButton.vue';
import CarouselControls from '@/components/CarouselControls.vue';

const current = ref(0);
const controlsHovered = ref(false);
const controlsFocused = ref(false);
const paused = ref(false);
const hidden = ref(false);
const reduced = ref(false);

const tickerGroup = [...ticker, ...ticker, ...ticker];
const carouselStopped = computed(() => controlsHovered.value || controlsFocused.value || paused.value || hidden.value || reduced.value);

let timer, motion;
const select = (index) => { current.value = index; };
const syncTimer = () => {
  clearInterval(timer);
  if (!carouselStopped.value) timer = setInterval(() => select((current.value + 1) % heroSlides.length), 5000);
};
const visibility = () => { hidden.value = document.hidden; };
const motionChange = () => { reduced.value = motion.matches; };
const onControlsFocusOut = (event) => { controlsFocused.value = event.currentTarget.contains(event.relatedTarget); };

watch(carouselStopped, syncTimer);

onMounted(() => {
  motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionChange(); visibility();
  motion.addEventListener('change', motionChange);
  document.addEventListener('visibilitychange', visibility);
  syncTimer();
});
onUnmounted(() => { clearInterval(timer); motion?.removeEventListener('change', motionChange); document.removeEventListener('visibilitychange', visibility); });
</script>
<template>
  <section id="top" class="hero home-hero" aria-labelledby="hero-title">
    <div id="hero-images" class="hero-images" role="region" aria-roledescription="carrusel" aria-label="Espacios de referencia">
      <img v-for="(slide, index) in heroSlides" :key="slide.src" class="hero-img" :class="{ 'is-active': current === index }" :src="slide.src" :alt="slide.alt" :aria-hidden="current !== index" width="1920" height="980" :fetchpriority="index === 0 ? 'high' : 'low'" decoding="async">
    </div>
    <div class="hero-inner">
      <div class="hero-copy">
        <h1 id="hero-title" :aria-label="brand.slogan"><span v-for="word in brand.slogan.split(' ')" :key="word" class="hero-word" aria-hidden="true"><RollText :text="word" mode="enter" /></span></h1>
        <p class="hero-description">Diseñamos y desarrollamos espacios dignos que buscan mejorar la calidad de vida de comunidades vulnerables.</p>
        <div class="hero-actions">
          <span class="hero-cta"><ActionButton tone="yellow" to="/#quiero-ayudar">Quiero ayudar <span aria-hidden="true">↗</span></ActionButton></span>
          <span class="hero-cta"><ActionButton tone="white" to="/#proyectos">Ver proyectos</ActionButton></span>
        </div>
      </div>
      <div class="hero-pagination" @mouseenter="controlsHovered = true" @mouseleave="controlsHovered = false" @focusin="controlsFocused = true" @focusout="onControlsFocusOut">
        <p class="hero-caption">{{ heroSlides[current].caption }}</p>
        <div class="hero-control-row"><CarouselControls :count="heroSlides.length" :current="current" label="Imagen" controls="hero-images" @select="select" /><button class="carousel-arrow pause-button" type="button" :disabled="reduced" :aria-pressed="paused || reduced" :aria-label="paused ? 'Reanudar rotación automática al salir del carrusel' : 'Pausar rotación automática'" @click="paused = !paused">{{ paused || reduced ? '▶' : 'Ⅱ' }}</button></div>
        <p class="image-disclaimer">Imágenes referenciales · no son obras de MUHU</p>
      </div>
    </div>
    <div class="ticker" aria-hidden="true">
      <div class="ticker-track">
        <div class="ticker-group">
          <span v-for="(item, index) in tickerGroup" :key="`g1-${index}`" class="ticker-item">{{ item }}</span>
        </div>
        <div class="ticker-group" aria-hidden="true">
          <span v-for="(item, index) in tickerGroup" :key="`g2-${index}`" class="ticker-item">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
