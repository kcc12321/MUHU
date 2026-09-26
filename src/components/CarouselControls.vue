<script setup>
defineProps({ count: { type: Number, required: true }, current: { type: Number, required: true }, label: { type: String, required: true }, controls: { type: String, required: true } });
defineEmits(['select']);
</script>
<template>
  <div class="carousel-controls" role="group" :aria-label="label">
    <button type="button" class="carousel-arrow" :aria-controls="controls" aria-label="Anterior" @click="$emit('select', (current - 1 + count) % count)">←</button>
    <button v-for="n in count" :key="n" type="button" class="carousel-dot" :class="{ 'is-active': current === n - 1 }" :aria-label="`${label}: ${n} de ${count}`" :aria-pressed="current === n - 1" :aria-controls="controls" @click="$emit('select', n - 1)"><span></span></button>
    <button type="button" class="carousel-arrow" :aria-controls="controls" aria-label="Siguiente" @click="$emit('select', (current + 1) % count)">→</button>
  </div>
</template>
