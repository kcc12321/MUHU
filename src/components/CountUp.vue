<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: "" },
  decimals: { type: Number, default: 0 },
  immediate: { type: Boolean, default: false },
});

const display = ref(format(0));
const root = ref(null);
let io;
let frame = 0;
let alive = true;

function format(value) {
  const next = props.decimals ? value.toFixed(props.decimals) : Math.round(value);
  return `${next}${props.suffix}`;
}

function animate() {
  if (prefersReducedMotion()) {
    display.value = format(props.to);
    return;
  }

  const start = performance.now();
  const duration = 1400;

  const tick = (now) => {
    if (!alive) return;
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    display.value = format(props.to * eased);
    if (progress < 1) frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
}

onMounted(() => {
  if (props.immediate) {
    animate();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    animate();
    return;
  }

  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animate();
        io.disconnect();
      }
    },
    { threshold: 0.35 },
  );
  if (root.value) io.observe(root.value);
});

onUnmounted(() => {
  alive = false;
  io?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <span ref="root">{{ display }}</span>
</template>
