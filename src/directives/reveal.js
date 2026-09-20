import { prefersReducedMotion } from "@/composables/useReducedMotion";

const observe = (el) => {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    el.classList.add("is-in");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  io.observe(el);
  el._revealIo = io;
};

const applyTokens = (el, value) => {
  if (typeof value !== "string" || !value) return;
  value.split(/\s+/).forEach((token) => {
    if (token === "clip") el.classList.add("reveal-clip");
    else if (token === "scale") el.classList.add("reveal-scale");
    else el.classList.add(token);
  });
};

export default {
  mounted(el, binding) {
    el.classList.add("reveal");
    applyTokens(el, binding.value);
    observe(el);
  },
  unmounted(el) {
    el._revealIo?.disconnect();
  },
};
