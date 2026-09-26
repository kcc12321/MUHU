<script setup>
import { onMounted, onUnmounted } from "vue";
import CinemaScroll from "@/components/CinemaScroll.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import HelpSection from "@/components/HelpSection.vue";
import ContactForm from "@/components/ContactForm.vue";
import { replayReveals } from "@/directives/reveal";

const scrollKey = "muhu-home-scroll-y";

const saveScroll = () => {
  sessionStorage.setItem(scrollKey, String(Math.round(window.scrollY)));
};

const restoreScroll = () => {
  const y = Number(sessionStorage.getItem(scrollKey) || 0);
  if (Number.isFinite(y) && y > 0) window.scrollTo(0, y);
};

const onShow = () => {
  if (document.visibilityState === "visible") replayReveals();
};

onMounted(() => {
  const nav = performance.getEntriesByType("navigation")[0];
  if (nav?.type === "reload" && !window.location.hash) restoreScroll();
  replayReveals();
  window.addEventListener("scroll", saveScroll, { passive: true });
  document.addEventListener("visibilitychange", onShow);
});

onUnmounted(() => {
  window.removeEventListener("scroll", saveScroll);
  document.removeEventListener("visibilitychange", onShow);
});
</script>

<template>
  <div class="landing">
    <CinemaScroll />
    <ProjectsSection />
    <HelpSection />
    <ContactForm />
  </div>
</template>
