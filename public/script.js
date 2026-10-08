'use strict';
(() => {
  const config = window.TIDAL_ATLAS_CONFIG || {};
  if (config.publisher) document.querySelectorAll('[data-publisher]').forEach(el => { el.textContent = config.publisher; });
  if (config.releaseText) document.querySelectorAll('[data-release]').forEach(el => { el.textContent = config.releaseText; });
  if (config.copyrightYear) document.getElementById('copyright-year').textContent = config.copyrightYear;
  const publisherLinks = document.getElementById('publisher-links');
  const addLink = (label, href, external) => {
    const link = document.createElement('a'); link.textContent = label; link.href = href;
    if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    publisherLinks.append(link); publisherLinks.hidden = false;
  };
  const validUrl = value => { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } };
  if (config.companyUrl && validUrl(config.companyUrl)) addLink('企業サイト', config.companyUrl, true);
  if (config.officialXUrl && validUrl(config.officialXUrl)) addLink('公式X', config.officialXUrl, true);
  if (config.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) addLink('お問い合わせ', 'mailto:' + config.contactEmail, false);
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');
  function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'メニューを開く'); navigation.classList.remove('open'); }
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く'); navigation.classList.toggle('open', open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const desktopQuery = window.matchMedia('(min-width: 761px)');
  desktopQuery.addEventListener('change', event => { if (event.matches) closeMenu(); });
  const shots = [
    { src: 'assets/shore.webp', caption: '岩場と潮だまりの広がる海辺' },
    { src: 'assets/seagrass.webp', caption: '海面の下に広がるアマモ場' },
    { src: 'assets/school.webp', caption: '水中を泳ぐ、小さな魚の群れ' },
    { src: 'assets/fish.webp', caption: '一匹ずつ、姿や模様をじっくり観察' },
    { src: 'assets/aquarium.webp', caption: '採集した生き物を迎える、自分の水槽' }
  ];
  let selected = 0;
  const stage = document.getElementById('gallery-image');
  const caption = document.getElementById('gallery-caption');
  const count = document.getElementById('gallery-count');
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  function render(index) {
    selected = (index + shots.length) % shots.length;
    const shot = shots[selected]; stage.src = shot.src; stage.alt = shot.caption;
    caption.textContent = shot.caption; count.textContent = String(selected + 1).padStart(2, '0') + ' / 05';
    thumbs.forEach((thumb, i) => { thumb.classList.toggle('active', i === selected); thumb.setAttribute('aria-pressed', String(i === selected)); });
    lightboxImage.src = shot.src; lightboxImage.alt = shot.caption; document.getElementById('lightbox-caption').textContent = shot.caption;
  }
  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => render(i)));
  document.getElementById('gallery-prev').addEventListener('click', () => render(selected - 1));
  document.getElementById('gallery-next').addEventListener('click', () => render(selected + 1));
  document.getElementById('gallery-open').addEventListener('click', () => lightbox.showModal());
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
  document.getElementById('lightbox-prev').addEventListener('click', () => render(selected - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => render(selected + 1));
  lightbox.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); render(selected - 1); } if (event.key === 'ArrowRight') { event.preventDefault(); render(selected + 1); } });
  lightbox.addEventListener('click', event => { if (event.target === lightbox) { const rect = lightbox.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close(); } });
  render(0);
})();
