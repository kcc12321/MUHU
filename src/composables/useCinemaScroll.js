import { onMounted, onUnmounted } from "vue";

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (e0, e1, v) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;
const segmentInOut = (s, a, b, c, d) => {
  const enter = smoothstep(a, b, s);
  const exit = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
};

export function useCinemaScroll(sectionRef) {
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetScroll = 0;
  let smoothScroll = 0;
  let initialized = false;
  let catchingUp = false;
  let rafPending = false;
  let rafId = 0;
  let disposed = false;
  let reduceMotion;

  const setVar = (name, value) => {
    const section = sectionRef.value;
    if (section) section.style.setProperty(name, value);
  };

  const getScrollDistance = () => {
    const section = sectionRef.value;
    if (!section) return 0;
    return clamp(-section.getBoundingClientRect().top, 0, section.offsetHeight - window.innerHeight);
  };

  const update = () => {
    rafPending = false;
    if (disposed) return;
    const section = sectionRef.value;
    if (!section || !reduceMotion) return;

    targetScroll = getScrollDistance();
    if (reduceMotion.matches) {
      smoothScroll = targetScroll;
      initialized = true;
      catchingUp = false;
    } else if (!initialized) {
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, catchingUp ? 0.042 : 0.1);
    }
    if (Math.abs(smoothScroll - targetScroll) < (catchingUp ? 0.8 : 0.04)) {
      smoothScroll = targetScroll;
      catchingUp = false;
    }

    mouseX = lerp(mouseX, targetMouseX, 0.08);
    mouseY = lerp(mouseY, targetMouseY, 0.08);

    const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
    const frame3 = segmentInOut(smoothScroll, 1760, 2140, 8000, 8000);
    const progress = clamp(smoothScroll / 2700);
    const introExit = smoothstep(90, 650, smoothScroll);
    const blurActive = clamp(frame2.active + frame3.active);
    const frame2Opacity = frame2.active * (1 - frame3.enter);
    const splitDrift = Math.pow(frame2.enter, 1.5);
    const panel2Opacity = frame2.active * (1 - frame2.exit);
    const panel3Opacity = frame3.enter;
    const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
    const sharedHeroY = progress * -74;
    const sharedHeroScale = progress * 0.23;

    setVar("--mx", (reduceMotion.matches ? 0 : mouseX).toFixed(4));
    setVar("--my", (reduceMotion.matches ? 0 : mouseY).toFixed(4));
    setVar("--back-opacity", String(1 - frame2.active * 0.06));
    setVar("--back-x", `${mouseX * -12}px`);
    setVar("--back-y", `${mouseY * -4}px`);
    setVar("--back-scale", String(backScale));
    setVar("--four-y", `${10 + progress * 10}vh`);
    setVar("--four-scale", String(0.78 + progress * 0.16));
    setVar("--bazaar-y", `${20 - progress * 8}vh`);
    setVar("--blur-px", `${blurActive * 14}px`);
    setVar("--back-brightness", String(1 - blurActive * 0.255));
    setVar("--bazaar-blur-px", `${frame2.active * 14}px`);
    setVar("--bazaar-brightness", String(1 - frame2.active * 0.255 - frame3.active * 0.06));
    setVar("--bazaar-saturation", String(1 + frame3.active * 0.18));
    setVar("--shade-opacity", "1");
    setVar("--shade-z", frame2.active > 0.02 ? "2" : "0");
    setVar("--shade-top-alpha", String(blurActive * 0.465));
    setVar("--shade-mid-alpha", String(blurActive * 0.42));
    setVar("--shade-bottom-alpha", String(blurActive * 0.51));
    setVar("--title-y", `${introExit * -210}px`);
    setVar("--title-scale", String(1 - introExit * 0.08));
    setVar("--title-opacity", String(1 - introExit));
    setVar("--bridge-x", `calc(-50% + ${mouseX * 18}px)`);
    setVar("--bridge-y", `${mouseY * 8 + sharedHeroY - frame2.exit * 760}px`);
    setVar("--bridge-bottom", `${5 - frame2.enter * 13}vh`);
    setVar("--bridge-width", `${67.2 + frame2.enter * 37.8}vw`);
    setVar("--bridge-scale", String(1.02 + sharedHeroScale + frame2.exit * 0.46));
    setVar("--split-left-x", `calc(-50% + ${-splitDrift * 46}vw + ${mouseX * 22}px)`);
    setVar("--split-left-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
    setVar("--split-left-scale", String(1 + sharedHeroScale + frame2.enter * 0.74));
    setVar("--split-right-x", `calc(-50% + ${splitDrift * 46}vw + ${mouseX * 22}px)`);
    setVar("--split-right-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
    setVar("--split-right-scale", String(1 + sharedHeroScale + frame2.enter * 0.74));
    setVar("--frame2-opacity", String(frame2Opacity));
    setVar("--frame2-x", `calc(-50% + ${mouseX * 10}px)`);
    setVar("--frame2-y", `calc(-50% + ${mouseY * 8 - frame2.exit * 150}px)`);
    setVar("--frame2-scale", String(1.06 + frame2.enter * 0.08 + frame2.exit * 0.08));
    setVar("--intro-copy-y", `${introExit * 90}px`);
    setVar("--intro-copy-opacity", String(1 - introExit));
    setVar("--panel2-opacity", String(panel2Opacity));
    setVar("--panel2-y", `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`);
    setVar("--panel3-opacity", String(panel3Opacity));
    setVar("--panel3-y", `calc(-50% + ${(1 - frame3.enter) * 58}px)`);

    if (
      Math.abs(smoothScroll - targetScroll) > 0.04 ||
      Math.abs(mouseX - targetMouseX) > 0.001 ||
      Math.abs(mouseY - targetMouseY) > 0.001
    ) {
      requestTick();
    }
  };

  const requestTick = () => {
    if (rafPending || disposed) return;
    rafPending = true;
    rafId = requestAnimationFrame(update);
  };

  const onScroll = () => requestTick();
  const onResize = () => requestTick();
  const onPointerMove = (event) => {
    targetMouseX = event.clientX / window.innerWidth - 0.5;
    targetMouseY = event.clientY / window.innerHeight - 0.5;
    requestTick();
  };

  const replayInPlace = () => {
    smoothScroll = 0;
    initialized = true;
    catchingUp = true;
    mouseX = 0;
    mouseY = 0;
    requestTick();
  };

  const onShow = () => {
    if (document.visibilityState === "visible") replayInPlace();
  };

  onMounted(() => {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    requestAnimationFrame(() => requestAnimationFrame(replayInPlace));
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  });

  onUnmounted(() => {
    disposed = true;
    document.documentElement.classList.remove("cinema-finale");
    cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onShow);
  });
}
