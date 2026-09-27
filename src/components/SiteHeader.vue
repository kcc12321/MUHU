<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { brand } from "@/data/content";
import { homeNav as nav } from '@/data/home';
import RollText from "./RollText.vue";

const menuOpen = ref(false);
const route = useRoute();
const toggle = ref(null);
const headerEl = ref(null);

const closeMenu = () => {
  menuOpen.value = false;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const onKey = (event) => {
  if (event.key === "Escape" && menuOpen.value) {
    closeMenu();
    toggle.value?.focus();
  }
};

const onClickOutside = (event) => {
  if (menuOpen.value && headerEl.value && !headerEl.value.contains(event.target)) {
    closeMenu();
  }
};

watch(() => route.fullPath, closeMenu);

const onResize = () => {
  if (window.innerWidth > 960) closeMenu();
};

const isLinkActive = (to) => {
  if (to === '/#top' || to === '/') return route.path === '/' && !route.hash;
  if (to.startsWith('/#')) return route.path === '/' && route.hash === to.slice(1);
  return route.path === to;
};

onMounted(() => {
  window.addEventListener("resize", onResize);
  document.addEventListener("keydown", onKey);
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  document.removeEventListener("keydown", onKey);
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <header
    ref="headerEl"
    class="site-header"
    :class="{ 'is-open': menuOpen }"
  >
    <div class="header-inner">
      <!-- Clean Brand Logo -->
      <router-link class="header-brand" to="/" :aria-label="`${brand.name} inicio`" @click="closeMenu">
        <span class="header-brand-dot" aria-hidden="true"></span>
        <span class="header-brand-name">{{ brand.name }}</span>
      </router-link>

      <!-- Desktop Navigation Menu -->
      <nav class="nav" aria-label="Principal">
        <template v-for="item in nav" :key="item.to">
          <!-- CTA Button for "Quiero ayudar" -->
          <router-link
            v-if="item.label === 'Quiero ayudar'"
            :to="item.to"
            class="nav-cta-btn"
            :aria-label="item.label"
          >
            <span class="heart-icon" aria-hidden="true">♥</span>
            <span>{{ item.label }}</span>
            <span class="arrow-accent" aria-hidden="true">↗</span>
          </router-link>

          <!-- Standard Nav Link -->
          <router-link
            v-else
            :to="item.to"
            class="nav-link"
            :class="{ 'is-active': isLinkActive(item.to) }"
            :aria-current="isLinkActive(item.to) ? 'page' : undefined"
          >
            <RollText :text="item.label" />
          </router-link>
        </template>
      </nav>

      <!-- Mobile Hamburger Button: SVG 100% Simétrico, Nítido e Interactivo -->
      <button
        ref="toggle"
        class="menu-toggle"
        :class="{ 'is-active': menuOpen }"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click.stop="toggleMenu"
      >
        <span class="sr-only">{{ menuOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
        <!-- Icono cuando está cerrado: 2 barras limpias -->
        <svg
          v-if="!menuOpen"
          class="menu-icon icon-hamburger"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
        <!-- Icono cuando está abierto: X perfecta y centrada -->
        <svg
          v-else
          class="menu-icon icon-close"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Navigation con animación fluida -->
    <Transition name="mobile-menu">
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        aria-label="Principal móvil"
        class="mobile-nav"
      >
        <div class="mobile-nav-inner">
          <router-link
            v-for="(item, idx) in nav"
            :key="item.to"
            :to="item.to"
            class="mobile-nav-link"
            :style="{ '--item-idx': idx }"
            :class="{ 'mobile-nav-cta': item.label === 'Quiero ayudar', 'is-active': isLinkActive(item.to) }"
            @click="closeMenu"
          >
            <span v-if="item.label === 'Quiero ayudar'" class="mobile-heart" aria-hidden="true">♥</span>
            <span>{{ item.label }}</span>
            <span v-if="item.label === 'Quiero ayudar'" class="arrow-accent">↗</span>
          </router-link>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
/* ==========================================================================
   SITE HEADER: VERDE BOSQUE MUHU, ELEGANTE, DESPEJADA Y NÍTIDA
   ========================================================================== */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  background: rgba(23, 55, 36, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}

.header-inner {
  width: min(1420px, calc(100% - 56px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Brand Logo */
.header-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
}

.header-brand-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #c46a3a;
  display: inline-block;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(196, 106, 58, 0.5);
  animation: dotBreathe 4s infinite ease-in-out;
}

@keyframes dotBreathe {
  0%, 100% {
    box-shadow: 0 0 8px rgba(196, 106, 58, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 16px rgba(196, 106, 58, 0.7);
    transform: scale(1.06);
  }
}

.header-brand-name {
  font-family: Figtree, sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0.08em;
  color: #ffffff !important;
  line-height: 1;
}

/* Navigation Links */
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-link.is-active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  font-weight: 600;
}

/* CTA "Quiero ayudar" */
.nav-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff !important;
  background: #c46a3a;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  margin-left: 12px;
}

.nav-cta-btn:hover {
  background: #d47644;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.heart-icon {
  font-size: 13px;
  color: #ffe8de;
}

.arrow-accent {
  font-size: 14px;
  line-height: 1;
}

/* Mobile Hamburger Button */
.menu-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  cursor: pointer;
  padding: 0;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: scale(1.05);
}

.menu-toggle:active {
  transform: scale(0.95);
}

.menu-toggle.is-active {
  background: rgba(196, 106, 58, 0.25);
  border-color: rgba(196, 106, 58, 0.5);
  color: #f7c9b0;
}

.menu-icon {
  display: block;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.icon-close {
  animation: closeSpin 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes closeSpin {
  from { transform: rotate(-90deg) scale(0.7); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
}

/* Mobile Dropdown Nav - display: flex !important */
.mobile-nav {
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  display: flex !important;
  flex-direction: column;
  background: rgba(21, 48, 32, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
  padding: 20px 24px 28px;
  z-index: 999;
}

/* Transición suave para apertura del menú móvil */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-nav-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(1420px, 100%);
  margin: 0 auto;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  transition: background 0.2s ease, transform 0.2s ease;
}

/* Cascada sutil al abrir el menú */
.mobile-menu-enter-active .mobile-nav-link {
  animation: mobileLinkIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--item-idx, 0) * 0.04s + 0.04s);
}

@keyframes mobileLinkIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: none; }
}

.mobile-nav-link:hover,
.mobile-nav-link.is-active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 600;
  transform: translateX(4px);
}

.mobile-nav-cta {
  margin-top: 12px;
  background: #c46a3a !important;
  color: #ffffff !important;
  font-weight: 600;
  justify-content: center;
  gap: 10px;
}

.mobile-nav-cta:hover {
  background: #d47644 !important;
  transform: translateY(-1px) !important;
}

@media (max-width: 960px) {
  .nav {
    display: none;
  }
  .menu-toggle {
    display: inline-flex;
  }
}

@media (max-width: 768px) {
  .site-header {
    height: 70px;
  }
  .header-inner {
    width: calc(100% - 32px);
  }
  .mobile-nav {
    top: 70px;
  }
}

@media (max-width: 480px) {
  .site-header {
    height: 68px;
    padding: 0 16px;
  }
  .header-inner {
    width: 100%;
  }
  .mobile-nav {
    top: 68px;
    padding: 16px 16px 24px;
  }
  .header-brand-name {
    font-size: 21px;
  }
  .header-brand-dot {
    width: 22px;
    height: 22px;
  }
  .menu-toggle {
    width: 40px;
    height: 40px;
  }
}
</style>
