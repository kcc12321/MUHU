<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { prefersReducedMotion } from "@/composables/useReducedMotion";
import { brand } from "@/data/content";
import { homeNav as nav } from '@/data/home';
import RollText from "./RollText.vue";

const menuOpen = ref(false);
const route = useRoute();
const toggle = ref(null);
const headerFocused = ref(false);
const isBar = ref(false);
const isHidden = ref(false);

const cinemaOnScreen = () => {
  const stage = document.querySelector(".stage");
  if (!stage) return false;
  const box = stage.getBoundingClientRect();
  return box.bottom > 80 && box.top < window.innerHeight - 40;
};

const syncHeader = () => {
  const y = window.scrollY;
  if (route.path === "/" && cinemaOnScreen() && !menuOpen.value) {
    isBar.value = false;
    isHidden.value = false;
    return;
  }
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
  if (event.key === "Escape" && menuOpen.value) { closeMenu(); toggle.value?.focus(); }
};
watch(() => route.fullPath, () => {
  closeMenu();
  syncHeader();
});

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
    :class="{ 'is-bar': isBar || route.path !== '/' || headerFocused, 'is-hidden': isHidden && !headerFocused, 'is-open': menuOpen }"
    @focusin="headerFocused = true"
    @focusout="headerFocused = $event.currentTarget.contains($event.relatedTarget); !headerFocused && closeMenu()"
  >
    <div class="header-inner">
      <router-link class="brand-mark" to="/" :aria-label="`${brand.name} inicio`">
        <span aria-hidden="true"></span>
        {{ brand.name }}
      </router-link>
      <nav class="nav" aria-label="Principal">
        <router-link v-for="item in nav" :key="item.to" :to="item.to" :class="{ 'nav-donate': item.label === 'Quiero ayudar' }" :aria-current="route.fullPath === item.to ? 'location' : undefined">
          <RollText :text="item.label" />
        </router-link>
      </nav>
      <button
        ref="toggle"
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
    <nav id="mobile-nav" aria-label="Principal móvil" class="mobile-nav" :class="{ 'is-open': menuOpen }" :hidden="!menuOpen">
      <router-link v-for="item in nav" :key="item.to" :to="item.to" @click="closeMenu">
        {{ item.label }}
      </router-link>
    </nav>
  </header>
</template>
