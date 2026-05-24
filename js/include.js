// =======================================
// Cargar componentes reutilizables
// Header y Footer
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  const includeScript = document.querySelector('script[src$="include.js"]');
  const scriptPath = includeScript ? includeScript.getAttribute("src") : "js/include.js";
  const rootPath = scriptPath.replace(/js\/include\.js$/, "");

  const cargarComponente = (selector, ruta) => {
    const contenedor = document.getElementById(selector);

    if (!contenedor) {
      return Promise.resolve();
    }

    return fetch(`${rootPath}${ruta}`)
      .then(response => response.text())
      .then(data => {
        contenedor.innerHTML = data.replaceAll("{{ROOT}}", rootPath);
      });
  };

  // ===============================
  // Cargar HEADER
  // ===============================
  cargarComponente("header", "components/header.html")
    .then(() => iniciarMenu());

  // ===============================
  // Cargar FOOTER
  // ===============================
  cargarComponente("footer", "components/footer.html");

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
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Cerrar menú al hacer clic en enlaces
    navLinks.querySelectorAll('a').forEach(link => {

      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });

    });

    // Cerrar menú con X
    closeMenuBtn.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });

  }

}
