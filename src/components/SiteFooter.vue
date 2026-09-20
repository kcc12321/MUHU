<script setup>
import { brand, nav } from "@/data/content";
</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <p class="brand-mark"><span aria-hidden="true"></span>{{ brand.name }}</p>
        <p>{{ brand.slogan }}</p>
        <p class="demo-note">{{ brand.demoNote }}</p>
      </div>
      <div>
        <p class="footer-label">Sitio</p>
        <ul>
          <li v-for="item in nav" :key="item.to"><router-link :to="item.to">{{ item.label }}</router-link></li>
        </ul>
      </div>
      <div>
        <p class="footer-label">Sumate</p>
        <ul>
          <li><router-link to="/empresas">Soy una empresa</router-link></li>
          <li><router-link to="/contacto">Proponer un parque</router-link></li>
          <li><router-link to="/nosotros">Transparencia</router-link></li>
        </ul>
      </div>
      <div>
        <p class="footer-label">Redes</p>
        <ul>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="mailto:hola@muhu.org">hola@muhu.org</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap footer-legal">
      <p>© 2026 {{ brand.name }}. Template de presentación.</p>
      <p>Infraestructura pública ecosostenible</p>
    </div>
  </footer>
</template>
