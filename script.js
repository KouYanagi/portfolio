// script.js

// スムーズスクロール
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// プロジェクトフィルタ
function filterProjects(category) {
  const items = document.querySelectorAll('.project-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// 業界選択CTA
document.getElementById('industry-selector').addEventListener('change', (e) => {
  const industry = e.target.value;
  const ctaMessage = document.getElementById('cta-message');
  switch (industry) {
    case 'retail':
      ctaMessage.textContent = '売上を加速するECサイトを構築します！';
      break;
    case 'it':
      ctaMessage.textContent = 'データ管理を最適化するダッシュボードを提供します！';
      break;
    case 'education':
      ctaMessage.textContent = '学びを深めるeラーニングUIをデザインします！';
      break;
    case 'healthcare':
      ctaMessage.textContent = '患者体験を向上するヘルスケアWebを構築します！';
      break;
    case 'nonprofit':
      ctaMessage.textContent = '使命を広めるインパクトあるサイトを作成します！';
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