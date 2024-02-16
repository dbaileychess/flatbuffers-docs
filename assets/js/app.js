import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

function created() {
  let url = new URL(window.location.href);
  const lang = url.searchParams.get("lang");
  if (lang) {
    this.selectedLang = lang;
  }
}

function setLanguage(lang) {
  let url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.pushState({}, "", url);
  this.selectedLang = lang;
}

createApp({
  data() {
    return {
      selectedLang: "C++",
    };
  },
  methods: {
    setLanguage: setLanguage,
  },
  created: created,
}).mount("#app");
