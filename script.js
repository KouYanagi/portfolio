document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = 0;
      setTimeout(() => {
        section.style.transition = 'opacity 1s';
        section.style.opacity = 1;
      }, 500);
    });
  });