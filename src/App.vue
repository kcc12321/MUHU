<script setup>
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import SiteLoader from "@/components/SiteLoader.vue";

const route = useRoute();

const onPageEnter = () => {
  if (route.hash) return;
  document.getElementById("main")?.focus({ preventScroll: true });
};
</script>

<template>
  <SiteLoader />
  <div class="site-bg-canvas" aria-hidden="true"></div>
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
  <HomeFooter />
</template>
