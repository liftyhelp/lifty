document.addEventListener('DOMContentLoaded', () => {
  // Animaciones de scroll
  const elements = document.querySelectorAll('.instruccio, .qui-item, .cuadrado');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));

  // Configuración de Particles.js con colores de nebulosa
  particlesJS('particles-js', {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: ['#ffffff', '#58a6ff', '#a371f7', '#ff6bcb'] },
      shape: { type: 'circle' },
      opacity: { value: 0.6, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 1.5, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
    }
  });

  // Efecto parallax para las imágenes de instruccions
  const parallaxImages = document.querySelectorAll('.parallax-img');
  window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const scrollPosition = window.scrollY + window.innerHeight;
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (scrollPosition - rect.top) * 0.2;
        img.style.transform = `translateY(${offset}px)`;
      }
    });
  });

  // Mostrar/ocultar botón "to-top"
  const toTop = document.querySelector('.to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      toTop.classList.add('visible');
    } else {
      toTop.classList.remove('visible');
    }
  });

  // Efecto parallax para el texto y la imagen en la sección hero
  const heroContent = document.querySelector('.hero-content');
  const mobileImg = document.querySelector('.mobile-img');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    // Parallax para el texto (se mueve hacia abajo más lentamente)
    const textOffset = scrollPosition * 0.3;
    heroContent.style.transform = `translateY(${textOffset}px)`;
    // Parallax para la imagen (se mueve hacia arriba más rápido)
    const imgOffset = scrollPosition * -0.5;
    mobileImg.style.transform = `translateY(${imgOffset}px)`;
  });
});