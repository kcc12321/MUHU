import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { prefersReducedMotion } from "@/composables/useReducedMotion";

const scrollMotion = () => (prefersReducedMotion() ? "auto" : "smooth");
let scrollGen = 0;

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    const generation = ++scrollGen;
    if (savedPosition) return savedPosition;
    if (to.hash === "#top") return { top: 0, left: 0 };
    if (to.hash) {
      return new Promise((resolve) => {
        const locate = (attempt = 0) => {
          if (generation !== scrollGen) return resolve(false);
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
    if (!_from.matched?.length && to.path === "/") {
      const y = Number(sessionStorage.getItem("muhu-home-scroll-y") || 0);
      if (Number.isFinite(y) && y > 0) return { left: 0, top: y };
      return false;
    }
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/nosotros", name: "about", component: () => import("@/views/AboutView.vue") },
    { path: "/privacidad", name: "privacy", component: () => import("@/views/LegalView.vue"), props: { doc: "privacy" } },
    { path: "/terminos", name: "terms", component: () => import("@/views/LegalView.vue"), props: { doc: "terms" } },
    { path: "/cookies", name: "cookies", component: () => import("@/views/LegalView.vue"), props: { doc: "cookies" } },
  ],
});

router.beforeEach((to) => {
  if (to.path === "/" && to.hash === "#privacidad") {
    return { path: "/privacidad", hash: "", replace: true };
  }
});

export default router;
