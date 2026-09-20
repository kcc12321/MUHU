<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";
import { brand, nav } from "@/data/content";
import RollText from "./RollText.vue";

const menuOpen = ref(false);
const isBar = ref(false);
const isHidden = ref(false);

const syncHeader = () => {
  const y = window.scrollY;
  if (prefersReducedMotion() || window.innerWidth <= 960) {
    isBar.value = y >= 40;
    isHidden.value = false;
    return;
  }
  if (y < 40) {
    isBar.value = false;
    isHidden.value = false;
  } else if (y < 110) {
    isHidden.value = true;
    isBar.value = false;
  } else {
    isBar.value = true;
    isHidden.value = false;
  }
};

const closeMenu = () => {
  menuOpen.value = false;
};

const onKey = (event) => {
  if (event.key === "Escape") closeMenu();
};

const onResize = () => {
  if (window.innerWidth > 960) closeMenu();
  syncHeader();
};

onMounted(() => {
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  window.removeEventListener("scroll", syncHeader);
  window.removeEventListener("resize", onResize);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <header
    class="site-header is-ready"
    :class="{ 'is-bar': isBar, 'is-hidden': isHidden, 'is-open': menuOpen }"
  >
    <div class="header-inner">
      <router-link class="brand-mark" to="/" :aria-label="`${brand.name} inicio`">
        <span aria-hidden="true"></span>
        {{ brand.name }}
      </router-link>
      <nav class="nav" aria-label="Principal">
        <router-link v-for="item in nav" :key="item.to" :to="item.to">
          <RollText :text="item.label" />
        </router-link>
      </nav>
      <router-link v-magnetic class="btn btn-white header-cta" to="/contacto">Contacto</router-link>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menú</span>
        <span></span><span></span>
      </button>
    </div>
    <div id="mobile-nav" class="mobile-nav" :class="{ 'is-open': menuOpen }" :hidden="!menuOpen">
      <router-link v-for="item in nav" :key="item.to" :to="item.to" @click="closeMenu">
        {{ item.label }}
      </router-link>
      <router-link class="btn btn-white" to="/contacto" @click="closeMenu">Contacto</router-link>
    </div>
  </header>
</template>
