<script setup>
import { institutionalData, team } from '@/data/content';
import Icon from '@/components/Icon.vue';
import ActionButton from '@/components/ActionButton.vue';
</script>

<template>
  <div class="about-page">
    <!-- Hero Section con animación y dinamismo -->
    <section class="page-hero about-hero" aria-labelledby="about-hero-title">
      <img src="/assets/hero.jpg" alt="Arquitectura con vocación de servicio y espacios sostenibles" width="1920" height="980" fetchpriority="high" decoding="async">
      <div class="wrap hero-wrap">
        <div v-reveal>
          <p class="pill pill-light">Sobre la asociación</p>
          <h1 id="about-hero-title">Nosotros</h1>
          <p class="about-hero-subtitle">Diseñamos espacios que transforman vidas. Arquitectura con vocación de servicio e impacto social sostenible.</p>
        </div>
      </div>
    </section>

    <!-- 01. Quiénes somos / Misión y Visión (Sin badges que se movieron al footer) -->
    <section class="about-intro-section" aria-labelledby="intro-title">
      <div class="wrap">
        <div class="intro-grid">
          <div v-reveal class="intro-copy">
            <p class="section-kicker">01 / Quiénes somos</p>
            <h2 id="intro-title">Una familia de arquitectos con <em>vocación de servicio</em></h2>
            <p class="intro-lead">{{ institutionalData.presentation }}</p>
            <div class="intro-accent-box">
              <span class="accent-bar" aria-hidden="true"></span>
              <p>Unimos el rigor del diseño espacial y bioclimático con el compromiso humano de brindar infraestructura segura, higiénica y digna a las comunidades más vulnerables del país.</p>
            </div>
          </div>
          <div v-reveal="'clip reveal-delay-2'" class="intro-cards">
            <div class="mv-card mission-card">
              <div class="mv-icon"><Icon name="heart" /></div>
              <h3>Nuestra Misión</h3>
              <p>{{ institutionalData.mission }}</p>
            </div>
            <div class="mv-card vision-card">
              <div class="mv-icon"><Icon name="eye" /></div>
              <h3>Nuestra Visión</h3>
              <p>{{ institutionalData.vision }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. Objetivos y líneas de acción (Bento Grid 2 + 3 armónico) -->
    <section class="about-objectives-section" aria-labelledby="objectives-title">
      <div class="wrap">
        <div class="section-header" v-reveal>
          <p class="section-kicker">02 / Objetivos y líneas de acción</p>
          <h2 id="objectives-title">Cómo generamos un impacto real y perdurable</h2>
          <p class="section-subtitle">Nuestros esfuerzos se concentran en atender necesidades esenciales de sanidad, agua, higiene, nutrición y habitabilidad digna.</p>
        </div>
        
        <!-- Cuadrícula Bento 2 + 3: 2 tarjetas destacadas arriba y 3 tarjetas complementarias abajo -->
        <div class="objectives-bento">
          <!-- Fila Superior: 2 ejes asistenciales directos (50% / 50%) -->
          <div class="bento-row bento-row-top">
            <article v-for="(obj, index) in institutionalData.objectives.slice(0, 2)" :key="obj.title" v-reveal="`reveal-delay-${index + 1}`" class="objective-card objective-card-featured">
              <div class="card-top-meta">
                <span class="objective-icon"><Icon :name="obj.icon" /></span>
                <span class="bento-badge">Eje Asistencial Prioritario</span>
              </div>
              <h3>{{ obj.title }}</h3>
              <p>{{ obj.desc }}</p>
            </article>
          </div>

          <!-- Fila Inferior: 3 ejes metodológicos y de soporte (33.3% cada uno) -->
          <div class="bento-row bento-row-bottom">
            <article v-for="(obj, index) in institutionalData.objectives.slice(2, 5)" :key="obj.title" v-reveal="`reveal-delay-${index + 1}`" class="objective-card objective-card-support">
              <div class="card-top-meta">
                <span class="objective-icon"><Icon :name="obj.icon" /></span>
                <span class="bento-badge-sub">Eje Metodológico</span>
              </div>
              <h3>{{ obj.title }}</h3>
              <p>{{ obj.desc }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. Gobernanza y Control // LÁMINAS DE GALERÍA: EL MANIFIESTO DE RIGOR -->
    <section class="about-gallery-section" aria-labelledby="gallery-title">
      <div class="wrap">
        <div class="gallery-header" v-reveal>
          <div class="gallery-kicker-row">
            <span class="gallery-kicker">03 / Manifiesto de Gobernanza</span>
            <span class="gallery-curation-pill">Ética &amp; Control</span>
          </div>
          <h2 id="gallery-title">La transparencia concebida con <em>rigor arquitectónico</em></h2>
          <p class="gallery-subtitle">La confianza no es una promesa retórica; es una estructura que se construye cota por cota. Cuatro compromisos institucionales garantizan la trazabilidad, supervisión profesional y el destino íntegro de cada recurso.</p>
        </div>

        <div class="gallery-plates-grid">
          <!-- Lámina 01 -->
          <article class="gallery-plate" v-reveal="'reveal-delay-1'">
            <div class="plate-top-bar">
              <span class="plate-number">I</span>
              <span class="plate-archive-ref">PLIEGO // 01 · CONTABILIDAD</span>
            </div>
            <div class="plate-body">
              <h3 class="plate-title">Sistema Contable Digital Respaldado</h3>
              <p class="plate-copy">Registro integral y automatizado respaldado por un Contador Público Colegiado (CPC), con trazabilidad documental continua por cada aporte recibido y conciliación periódica.</p>
            </div>
            <div class="plate-seal-box">
              <div class="artisan-seal">
                <svg class="seal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>Respaldo CPC Colegiado</span>
              </div>
            </div>
          </article>

          <!-- Lámina 02 -->
          <article class="gallery-plate" v-reveal="'reveal-delay-2'">
            <div class="plate-top-bar">
              <span class="plate-number">II</span>
              <span class="plate-archive-ref">PLIEGO // 02 · TÉCNICA</span>
            </div>
            <div class="plate-body">
              <h3 class="plate-title">Supervisión Técnica por Colegiados</h3>
              <p class="plate-copy">Todos los expedientes técnicos, estudios espaciales y planificaciones de obra son formulados y supervisados directamente por arquitectos e ingenieros colegiados (CIP / CAP).</p>
            </div>
            <div class="plate-seal-box">
              <div class="artisan-seal">
                <svg class="seal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>Validación Colegiada</span>
              </div>
            </div>
          </article>

          <!-- Lámina 03 -->
          <article class="gallery-plate" v-reveal="'reveal-delay-3'">
            <div class="plate-top-bar">
              <span class="plate-number">III</span>
              <span class="plate-archive-ref">PLIEGO // 03 · RENDICIÓN</span>
            </div>
            <div class="plate-body">
              <h3 class="plate-title">Informes Periódicos de Obra y Fondos</h3>
              <p class="plate-copy">Rendición de cuentas continua sobre avance físico y ejecución presupuestal de los proyectos, compartiendo reportes verificables y transparentes con los aliados.</p>
            </div>
            <div class="plate-seal-box">
              <div class="artisan-seal">
                <svg class="seal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>Rendición Documentada</span>
              </div>
            </div>
          </article>

          <!-- Lámina 04 -->
          <article class="gallery-plate" v-reveal="'reveal-delay-4'">
            <div class="plate-top-bar">
              <span class="plate-number">IV</span>
              <span class="plate-archive-ref">PLIEGO // 04 · ESTATUTO</span>
            </div>
            <div class="plate-body">
              <h3 class="plate-title">Destino Exclusivo 100% Social</h3>
              <p class="plate-copy">Cada donación recibida se destina de forma irrestricta a los fines sociales de la asociación, conforme a los estatutos fundacionales y el marco legal que rige a las entidades perceptoras.</p>
            </div>
            <div class="plate-seal-box">
              <div class="artisan-seal">
                <svg class="seal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>100% Destino Social</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Emisión de Comprobante SUNAT (UN SOLO ENLACE AL PDF OFICIAL) -->
    <section class="receipt-section" aria-labelledby="receipt-title">
      <div class="wrap">
        <div class="receipt-box" v-reveal>
          <div class="receipt-content">
            <div class="receipt-pill">
              <Icon name="shield" />
              <span>Autorización Oficial SUNAT</span>
            </div>
            <h2 id="receipt-title">Emitimos Comprobantes de Recepción de Donaciones</h2>
            <p class="receipt-lead">
              La <strong>{{ institutionalData.name }}</strong> está calificada como <strong>Entidad Perceptora de Donaciones</strong> mediante la <strong>Resolución de Intendencia {{ institutionalData.legal.sunatResolucion }}</strong> de la SUNAT e inscrita en el Registro oficial con beneficio tributario.
            </p>
            <p class="receipt-details">
              Tanto empresas como personas naturales pueden deducir sus aportes del Impuesto a la Renta de acuerdo con el numeral 2.2 inciso “s” del Art. 21º del D.S. Nº 122-94-EF y los incisos “x” del Art. 37º y “b” del Art. 49º del D.S. Nº 179-2004-EF.
            </p>
            <!-- ÚNICO ENLACE: Botón interactivo principal -->
            <div class="receipt-actions">
              <a :href="institutionalData.legal.samplePdf" target="_blank" rel="noopener noreferrer" class="btn btn-receipt" aria-label="Abrir Comprobante de Recepción de Donaciones oficial de la Asociación MUHU en formato PDF">
                <svg class="pdf-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Ver Comprobante de Donación Oficial (PDF)</span>
                <span class="external-arrow" aria-hidden="true">↗</span>
              </a>
              <span class="receipt-hint">Documento oficial correlativo expedido por la Asociación MUHU</span>
            </div>
          </div>
          
          <!-- Mockup visual ilustrativo (Solo visual, NO link duplicado) -->
          <div class="receipt-preview-col" aria-hidden="true">
            <div class="receipt-doc-mockup">
              <div class="mockup-header">
                <span class="mockup-badge">SUNAT OFICIAL</span>
                <span class="mockup-doc-title">Comprobante No. 2026-001</span>
              </div>
              <div class="mockup-body">
                <div class="mockup-line title-line"></div>
                <div class="mockup-line text-line"></div>
                <div class="mockup-line text-line short"></div>
                <div class="mockup-seal">
                  <Icon name="shield" />
                  <span>Entidad Perceptora</span>
                </div>
              </div>
              <div class="mockup-footer">
                <span>R.I. Nº 0490050045389</span>
                <span>Asoc. MUHU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. Equipo y Liderazgo (3 tarjetas) -->
    <section class="about-team-section" aria-labelledby="team-heading">
      <div class="wrap">
        <div class="section-header" v-reveal>
          <p class="section-kicker">04 / Equipo y Liderazgo</p>
          <h2 id="team-heading">Las personas que impulsan este propósito</h2>
          <p class="section-subtitle">Vocación arquitectónica, articulación de recursos y compromiso con la dignidad comunitaria.</p>
        </div>
        <div class="leadership-grid">
          <article v-for="(member, index) in team" :key="member.name" v-reveal="`reveal-delay-${index + 1}`" class="leadership-card">
            <div class="leadership-photo-wrap">
              <img :src="member.image" :alt="`Fotografía de ${member.name}`" width="480" height="420" loading="lazy" decoding="async">
              <span class="role-pill">{{ member.role }}</span>
            </div>
            <div class="leadership-body">
              <div class="leadership-header-row">
                <h3>{{ member.name }}</h3>
                <!-- Enlace activo a LinkedIn para Gianfranco Cuneo -->
                <a v-if="member.hasActiveLinkedin" :href="member.linkedin" target="_blank" rel="noopener noreferrer" class="linkedin-btn is-active" :aria-label="`Perfil de LinkedIn de ${member.name}`" title="Visitar perfil de LinkedIn">
                  <svg class="linkedin-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <!-- Ícono reservado para Caio y Rossina -->
                <span v-else class="linkedin-btn is-disabled" title="Próximamente disponible" :aria-label="`Perfil de LinkedIn de ${member.name} próximamente disponible`">
                  <svg class="linkedin-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </span>
              </div>
              <p class="leadership-bio">{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Llamado a la acción (CTA) -->
    <section class="about-cta-section" aria-labelledby="about-cta-title">
      <div class="wrap">
        <div class="about-cta-card" v-reveal>
          <div class="cta-content">
            <h2 id="about-cta-title">Súmate a transformar espacios y vidas</h2>
            <p class="lede">Colabora con MUHU como empresa donante, voluntario o aliado estratégico. Juntos construimos infraestructura digna y sostenible para quienes más lo necesitan.</p>
            <div class="cta-actions">
              <ActionButton tone="yellow" to="/#quiero-ayudar">Quiero ayudar <span aria-hidden="true">↗</span></ActionButton>
              <ActionButton tone="white" to="/#contacto-vecinos">Quiero ayudar</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
