<script setup>
import { nextTick, reactive, ref } from "vue";

const form = reactive({
  name: "",
  neighborhood: "",
  place: "",
  message: "",
});

const errors = reactive({
  name: "",
  neighborhood: "",
  place: "",
  message: "",
});

const success = ref(false);
const successEl = ref(null);

const clearSuccess = () => {
  success.value = false;
};

const onSubmit = async () => {
  errors.name = form.name.trim() ? "" : "Ingresá tu nombre.";
  errors.neighborhood = form.neighborhood.trim() ? "" : "Indicá el barrio.";
  errors.place = form.place.trim() ? "" : "Contanos qué espacio es.";
  errors.message = form.message.trim().length >= 8 ? "" : "Contanos un poco más.";

  if (errors.name || errors.neighborhood || errors.place || errors.message) return;

  form.name = "";
  form.neighborhood = "";
  form.place = "";
  form.message = "";
  success.value = true;
  await nextTick();
  successEl.value?.focus();
};
</script>

<template>
  <section class="quote" id="contacto-vecinos" tabindex="-1">
    <div class="wrap quote-grid">
      <div v-reveal>
        <p class="eyebrow">Contacto</p>
        <h2>¿Querés que evaluemos un parque en tu zona?</h2>
        <p class="lede">Escribínos el barrio y el espacio. En el template esto no se envía: solo valida la estructura.</p>
      </div>
      <form v-reveal="'reveal-delay-2'" class="quote-form" novalidate @submit.prevent="onSubmit">
        <div class="field" :class="{ 'is-invalid': errors.name }">
          <label for="neighbor-name">Nombre</label>
          <input id="neighbor-name" v-model="form.name" type="text" autocomplete="name" required :aria-invalid="Boolean(errors.name)" aria-describedby="neighbor-name-error" @input="clearSuccess">
          <p id="neighbor-name-error" class="field-error" role="alert">{{ errors.name }}</p>
        </div>
        <div class="field-row">
          <div class="field" :class="{ 'is-invalid': errors.neighborhood }">
            <label for="neighborhood">Barrio</label>
            <input id="neighborhood" v-model="form.neighborhood" type="text" required :aria-invalid="Boolean(errors.neighborhood)" aria-describedby="neighborhood-error" @input="clearSuccess">
            <p id="neighborhood-error" class="field-error" role="alert">{{ errors.neighborhood }}</p>
          </div>
          <div class="field" :class="{ 'is-invalid': errors.place }">
            <label for="place">Espacio</label>
            <input id="place" v-model="form.place" type="text" required :aria-invalid="Boolean(errors.place)" aria-describedby="place-error" @input="clearSuccess">
            <p id="place-error" class="field-error" role="alert">{{ errors.place }}</p>
          </div>
        </div>
        <div class="field" :class="{ 'is-invalid': errors.message }">
          <label for="neighbor-message">Mensaje</label>
          <textarea id="neighbor-message" v-model="form.message" rows="4" required :aria-invalid="Boolean(errors.message)" aria-describedby="neighbor-message-error" @input="clearSuccess"></textarea>
          <p id="neighbor-message-error" class="field-error" role="alert">{{ errors.message }}</p>
        </div>
        <button class="btn btn-yellow btn-full" type="submit">Enviar propuesta</button>
        <p v-if="success" ref="successEl" class="form-success" tabindex="-1" role="status">Gracias. En la versión real un coordinador territorial te escribe.</p>
      </form>
    </div>
  </section>
</template>
