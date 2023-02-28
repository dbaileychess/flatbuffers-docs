import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";

createApp({
  data() {
    return {
      tutorialLanguage: "C++",
    };
  },
  delimiters: ["${", "}$"],
}).mount("#app");
