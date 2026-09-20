<script setup>
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const props = defineProps({
  text: { type: String, required: true },
  mode: { type: String, default: "hover" },
});

const reduced = prefersReducedMotion();
const chars = [...props.text];
</script>

<template>
  <span v-if="reduced">{{ text }}</span>
  <span v-else class="roll" :class="{ 'roll-in': mode === 'enter' }">
    <span class="sr-only">{{ text }}</span>
    <span
      v-for="(char, index) in chars"
      :key="`${char}-${index}`"
      class="roll-ch"
      aria-hidden="true"
      :style="{ '--i': index }"
    >{{ char === " " ? "\u00A0" : char }}</span>
  </span>
</template>
