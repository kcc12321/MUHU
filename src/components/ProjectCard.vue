<script setup>
defineProps({ project: { type: Object, required: true }, compact: Boolean });
</script>
<template>
  <article :class="[compact ? 'project-summary' : 'project-slide', { 'is-planned-slide': project.category === 'Proyecto Planificado' || project.id === 'cds-musa' }]">
    <figure v-if="!compact" class="project-photo"><img :src="project.image" :alt="project.alt" width="960" height="720" loading="lazy" decoding="async"><figcaption>{{ project.note }}</figcaption></figure>
    <div class="project-copy"><span class="pill project-category">{{ project.category }}</span><h3>{{ project.title }}</h3><p>{{ compact ? project.detail : project.description }}</p><p class="project-state"><span class="status-dot" aria-hidden="true"></span>{{ project.status }}<time v-if="project.date" :datetime="project.date"> · {{ project.date }}</time></p></div>
  </article>
</template>
