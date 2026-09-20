import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const scrollMotion = () => (prefersReducedMotion() ? "auto" : "smooth");

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: scrollMotion() };
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

router.afterEach((to) => {
  if (to.hash !== "#contacto-vecinos") return;
  const tryFocus = (attempt = 0) => {
    const input = document.getElementById("neighbor-name");
    if (input) {
      input.focus({ preventScroll: true });
      return;
    }
    if (attempt < 24) requestAnimationFrame(() => tryFocus(attempt + 1));
  };
  requestAnimationFrame(() => tryFocus());
});

export default router;
