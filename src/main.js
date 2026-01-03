// src/main.js
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------- Livestream URL (paste when ready) ----------
// Leave as "" to show "Link coming soon" + disable click.
const LIVESTREAM_URL = "https://www.youtube.com/@lincolnbaptistchurch6919";

// ---------- i18n (English/Spanish) ----------
const appWrap = document.getElementById("app");
const LANG_KEY = "wedding_lang";

const translations = {
  en: {
    nav: {
      details: "Details",
      venue: "Venue",
      registry: "Registry",
      livestream: "Livestream",
      faq: "FAQ",
      rsvp: "RSVP",
    },
    hero: {
      kicker: "You’re invited to",
      title: "Oliver & Andrea's Wedding",
      date: "July 11, 2026 • Lincoln, NE",
      ctaRsvp: "RSVP",
      ctaDirections: "Directions",
    },
    details: {
      title: "Details",
      ceremonyTimeLabel: "Ceremony begins",
      ceremonyTime: "TBD",
      doorsCloseLabel: "Doors close at",
      doorsCloseTime: "TBD",
      receptionTimeLabel: "Reception",
      receptionTime: "To follow",
      sendOffLabel: "Send-off",
      sendOffTime: "TBD",
      dressCodeLabel: "Dress code",
      dressCodeValue: "Dress code explanation",
    },
    venue: {
      title: "Venue",
      line: "Lincoln Baptist Church • 2400 S 11th St, Lincoln, NE 68502",
      mapsBtn: "Open in Maps",
    },
    registry: {
      title: "Registry",
      text:
        "Your presence is the greatest gift. If you’d like to give something extra, we have an Amazon registry:",
      btn: "View Amazon Registry",
    },
    livestream: {
      title: "Livestream",
      text: "Can’t make it in person? Join us online:",
      btn: "Watch livestream",
      placeholder: "Link coming soon",
    },
    faq: {
      title: "FAQ",
      q1: "What should I wear?",
      a1: "Dress code explanation.",
      q2: "Is parking available?",
      a2: "Yes, parking is available on-site.",
      q3: "question 3",
      a3: "answer",
    },
    rsvp: {
      title: "RSVP",
      deadline: "Please RSVP by a date",
      nameLabel: "Family name",
      namePlaceholder: "Triana Family",
      attendingLabel: "Attending?",
      selectPlaceholder: "Select…",
      yes: "Yes",
      no: "No",
      guestsLabel: "Total guests (including you)",
      dietLabel: "Food allergies or dietary restrictions",
      dietPlaceholder: "e.g., gluten-free, nut allergy",
      submitBtn: "Submit RSVP",
      submitting: "Submitting…",
      success: "RSVP received! Thank you.",
      error: "Something went wrong. Please try again.",
      network: "Network error. Please try again.",
      botOk: "Thanks! RSVP received.",
    },
    footer: { updatedPrefix: "Last updated: " },
    toggle: { toEs: "Español", toEn: "English" },
  },

  es: {
    nav: {
      details: "Detalles",
      venue: "Lugar",
      registry: "Regalos",
      livestream: "Transmisión",
      faq: "Preguntas",
      rsvp: "Confirmar",
    },
    hero: {
      kicker: "Estás invitado/a a",
      title: "La boda de Oliver y Andrea",
      date: "11 de julio de 2026 • Lincoln, NE",
      ctaRsvp: "Confirmar",
      ctaDirections: "Cómo llegar",
    },
    details: {
      title: "Detalles",
      ceremonyTimeLabel: "Comienza la ceremonia",
      ceremonyTime: "Por definir",
      doorsCloseLabel: "Las puertas cierran a las",
      doorsCloseTime: "Por definir",
      receptionTimeLabel: "Recepción",
      receptionTime: "Después de la ceremonia",
      sendOffLabel: "Despedida",
      sendOffTime: "Por definir",
      dressCodeLabel: "Código de vestimenta",
      dressCodeValue: "Explicación del código de vestimenta",
    },
    venue: {
      title: "Lugar",
      line: "Lincoln Baptist Church • 2400 S 11th St, Lincoln, NE 68502",
      mapsBtn: "Abrir en Maps",
    },
    registry: {
      title: "Regalos",
      text:
        "Su presencia es el mejor regalo. Si desea dar algo adicional, tenemos una lista en Amazon:",
      btn: "Ver lista en Amazon",
    },
    livestream: {
      title: "Transmisión en vivo",
      text: "¿No puedes asistir en persona? Acompáñenos en línea:",
      btn: "Ver transmisión",
      placeholder: "Enlace próximamente",
    },
    faq: {
      title: "Preguntas frecuentes",
      q1: "¿Qué me pongo?",
      a1: "Explicación del código de vestimenta.",
      q2: "¿Habrá estacionamiento?",
      a2: "Sí, hay estacionamiento disponible en el lugar.",
      q3: "Pregunta",
      a3: "Respuresta",
    },
    rsvp: {
      title: "Confirmar asistencia",
      deadline: "Por favor confirme antes de una fecha",
      nameLabel: "Apellido (familia)",
      namePlaceholder: "Familia Triana",
      attendingLabel: "¿Asistirá?",
      selectPlaceholder: "Seleccione…",
      yes: "Sí",
      no: "No",
      guestsLabel: "Total de invitados (incluyéndote)",
      dietLabel: "Alergias alimentarias o restricciones de dieta",
      dietPlaceholder: "p. ej., sin gluten, alergia a nueces",
      submitBtn: "Enviar",
      submitting: "Enviando…",
      success: "¡Recibimos tu confirmación! Gracias.",
      error: "Algo salió mal. Inténtalo de nuevo.",
      network: "Error de red. Inténtalo de nuevo.",
      botOk: "¡Gracias! Confirmación recibida.",
    },
    footer: { updatedPrefix: "Actualizado: " },
    toggle: { toEs: "Español", toEn: "English" },
  },
};

let currentLang = localStorage.getItem(LANG_KEY) || "en";

// ---------- helpers ----------
function getTranslation(lang, keyPath) {
  return keyPath.split(".").reduce((acc, k) => acc?.[k], translations[lang]);
}

function wireLivestreamUI() {
  const lsA = document.getElementById("livestreamLink");
  const lsP = document.getElementById("livestreamPlaceholder");
  if (!lsA || !lsP) return;

  const hasUrl = Boolean(LIVESTREAM_URL && LIVESTREAM_URL.trim());

  if (hasUrl) {
    lsA.href = LIVESTREAM_URL;
    lsA.setAttribute("aria-disabled", "false");
    lsP.style.display = "none";
  } else {
    lsA.href = "#";
    lsA.setAttribute("aria-disabled", "true");
    lsP.style.display = "block";

    // prevent jump to top when clicking disabled link
    lsA.onclick = (e) => e.preventDefault();
  }
}

function applyTranslations(lang) {
  // text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = getTranslation(lang, key);
    if (value != null) el.textContent = value;
  });

  // placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const value = getTranslation(lang, key);
    if (value != null) el.setAttribute("placeholder", value);
  });

  // toggle label
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.textContent =
      lang === "en" ? translations.en.toggle.toEs : translations.es.toggle.toEn;
  }

  // footer date
  const updated = document.getElementById("updated");
  if (updated) {
    updated.textContent =
      translations[lang].footer.updatedPrefix + new Date().toLocaleDateString();
  }

  // html lang
  document.documentElement.lang = lang;

  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  // keep livestream UI correct (and placeholder translated)
  wireLivestreamUI();
}

function setLanguage(lang) {
  if (!appWrap) return applyTranslations(lang);

  appWrap.classList.add("i18n-fading");
  window.setTimeout(() => {
    applyTranslations(lang);
    appWrap.classList.remove("i18n-fading");
  }, 180);
}

// ---------- language toggle ----------
const langToggle = document.getElementById("langToggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "es" : "en");
  });
}

// apply saved language on load
applyTranslations(currentLang);

// ---------- Motion / Scroll reveals ----------
const prefersReducedMotion = window
  .matchMedia("(prefers-reduced-motion: reduce)")
  .matches;

if (!prefersReducedMotion) {
  gsap.to(".hero-glow", {
    rotate: 25,
    duration: 10,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

// ---------- RSVP submit (no refresh) ----------
const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("rsvpStatus");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = translations[currentLang].rsvp.submitting;

    // honeypot
    const hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value.trim() !== "") {
      statusEl.textContent = translations[currentLang].rsvp.botOk;
      form.reset();
      return;
    }

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        statusEl.textContent = translations[currentLang].rsvp.success;
        form.reset();
      } else {
        statusEl.textContent = translations[currentLang].rsvp.error;
      }
    } catch {
      statusEl.textContent = translations[currentLang].rsvp.network;
    }
  });
}

// ---------- Hero slideshow (crossfade) ----------
const bgA = document.querySelector(".hero-bg-a");
const bgB = document.querySelector(".hero-bg-b");

if (bgA && bgB && !prefersReducedMotion) {
  const slides = [
    "/pictures/picture1.jpg",
    "/pictures/picture2.jpg",
    "/pictures/picture3.jpg",
    "/pictures/picture4.jpg",
  ];

  // preload (prevents flash on first load)
  slides.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let i = 0;
  let showingA = true;

  bgA.style.backgroundImage = `url("${slides[0]}")`;
  bgA.style.opacity = "1";
  bgB.style.opacity = "0";

  const swapEveryMs = 4000;   // how long each photo stays
  // (fade duration comes from CSS)

  setInterval(() => {
    i = (i + 1) % slides.length;

    const incoming = showingA ? bgB : bgA;
    const outgoing = showingA ? bgA : bgB;

    incoming.style.backgroundImage = `url("${slides[i]}")`;

    // crossfade
    incoming.style.opacity = "1";
    outgoing.style.opacity = "0";

    showingA = !showingA;
  }, swapEveryMs);
}
