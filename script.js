document.addEventListener('DOMContentLoaded', () => {
  // Animaciones de scroll para elementos con IntersectionObserver
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

  // Configuración de Particles.js ajustada para el nuevo fondo
  particlesJS('particles-js', {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: ['#ffffff', '#2595CD'] },
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 1.5, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
    }
  });

  // Ajustar la altura de #particles-js para que termine en la parte inferior de .mobile-img
  const particles = document.querySelector('#particles-js');
  const mobileMockup = document.querySelector('.mobile-mockup');
  const mobileImg = document.querySelector('.mobile-img');

  function setParticlesHeight() {
    const mobileRect = mobileMockup.getBoundingClientRect();
    const mobileImgRect = mobileImg.getBoundingClientRect();
    const heroRect = document.querySelector('.hero').getBoundingClientRect();
    const particlesHeight = mobileImgRect.bottom - heroRect.top;
    particles.style.height = `${particlesHeight}px`;
  }

  setParticlesHeight();

  window.addEventListener('resize', setParticlesHeight);

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

  // Efecto parallax al estilo GitHub para el texto fijo y la imagen del portátil
  const heroText = document.querySelector('.hero-text');
  const quiSection = document.querySelector('.qui');
  let hasDisappeared = false;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const quiRect = quiSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (quiRect.top < windowHeight) {
      hasDisappeared = true;
      mobileMockup.classList.add('sticky');
      heroText.style.opacity = '0';
      heroText.style.filter = 'blur(8px)';
    } else {
      hasDisappeared = false;
      mobileMockup.classList.remove('sticky');
      heroText.style.opacity = '1';
      heroText.style.filter = 'none';
    }

    if (!mobileMockup.classList.contains('sticky')) {
      const imgOffset = scrollPosition * -0.7;
      mobileMockup.style.transform = `translateY(${imgOffset}px)`;
    }

    if (!hasDisappeared) {
      const heroTextRect = heroText.getBoundingClientRect();
      const mobileRect = mobileMockup.getBoundingClientRect();
      const fadeStart = windowHeight * 0.3;
      const fadeEnd = windowHeight * 0.1;
      let opacity = 1;
      let blur = 0;

      const distance = heroTextRect.bottom - mobileRect.top;
      if (mobileRect.top < fadeStart) {
        opacity = distance / (fadeStart - fadeEnd);
        blur = (1 - opacity) * 8;
        opacity = Math.max(0, Math.min(1, opacity));
        blur = Math.max(0, Math.min(8, blur));
      }

      heroText.style.opacity = opacity;
      heroText.style.filter = `blur(${blur}px)`;
    }

    if (quiRect.top < windowHeight && quiRect.bottom > 0) {
      const quiOffset = (windowHeight - quiRect.top) * 0.1;
      quiSection.style.transform = `translateY(-${quiOffset}px)`;
    }
  });
});