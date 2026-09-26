<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { brand } from "@/data/content";

const video = ref(null);
let retryId = 0;

const playVideo = () => {
  const node = video.value;
  if (!node) return;
  node.muted = true;
  node.defaultMuted = true;
  node.loop = true;
  node.playsInline = true;
  const run = node.play();
  if (run) run.catch(() => {});
};

onMounted(() => {
  playVideo();
  const node = video.value;
  node?.addEventListener("canplay", playVideo);
  node?.addEventListener("loadeddata", playVideo);
  document.addEventListener("visibilitychange", playVideo);
  retryId = window.setInterval(() => {
    if (video.value && !video.value.paused) {
      window.clearInterval(retryId);
      retryId = 0;
      return;
    }
    playVideo();
  }, 400);
});

onUnmounted(() => {
  video.value?.removeEventListener("canplay", playVideo);
  video.value?.removeEventListener("loadeddata", playVideo);
  document.removeEventListener("visibilitychange", playVideo);
  if (retryId) window.clearInterval(retryId);
});
</script>

<template>
  <section id="top" class="cinema-scroll cinema-scroll-video" aria-label="Presentación de MUHU">
    <div class="stage">
      <div class="world">
        <video
          ref="video"
          class="scene-video"
          src="/assets/16784256_3840_2160_24fps.mp4"
          muted
          loop
          playsinline
          autoplay
          preload="auto"
          aria-hidden="true"
        />
        <div class="video-veil"></div>
        <div class="hero-lockup">
          <h1 class="hero-title">{{ brand.name }}</h1>
          <p class="hero-slogan">{{ brand.slogan }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
