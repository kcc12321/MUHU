<script setup>
import { onMounted, ref } from "vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const isVisible = ref(true);
const isLeaving = ref(false);
const isDone = ref(false);
const isReady = ref(false);
const progress = ref(0);

onMounted(() => {
  if (prefersReducedMotion()) {
    isDone.value = true;
    isVisible.value = false;
    return;
  }

  requestAnimationFrame(() => {
    isReady.value = true;
  });

  const startTime = performance.now();
  const duration = 2200;

  const animateProgress = (now) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const eased = 1 - (1 - t) ** 3;
    progress.value = Math.round(eased * 100);
    if (t < 1) {
      requestAnimationFrame(animateProgress);
      return;
    }
    setTimeout(() => {
      isLeaving.value = true;
      setTimeout(() => {
        isDone.value = true;
        isVisible.value = false;
      }, 720);
    }, 180);
  };

  requestAnimationFrame(animateProgress);
});
</script>

<template>
  <div
    v-if="!isDone"
    class="site-loader"
    :class="{ 'is-ready': isReady, 'is-leaving': isLeaving }"
    aria-hidden="true"
  >
    <div class="loader-content">
      <div class="loader-mark">
        <svg class="loader-arrow" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path class="arrow-head arrow-up" d="M16 16.5 24 8.5 32 16.5" />
          <path class="arrow-shaft" d="M24 10.5v27" />
          <path class="arrow-head arrow-down" d="M16 31.5 24 39.5 32 31.5" />
        </svg>
        <span class="loader-brand" aria-label="MUHU">
          <span v-for="(letter, index) in 'MUHU'" :key="`${letter}-${index}`" :style="{ '--i': index }">{{ letter }}</span>
        </span>
      </div>
      <p class="loader-tagline">Arquitectura con propósito social</p>
      <div class="loader-meter">
        <div class="loader-track">
          <div class="loader-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <span class="loader-counter">{{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b120e;
  color: #f6f8f4;
  pointer-events: none;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(420px, 86vw);
  text-align: center;
}

.loader-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.loader-arrow {
  width: 36px;
  height: 36px;
  stroke: #ead7c6;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateY(10px);
}

.arrow-shaft,
.arrow-head {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
}

.is-ready .loader-arrow {
  animation: arrow-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards, arrow-float 1.35s 0.7s ease-in-out infinite;
}

.is-ready .arrow-shaft,
.is-ready .arrow-head {
  animation: draw-line 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.is-ready .arrow-down {
  animation-delay: 0.12s;
}

.loader-brand {
  display: flex;
  gap: 0.18em;
  font-family: Figtree, sans-serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
}

.loader-brand span {
  display: inline-block;
  opacity: 0;
  transform: translateY(12px);
}

.is-ready .loader-brand span {
  animation: letter-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.28s + var(--i) * 0.08s);
}

.loader-tagline {
  margin: 22px 0 0;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: rgba(246, 248, 244, 0.72);
  opacity: 0;
  transform: translateY(8px);
}

.is-ready .loader-tagline {
  animation: letter-in 0.8s 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.loader-meter {
  width: 100%;
  margin-top: 36px;
  opacity: 0;
}

.is-ready .loader-meter {
  animation: letter-in 0.6s 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.loader-track {
  width: 100%;
  height: 1px;
  overflow: hidden;
  background: rgba(246, 248, 244, 0.18);
}

.loader-fill {
  height: 100%;
  background: #ead7c6;
  box-shadow: 0 0 12px rgba(234, 215, 198, 0.35);
  transition: width 0.08s linear;
}

.loader-counter {
  display: block;
  margin-top: 14px;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: rgba(246, 248, 244, 0.55);
  font-variant-numeric: tabular-nums;
}

.site-loader.is-leaving {
  animation: loader-out 0.72s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

@keyframes arrow-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes arrow-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@keyframes letter-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loader-out {
  to {
    opacity: 0;
    transform: scale(1.04);
    filter: blur(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-loader,
  .loader-arrow,
  .arrow-shaft,
  .arrow-head,
  .loader-brand span,
  .loader-tagline,
  .loader-meter {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
}
</style>
