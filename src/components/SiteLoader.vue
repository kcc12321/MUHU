<script setup>
import { onMounted, ref } from 'vue';
import { prefersReducedMotion } from '@/composables/useReducedMotion';

const isVisible = ref(true);
const isLeaving = ref(false);
const isDone = ref(false);
const progress = ref(0);

onMounted(() => {
  if (prefersReducedMotion()) {
    isDone.value = true;
    isVisible.value = false;
    return;
  }

  // Animación de barra de carga arquitectónica
  const startTime = performance.now();
  const duration = 750;

  const animateProgress = (now) => {
    const elapsed = now - startTime;
    const p = Math.min(100, Math.round((elapsed / duration) * 100));
    progress.value = p;
    if (elapsed < duration) {
      requestAnimationFrame(animateProgress);
    } else {
      setTimeout(() => {
        isLeaving.value = true;
        setTimeout(() => {
          isDone.value = true;
          isVisible.value = false;
        }, 650);
      }, 150);
    }
  };

  requestAnimationFrame(animateProgress);
});
</script>

<template>
  <div v-if="!isDone" class="site-loader" :class="{ 'is-leaving': isLeaving }" aria-hidden="true">
    <div class="loader-content">
      <div class="loader-mark">
        <svg class="loader-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="24" cy="24" r="21" class="loader-circle" />
          <path d="M24 10v28M15 19l9-9 9 9M15 29l9 9 9-9" class="loader-lines" />
        </svg>
        <span class="loader-brand">MUHU</span>
      </div>
      <p class="loader-tagline">Arquitectura con propósito social</p>
      <div class="loader-track">
        <div class="loader-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <span class="loader-counter">{{ String(progress).padStart(2, '0') }}%</span>
    </div>
  </div>
</template>

<style scoped>
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #15251d;
  color: #f7f3ec;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease;
  will-change: transform;
}

.site-loader.is-leaving {
  transform: translateY(-100%);
  opacity: 0.98;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 320px;
  width: 90%;
  text-align: center;
}

.loader-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loader-icon {
  width: 52px;
  height: 52px;
  color: #f0b48f;
  animation: pulse-ring 2s ease-in-out infinite;
}

.loader-circle {
  stroke-dasharray: 140;
  stroke-dashoffset: 40;
  animation: dash 2.4s ease-in-out infinite alternate;
}

@keyframes dash {
  from { stroke-dashoffset: 140; }
  to { stroke-dashoffset: 0; }
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.06); opacity: 1; }
}

.loader-brand {
  font-family: Figtree, sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  color: #fff;
}

.loader-tagline {
  font-size: 13px;
  color: #d8d0c3;
  letter-spacing: 0.04em;
  font-weight: 400;
  margin: 0;
}

.loader-track {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 6px;
}

.loader-fill {
  height: 100%;
  background: linear-gradient(90deg, #f0b48f, #e6edde);
  border-radius: 2px;
  transition: width 0.08s linear;
}

.loader-counter {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: #a49e93;
  letter-spacing: 0.08em;
}
</style>
