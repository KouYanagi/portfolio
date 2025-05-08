// スムーズスクロール
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ハンバーガーメニューのトグル
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('active');
});

// プロジェクトフィルタリング
function filterProjects(tech) {
  const projects = document.querySelectorAll('.project-item');
  const buttons = document.querySelectorAll('.filter-buttons button');

  projects.forEach(project => {
      const techList = project.getAttribute('data-tech').split(' ');
      project.style.display = (tech === 'all' || techList.includes(tech)) ? 'block' : 'none';
  });

  buttons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('onclick') === `filterProjects('${tech}')`);
  });
}

// 問い合わせオプションのCTA
document.getElementById('industry-selector').addEventListener('change', e => {
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

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  const icon = toggleButton.querySelector('.icon');
  if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  localStorage.setItem('theme', theme);
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
  });
}

// 初期テーマ設定
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// プロジェクトリンクの準備中アラート
document.querySelectorAll('.project-item a').forEach(link => {
  link.addEventListener('click', e => {
      e.preventDefault();
      const projectTitle = link.closest('.project-item').querySelector('h3').textContent;
      alert(`${projectTitle}のサイトは現在準備中です。詳細はお問い合わせください！`);
  });
});

// 技術バッジのスクロール制御
document.querySelectorAll('.tech-badges-container').forEach(container => {
  const badges = container.querySelector('.tech-badges');
  const scrollLeftBtn = container.querySelector('.scroll-left');
  const scrollRightBtn = container.querySelector('.scroll-right');

  scrollLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      badges.scrollBy({ left: -150, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      badges.scrollBy({ left: 150, behavior: 'smooth' });
  });

  badges.addEventListener('scroll', () => {
      const maxScroll = badges.scrollWidth - badges.clientWidth;
      scrollLeftBtn.disabled = badges.scrollLeft <= 0;
      scrollRightBtn.disabled = badges.scrollLeft >= maxScroll - 1;
      scrollLeftBtn.style.opacity = badges.scrollLeft <= 0 ? '0.5' : '1';
      scrollRightBtn.style.opacity = badges.scrollLeft >= maxScroll - 1 ? '0.5' : '1';
  });

  const maxScroll = badges.scrollWidth - badges.clientWidth;
  scrollLeftBtn.disabled = badges.scrollLeft <= 0;
  scrollRightBtn.disabled = badges.scrollLeft >= maxScroll - 1;
  scrollLeftBtn.style.opacity = badges.scrollLeft <= 0 ? '0.5' : '1';
  scrollRightBtn.style.opacity = badges.scrollLeft >= maxScroll - 1 ? '0.5' : '1';
});

// テキスト展開とエリプシス判定
function checkEllipsis(element) {
  const style = window.getComputedStyle(element);
  const lineClamp = parseInt(style.getPropertyValue('-webkit-line-clamp')) || 2;
  const lineHeight = parseFloat(style.getPropertyValue('line-height')) || 1.5;
  const maxHeight = lineClamp * lineHeight * parseFloat(style.getPropertyValue('font-size'));
  const isEllipsis = element.scrollHeight > element.offsetHeight || element.scrollHeight > maxHeight;
  return isEllipsis;
}

function updateEllipsis() {
  document.querySelectorAll('[data-fulltext]').forEach(element => {
      const btn = element.nextElementSibling?.classList.contains('details-btn') ? element.nextElementSibling : null;
      if (!btn) return;

      const isEllipsis = checkEllipsis(element);

      if (isEllipsis) {
          element.classList.add('has-ellipsis');
          btn.style.display = 'block';
      } else {
          element.classList.remove('has-ellipsis');
          btn.style.display = 'none';
      }
  });
}

document.querySelectorAll('[data-fulltext]').forEach(element => {
  const btn = element.nextElementSibling?.classList.contains('details-btn') ? element.nextElementSibling : null;
  if (!btn) return;

  btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      element.classList.toggle('expanded');
      btn.textContent = element.classList.contains('expanded') ? '閉じる' : '詳細を見る';
      btn.setAttribute('aria-expanded', element.classList.contains('expanded'));
  });
});

// デバウンス関数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

// 初回ロードとリサイズ時にエリプシスをチェック
window.addEventListener('load', updateEllipsis);
window.addEventListener('resize', debounce(updateEllipsis, 100));

// スキルツールチップのオーバーフロー防止
document.querySelectorAll('.skill-item').forEach(item => {
  const tooltip = item.querySelector('.tooltip.skill');
  if (tooltip) {
      item.addEventListener('mouseenter', () => {
          const rect = tooltip.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          if (rect.bottom > viewportHeight) {
              tooltip.classList.add('tooltip-up');
              tooltip.style.top = 'auto';
              tooltip.style.bottom = 'calc(100% + 12px)';
              tooltip.style.transform = 'translateX(-50%) translateY(4px) scale(1.05)';
          } else {
              tooltip.classList.remove('tooltip-up');
              tooltip.style.top = 'calc(100% + 12px)';
              tooltip.style.bottom = 'auto';
              tooltip.style.transform = 'translateX(-50%) translateY(-4px) scale(1.05)';
          }

          if (rect.right > viewportWidth) {
              tooltip.style.left = 'auto';
              tooltip.style.right = '0';
              tooltip.style.transform = rect.bottom > viewportHeight
                  ? 'translateX(0) translateY(4px) scale(1.05)'
                  : 'translateX(0) translateY(-4px) scale(1.05)';
          } else if (rect.left < 0) {
              tooltip.style.left = '0';
              tooltip.style.right = 'auto';
              tooltip.style.transform = rect.bottom > viewportHeight
                  ? 'translateX(0) translateY(4px) scale(1.05)'
                  : 'translateX(0) translateY(-4px) scale(1.05)';
          } else {
              tooltip.style.left = '50%';
              tooltip.style.right = 'auto';
              tooltip.style.transform = rect.bottom > viewportHeight
                  ? 'translateX(-50%) translateY(4px) scale(1.05)'
                  : 'translateX(-50%) translateY(-4px) scale(1.05)';
          }
      });
  }
});

// お問い合わせフォームのiframe高さ調整
function resizeIframe(iframe) {
  if (!iframe || !iframe.contentWindow) {
      console.warn('iframeまたはcontentWindowが見つかりません');
      handleIframeError(iframe);
      return;
  }

  iframe.style.height = 'auto';
  const minHeight = window.innerWidth <= 480 ? 500 : window.innerWidth <= 768 ? 600 : 800;

  const adjustHeight = () => {
      try {
          // Googleフォーム特有のコンテンツ要素をターゲット
          const formContent = iframe.contentWindow.document.querySelector('.freebirdFormviewerViewFormContent') || 
                             iframe.contentWindow.document.body;
          const contentHeight = formContent.scrollHeight || iframe.contentWindow.document.body.scrollHeight || minHeight;
          const extraPadding = 100; // 余白を追加して非表示部分を防止
          iframe.style.height = `${Math.max(contentHeight + extraPadding, minHeight)}px`;
          console.log(`iframeの高さを調整: ${iframe.style.height}`);
      } catch (e) {
          console.warn('iframeの高さ取得に失敗:', e);
          iframe.style.height = `${minHeight}px`;
      }
  };

  // 初回調整
  adjustHeight();

  // ロード時の再調整
  iframe.contentWindow.addEventListener('load', adjustHeight);

  // 短い間隔でポーリング（動的コンテンツ対応）
  const pollingInterval = setInterval(adjustHeight, 500); // 0.5秒間隔
  setTimeout(() => {
      clearInterval(pollingInterval);
      adjustHeight(); // 最終調整
      console.log('ポーリング終了');
  }, 60000); // 60秒後に停止

  // リサイズ時の再調整
  window.addEventListener('resize', debounce(adjustHeight, 100));
}

// iframeのエラーハンドリング
function handleIframeError(iframe) {
  iframe.style.display = 'none';
  const errorElement = document.getElementById('form-error');
  if (errorElement) {
      errorElement.style.display = 'block';
  }
}

// デバウンス関数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

// 初回読み込み時の調整
window.addEventListener('load', () => {
  const iframe = document.getElementById('contact-form');
  if (iframe) resizeIframe(iframe);
});