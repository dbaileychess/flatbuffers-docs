import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

function onMount() {
  console.log("Load snippets");
  console.log(this);

  const snippetGroups = document.getElementsByClassName("code-snippet-group");

  for (const group of snippetGroups) {
    const groupId = group.getAttribute("data-group-id");
    this.codeSnippetGroups[groupId] = {};

    const snippets = group.getElementsByClassName("code-snippet");
    this.codeSnippetGroups[groupId]["snippets"] = snippets;

    this.codeSnippetGroups[groupId]["headings"] = [];
    for (const snippet of snippets) {
      console.log(snippet);
    }
  }

  console.log(this.codeSnippetGroups);
}

createApp({
  data() {
    return {
      codeSnippetGroups: {},
    };
  },
  created: () => {
    console.log("created");
    console.log(this);
  },
  mounted: onMount,
  delimiters: ["${", "}$"],
}).mount("#app");
