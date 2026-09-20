<script setup>
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";

const route = useRoute();

const onPageEnter = () => {
  if (route.hash === "#contacto-vecinos") return;
  document.getElementById("main")?.focus({ preventScroll: true });
};
</script>

<template>
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in" @after-enter="onPageEnter">
        <div :key="route.path" class="page-view">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
