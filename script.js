document.addEventListener('DOMContentLoaded', () => {
    const mascotaBg = document.querySelector('.mascota-bg');
    const toTop = document.querySelector('.to-top');
    
    window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY;
      mascotaBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  
      // Mostrar botón "Volver arriba"
      if (scrollPosition > 300) {
        toTop.classList.add('visible');
      } else {
        toTop.classList.remove('visible');
      }
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.qui, .serveis, .mschools').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  });