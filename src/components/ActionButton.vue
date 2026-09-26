<script setup>
defineProps({ to: { type: [String, Object], default: null }, tone: { type: String, default: 'dark' }, type: { type: String, default: 'button' } });
</script>
<template>
  <RouterLink v-if="to" :to="to" class="btn" :class="`btn-${tone}`"><slot /></RouterLink>
  <button v-else :type="type" class="btn" :class="`btn-${tone}`"><slot /></button>
</template>
