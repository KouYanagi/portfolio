document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.project-card, .skills-list li, .experience-list li, .slider-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    sections.forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  
    cards.forEach(card => {
      card.classList.add('fade-in');
      observer.observe(card);
    });
  
    // ナビゲーショントグル
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  
    // スムーズスクロール
    document.querySelectorAll('.navbar-menu a').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        navbarMenu.classList.remove('active');
      });
    });
  
    // テーマ切り替え
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    };
  
    // フォーム送信
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
      alert('メッセージを送信中...');
      console.log('Form submitted to:', form.action);
      form.submit();
    });
  
    // ヒーローCTAボタンのホバーアニメーション
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseover', () => {
      ctaButton.style.boxShadow = '0 0 10px var(--accent-color)';
    });
    ctaButton.addEventListener('mouseout', () => {
      ctaButton.style.boxShadow = 'none';
    });
  
    // コンタクトボタンとフッターリンクのホバーアニメーション
    const buttons = document.querySelectorAll('.contact-button, .footer-links a');
    buttons.forEach(button => {
      button.addEventListener('mouseover', () => {
        button.style.boxShadow = '0 0 10px var(--accent-color)';
      });
      button.addEventListener('mouseout', () => {
        button.style.boxShadow = 'none';
      });
    });
  });