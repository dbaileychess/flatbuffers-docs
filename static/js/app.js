import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

function loadSnippetGroups() {
  const snippetGroups = document.getElementsByClassName("code-snippet-group");
  for (const group of snippetGroups) {
    let newGroup = {};

    const snippets = group.getElementsByClassName("code-snippet");
    newGroup.tabNames = [];

    for (const snippet of snippets) {
      const tabName = snippet.getAttribute("data-tab-name");
      newGroup.tabNames.push(tabName);
    }

    if (newGroup.tabNames.length > 0) {
      newGroup.currentTab = newGroup.tabNames[0];
    }

    const groupId = group.getAttribute("data-group-id");
    this.snippetGroups[groupId] = newGroup;
  }
}

// Sets the current tab for all snippet groups to be tabName if tabName is
// defined within that group.
function setCurrentSnippetTab(tabName) {
  for (const groupId in this.snippetGroups) {
    if (this.snippetGroups[groupId].tabNames.includes(tabName)) {
      this.snippetGroups[groupId].currentTab = tabName;
    }
  }
}

function onMount() {
  loadSnippetGroups.call(this);
}

createApp({
  data() {
    return {
      snippetGroups: {},
    };
  },
  methods: {
    setCurrentSnippetTab: setCurrentSnippetTab,
  },
  mounted: onMount,
  delimiters: ["${", "}$"],
}).mount("#app");
