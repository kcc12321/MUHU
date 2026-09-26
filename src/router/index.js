import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const scrollMotion = () => (prefersReducedMotion() ? "auto" : "smooth");

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Wait for the preserved out-in page transition when coming from another route.
      return new Promise((resolve) => {
        const locate = (attempt = 0) => {
          const element = document.getElementById(decodeURIComponent(to.hash.slice(1)));
          if (element) {
            const target = to.hash === '#contacto-vecinos' ? document.getElementById('contact-firstName') : element;
            if (target && !target.hasAttribute('tabindex') && target.tagName !== 'INPUT') target.setAttribute('tabindex', '-1');
            target?.focus({ preventScroll: true });
            resolve({ el: element, top: 96, behavior: scrollMotion() });
          } else if (attempt < 90) requestAnimationFrame(() => locate(attempt + 1));
          else resolve({ top: 0 });
        };
        requestAnimationFrame(() => locate());
      });
    }
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/proposito", name: "purpose", component: () => import("@/views/PurposeView.vue") },
    { path: "/proyectos", name: "projects", component: () => import("@/views/ProjectsView.vue") },
    { path: "/empresas", name: "partners", component: () => import("@/views/PartnersView.vue") },
    { path: "/nosotros", name: "about", component: () => import("@/views/AboutView.vue") },
    { path: "/contacto", name: "contact", component: () => import("@/views/ContactView.vue") },
  ],
});

export default router;
