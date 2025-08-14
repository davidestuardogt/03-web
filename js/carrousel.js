// =====================================================
// CARRUSEL – JS ACTUALIZADO
// Controla posición absoluta/relativa para evitar huecos
// y asegura que solo el slide activo esté en flujo.
// =====================================================

(function () {
  const carrousel = document.querySelector('.carrousel');
  if (!carrousel) return;

  const slides = carrousel.querySelectorAll('.slide');
  const prevBtn = carrousel.querySelector('.prev');
  const nextBtn = carrousel.querySelector('.next');

  if (!slides.length) return;

  let current = 0;
  let autoPlay = true;
  let intervalMs = 5000;
  let timer = null;
  let isHovering = false;

  // ----- Mostrar slide por índice -----
  function showSlide(index) {
    slides.forEach((s, i) => {
      if (i === index) {
        s.classList.add('active');
        s.setAttribute('aria-hidden', 'false');
        s.style.position = 'relative'; // 🔹 activo en flujo
      } else {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
        s.style.position = 'absolute'; // 🔹 otros sobrepuestos
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function start() {
    if (!autoPlay || timer) return;
    timer = setInterval(() => {
      if (!isHovering) nextSlide();
    }, intervalMs);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function reset() {
    stop();
    start();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); reset(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); reset(); });

  carrousel.addEventListener('mouseenter', () => { isHovering = true; });
  carrousel.addEventListener('mouseleave', () => { isHovering = false; });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // Inicialización
  showSlide(current);
  start();
})();