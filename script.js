// スムーズスクロール
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// プロジェクトフィルタリング
function filterProjects(tech) {
  const projects = document.querySelectorAll('.project-item');
  
  projects.forEach(project => {
    const techList = project.getAttribute('data-tech').split(' ');
    
    if (tech === 'all' || techList.includes(tech)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// 問い合わせオプションのCTA
document.getElementById('industry-selector').addEventListener('change', (e) => {
  const industry = e.target.value;
  const ctaMessage = document.getElementById('cta-message');
  switch (industry) {
    case 'corporate':
      ctaMessage.textContent = '企業ブランディングを強化する公式サイトを構築します！';
      break;
    case 'personal':
      ctaMessage.textContent = '個人ブランディングを輝かせるプロフィールサイトを作成します！';
      break;
    case 'beauty':
      ctaMessage.textContent = '美容業界の魅力を引き出す予約サイトをデザインします！';
      break;
    case 'edu-promo':
      ctaMessage.textContent = '教育プロモーションを加速するバナーやLPを制作します！';
      break;
    case 'education':
      ctaMessage.textContent = '教育機関の情報を魅力的に伝えるWebサイトを構築します！';
      break;
    case 'restaurant':
      ctaMessage.textContent = '飲食業界の来店を促進する魅力的なHPを制作します！';
      break;
    case 'creative':
      ctaMessage.textContent = 'クリエイティブなデザインで個性を輝かせるサイトを構築します！';
      break;
    default:
      ctaMessage.textContent = '貴社のビジョンをWebで実現しましょう！';
  }
});

// テーマ切り替え
const toggleButton = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = toggleButton.querySelector('.icon');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

toggleButton.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// 初期テーマ設定
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// プロジェクトリンクの準備中アラート
document.querySelectorAll('.project-item a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const projectTitle = link.querySelector('h3').textContent;
    alert(`${projectTitle}のサイトは現在準備中です。詳細はお問い合わせください！`);
  });
});