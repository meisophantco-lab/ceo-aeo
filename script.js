/* ================= MOBILE MENU FIX ================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuBtn.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
  });


  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    });
  });

  /* FIX ROTATION & RESIZE BUG */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    }
  });
});