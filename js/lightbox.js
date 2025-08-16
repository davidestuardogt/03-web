// Lightbox robusto con DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const zoomables = document.querySelectorAll('img.zoomable');

  if (!lightbox || !lightboxImg || !closeBtn || !zoomables.length) return;

  // Variables de control
  let zoomScale = 1;           // Nivel de zoom (1 = normal)
  let isDragging = false;      // Si la imagen está siendo arrastrada
  let startX, startY;          // Punto inicial de arrastre
  let translateX = 0, translateY = 0; // Desplazamiento acumulado
  let lastTap = 0;             // Para detectar doble toque en móviles

  // ========================
  // Abrir lightbox
  // ========================
  function openLightbox(src, alt = '') {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del body
    resetTransform(); // Resetea transformaciones
  }

  // ========================
  // Cerrar lightbox
  // ========================
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = ''; // Restaura scroll
    resetTransform();
  }

  // ========================
  // Resetear zoom y posición
  // ========================
  function resetTransform() {
    zoomScale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  // ========================
  // Aplicar transformaciones
  // ========================
  function applyTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
    lightboxImg.style.cursor = zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-out';
  }

  // ========================
  // Función para zoom rápido en punto (doble clic/toque)
  // ========================
  function toggleZoomQuick(e, clientX, clientY) {
    e.preventDefault();

    const rect = lightboxImg.getBoundingClientRect(); // Posición actual de la imagen
    const offsetX = clientX - rect.left;  // Posición X dentro de la imagen
    const offsetY = clientY - rect.top;   // Posición Y dentro de la imagen

    if (zoomScale === 1) {
      // Hacer zoom a 2x centrado en el punto de clic
      zoomScale = 2;

      // Calcular desplazamiento para centrar en el punto clicado
      translateX = -(offsetX - rect.width / 2);
      translateY = -(offsetY - rect.height / 2);
    } else {
      // Volver al estado original
      resetTransform();
      return;
    }

    applyTransform();
  }

  // ========================
  // Eventos de botones (+ y −)
  // ========================
  zoomInBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    zoomScale += 0.2;
    applyTransform();
  });

  zoomOutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    zoomScale = Math.max(0.5, zoomScale - 0.2);
    applyTransform();
  });

  // ========================
  // Arrastrar con mouse
  // ========================
  lightboxImg.addEventListener('mousedown', (e) => {
    if (zoomScale <= 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    applyTransform();
  });

  // ========================
  // Arrastrar con táctil (móvil)
  // ========================
  lightboxImg.addEventListener('touchstart', (e) => {
    if (zoomScale <= 1) return;
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - translateX;
    startY = touch.clientY - translateY;
  });

  lightboxImg.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    translateX = touch.clientX - startX;
    translateY = touch.clientY - startY;
    applyTransform();
  });

  lightboxImg.addEventListener('touchend', () => {
    isDragging = false;
  });

  // ========================
  // Doble clic (desktop)
  // ========================
  lightboxImg.addEventListener('dblclick', (e) => {
    toggleZoomQuick(e, e.clientX, e.clientY);
  });

  // ========================
  // Doble toque (móvil)
  // ========================
  lightboxImg.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      const touch = e.changedTouches[0];
      toggleZoomQuick(e, touch.clientX, touch.clientY);
    }
    lastTap = currentTime;
  });

  // ========================
  // Eventos abrir/cerrar
  // ========================
  zoomables.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(img.src, img.alt || '');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});