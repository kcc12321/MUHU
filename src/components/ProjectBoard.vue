<script setup>
import { featuredProject as project } from "@/data/home";

defineProps({
  interactive: { type: Boolean, default: true },
});
</script>

<template>
  <div class="project-board" :class="{ 'is-static': !interactive }">
    <div class="project-board-map">
      <p class="project-board-kicker">{{ project.kicker }}</p>
      <dl>
        <div>
          <dt>Nombre</dt>
          <dd>{{ project.name }}</dd>
        </div>
        <div>
          <dt>Cliente</dt>
          <dd>{{ project.client }}</dd>
        </div>
        <div>
          <dt>País</dt>
          <dd>{{ project.country }}</dd>
        </div>
        <div>
          <dt>Región</dt>
          <dd>{{ project.region }}</dd>
        </div>
      </dl>
      <figure>
        <img :src="project.aerial.src" :alt="project.aerial.alt" width="1200" height="1600" />
      </figure>
    </div>
    <div class="project-board-views">
      <figure>
        <img :src="project.campus.src" :alt="project.campus.alt" width="1600" height="900" />
      </figure>
      <figure>
        <img :src="project.entrance.src" :alt="project.entrance.alt" width="1600" height="900" />
      </figure>
    </div>
  </div>
</template>
