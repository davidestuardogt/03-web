// =======================================
// Cargar componentes reutilizables
// Header y Footer
// =======================================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Cargar HEADER
  // ===============================
  const header = document.getElementById("header");

  if (header) {

    fetch("../components/header.html")
      .then(response => response.text())
      .then(data => {

        header.innerHTML = data;

        // Reinicializar menú móvil
        iniciarMenu();

      });

  }

  // ===============================
  // Cargar FOOTER
  // ===============================
  const footer = document.getElementById("footer");

  if (footer) {

    fetch("../components/footer.html")
      .then(response => response.text())
      .then(data => {

        footer.innerHTML = data;

      });

  }

});


// =======================================
// Inicializar menú móvil
// =======================================

function iniciarMenu() {

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const closeMenuBtn = document.querySelector('.close-menu');

  if (menuToggle && navLinks && closeMenuBtn) {

    // Abrir menú
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en enlaces
    navLinks.querySelectorAll('a').forEach(link => {

      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });

    });

    // Cerrar menú con X
    closeMenuBtn.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });

  }

}