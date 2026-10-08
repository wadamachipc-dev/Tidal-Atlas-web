'use strict';
(() => {
  const english = document.documentElement.lang === 'en';
  const tr = (ja, en) => english ? en : ja;
  const assetRoot = english ? '../' : '';
  const config = window.TIDAL_ATLAS_CONFIG || {};
  if (config.publisher) document.querySelectorAll('[data-publisher]').forEach(el => { el.textContent = config.publisher; });
  if (english ? config.releaseTextEn : config.releaseText) document.querySelectorAll('[data-release]').forEach(el => { el.textContent = english ? config.releaseTextEn : config.releaseText; });
  if (config.copyrightYear) document.getElementById('copyright-year').textContent = config.copyrightYear;
  const publisherLinks = document.getElementById('publisher-links');
  const addLink = (label, href, external) => {
    const link = document.createElement('a'); link.textContent = label; link.href = href;
    if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    publisherLinks.append(link); publisherLinks.hidden = false;
  };
  const validUrl = value => { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } };
  if (config.companyUrl && validUrl(config.companyUrl)) addLink(tr("企業サイト", "Company website"), config.companyUrl, true);
  if (config.officialXUrl && validUrl(config.officialXUrl)) addLink(tr("公式X", "Official X"), config.officialXUrl, true);
  if (config.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) addLink(tr("お問い合わせ", "Contact"), 'mailto:' + config.contactEmail, false);
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');
  function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', tr("メニューを開く", "Open menu")); navigation.classList.remove('open'); }
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? tr("メニューを閉じる", "Close menu") : tr("メニューを開く", "Open menu")); navigation.classList.toggle('open', open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const desktopQuery = window.matchMedia('(min-width: 761px)');
  desktopQuery.addEventListener('change', event => { if (event.matches) closeMenu(); });
  const shots = [
    { src: assetRoot + 'assets/shore.webp', caption: tr("岩場と潮だまりの広がる海辺", "A rocky shoreline dotted with tidal pools") },
    { src: assetRoot + 'assets/seagrass.webp', caption: tr("海面の下に広がるアマモ場", "A seagrass meadow beneath the surface") },
    { src: assetRoot + 'assets/school.webp', caption: tr("水中を泳ぐ、小さな魚の群れ", "A school of small fish swimming underwater") },
    { src: assetRoot + 'assets/fish.webp', caption: tr("一匹ずつ、姿や模様をじっくり観察", "Take a closer look at each creature and its markings") },
    { src: assetRoot + 'assets/aquarium.webp', caption: tr("採集した生き物を迎える、自分の水槽", "Your own aquarium for the wildlife you collect") }
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
