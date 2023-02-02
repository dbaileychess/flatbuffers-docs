function openMenu() {
  document.getElementById("menu-overlay").style.display = "block";
}

function closeMenu() {
  document.getElementById("menu-overlay").style.display = "none";
}

addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    document.getElementById("menu-overlay").style.display = "none";
  }
});
