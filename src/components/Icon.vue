<script setup>
defineProps({
  name: { type: String, required: true },
});
</script>

<template>
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g v-if="name === 'map'">
      <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </g>
    <g v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </g>
    <g v-else-if="name === 'moon'">
      <path d="M15 3a7 7 0 0 0 6 11 8 8 0 1 1-6-11Z" />
      <path d="M9 13h.01M12 16h.01" />
    </g>
    <g v-else-if="name === 'eye'">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </g>
    <g v-else-if="name === 'chart'">
      <path d="M4 19V5M4 19h16" />
      <path d="M8 16v-5M12 16V8M16 16v-8" />
    </g>
    <g v-else-if="name === 'people'">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 19a5 5 0 0 1 5-4" />
    </g>
    <g v-else-if="name === 'heart'">
      <path d="M19.5 12.6 12 20 4.5 12.6A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z" />
    </g>
    <g v-else-if="name === 'shield'">
      <path d="M12 3 5 6v6c0 4.5 3.1 7.4 7 8.7 3.9-1.3 7-4.2 7-8.7V6l-7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </g>
    <g v-else-if="name === 'leaf'">
      <path d="M5 19c8 0 14-8 14-16-8 0-16 6-16 14 4 0 6-2 8-4" />
      <path d="M5 19c2-6 7-11 14-13" />
    </g>
    <g v-else-if="name === 'seed'">
      <path d="M12 21V11" />
      <path d="M12 11c4-1 7-5 7-9-6 0-7 5-7 9Z" />
      <path d="M12 11c-4-1-7-5-7-9 6 0 7 5 7 9Z" />
    </g>
    <g v-else-if="name === 'calendar'">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </g>
    <g v-else>
      <circle cx="12" cy="12" r="8" />
    </g>
  </svg>
</template>
