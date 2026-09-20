import { prefersReducedMotion } from "@/composables/useReducedMotion";

const canMagnet = () =>
  !prefersReducedMotion() && window.matchMedia("(pointer: fine)").matches;

export default {
  mounted(el) {
    if (!canMagnet()) return;

    const strength = 8;
    el.classList.add("is-magnetic");

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const reset = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    el._magnetic = { onMove, reset };
  },
  unmounted(el) {
    if (!el._magnetic) return;
    el.removeEventListener("mousemove", el._magnetic.onMove);
    el.removeEventListener("mouseleave", el._magnetic.reset);
  },
};
