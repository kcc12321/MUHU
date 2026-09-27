<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import SiteLoader from "@/components/SiteLoader.vue";
import { asset } from "@/lib/assets";

const route = useRoute();

const onPageEnter = () => {
  if (route.hash) return;
  document.getElementById("main")?.focus({ preventScroll: true });
};

const canvasStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(243, 239, 230, 0.68), rgba(243, 239, 230, 0.68)), url("${asset('/assets/beige-botanical-bg.jpg')}")`
}));
</script>

<template>
  <SiteLoader />
  <div class="site-bg-canvas" :style="canvasStyle" aria-hidden="true"></div>
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
