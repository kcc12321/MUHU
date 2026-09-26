<script setup>
import { computed } from "vue";
import { legalDocs, legalNav } from "@/data/legal";

const props = defineProps({
  doc: { type: String, required: true },
});

const page = computed(() => legalDocs[props.doc] || legalDocs.privacy);
</script>

<template>
  <article class="legal-page">
    <header class="page-hero legal-hero">
      <img src="/assets/fondon naturaleza.png" alt="" width="1920" height="980" decoding="async">
      <div class="wrap hero-wrap">
        <div v-reveal>
          <p class="pill pill-light">{{ page.kicker }}</p>
          <h1>{{ page.title }}</h1>
          <p class="legal-updated">Actualizado el {{ page.updated }}</p>
        </div>
      </div>
    </header>
    <div class="wrap legal-body">
      <p v-reveal class="legal-lede">{{ page.lede }}</p>
      <nav v-reveal class="legal-switch" aria-label="Documentos legales">
        <RouterLink v-for="item in legalNav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
      <section v-for="(block, index) in page.sections" :key="block.title" v-reveal class="legal-block">
        <h2>{{ block.title }}</h2>
        <p v-for="(paragraph, pIndex) in block.paragraphs" :key="`${index}-${pIndex}`">{{ paragraph }}</p>
      </section>
    </div>
  </article>
</template>
