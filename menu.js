// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const closeMenuBtn = document.querySelector('.close-menu');

if (menuToggle && navLinks && closeMenuBtn) {
  // Abrir menú
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Cerrar menú con la X
  closeMenuBtn.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
}