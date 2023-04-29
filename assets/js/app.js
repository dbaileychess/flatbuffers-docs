import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

function created() {
  let url = new URL(window.location.href);
  const lang = url.searchParams.get("lang");
  if (lang) {
    this.tutorialLanguage = lang;
  }
}

function setTutorialLanguage(lang) {
  let url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.pushState({}, "", url);
  this.tutorialLanguage = lang;
}

createApp({
  data() {
    return {
      tutorialLanguage: "C++",
    };
  },
  methods: {
    setTutorialLanguage: setTutorialLanguage,
  },
  created: created,
  delimiters: ["${", "}$"],
}).mount("#app");
