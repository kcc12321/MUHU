<script setup>
import { nextTick, reactive, ref } from "vue";
import Icon from "@/components/Icon.vue";
import { partnerBenefits } from "@/data/content";
import { asset } from "@/lib/assets";

const form = reactive({
  company: "",
  role: "",
  email: "",
  interest: "",
});
const errors = reactive({ company: "", email: "", interest: "" });
const success = ref(false);
const successEl = ref(null);
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const onSubmit = async () => {
  errors.company = form.company.trim() ? "" : "Ingresá el nombre de la empresa.";
  errors.email = emailOk(form.email.trim()) ? "" : "Ingresá un email válido.";
  errors.interest = form.interest ? "" : "Elegí cómo quieren sumarse.";
  if (errors.company || errors.email || errors.interest) return;
  form.company = "";
  form.role = "";
  form.email = "";
  form.interest = "";
  success.value = true;
  await nextTick();
  successEl.value?.focus();
};
</script>

<template>
  <section class="page-hero">
    <img :src="asset('/assets/hero.jpg')" alt="Equipo corporativo en un parque" width="1920" height="980">
    <div class="wrap">
      <p class="pill pill-light">Empresas</p>
      <h1>Transformá la ciudad con nosotros</h1>
    </div>
  </section>

  <section class="why">
    <div class="wrap">
      <p v-reveal class="eyebrow">Retorno</p>
      <h2 v-reveal>Tres formas de aportar sin llenar la página de fotos</h2>
      <div class="partner-cards">
        <article v-for="item in partnerBenefits" :key="item.title" v-reveal class="partner-card">
          <span class="stat-icon"><Icon :name="item.icon" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="quote">
    <div class="wrap quote-grid">
      <div v-reveal>
        <p class="eyebrow">Formulario formal</p>
        <h2>Contanos cómo quiere sumarse tu empresa</h2>
        <p class="lede">Alianzas y pases de batalla quedan para una v2. Este form valida la conversación.</p>
      </div>
      <form v-reveal="'reveal-delay-2'" class="quote-form" novalidate @submit.prevent="onSubmit">
        <div class="field" :class="{ 'is-invalid': errors.company }">
          <label for="company">Empresa</label>
          <input id="company" v-model="form.company" type="text" required :aria-invalid="Boolean(errors.company)" aria-describedby="company-error">
          <p id="company-error" class="field-error" role="alert">{{ errors.company }}</p>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="role">Cargo</label>
            <input id="role" v-model="form.role" type="text">
          </div>
          <div class="field" :class="{ 'is-invalid': errors.email }">
            <label for="company-email">Email</label>
            <input id="company-email" v-model="form.email" type="email" required :aria-invalid="Boolean(errors.email)" aria-describedby="company-email-error">
            <p id="company-email-error" class="field-error" role="alert">{{ errors.email }}</p>
          </div>
        </div>
        <div class="field" :class="{ 'is-invalid': errors.interest }">
          <label for="interest">Cómo quieren sumarse</label>
          <select id="interest" v-model="form.interest" required :aria-invalid="Boolean(errors.interest)" aria-describedby="interest-error">
            <option value="">Elegí una opción</option>
            <option>Fondear un tramo de obra</option>
            <option>Materiales</option>
            <option>Voluntariado corporativo</option>
          </select>
          <p id="interest-error" class="field-error" role="alert">{{ errors.interest }}</p>
        </div>
        <button class="btn btn-yellow btn-full" type="submit">Enviar</button>
        <p v-if="success" ref="successEl" class="form-success" tabindex="-1" role="status">Recibido. En producción esto llega a alianzas.</p>
      </form>
    </div>
  </section>
</template>
