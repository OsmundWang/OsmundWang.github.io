/* =========================================================
   Ziao Wang – Personal site scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* -------------------------------------------------------
     1. Gallery module (data + rendering + lightbox)
     ------------------------------------------------------- */

  const galleryData = [
    {
      title: 'Optical Lab Setup',
      date: 'Nov 2024',
      desc:
        'Calibrating the DMD for the new large-scale transformer experiments. The alignment requires micron-level precision.',
      tags: ['Lab', 'Optics'],
      type: 'image',
      src:
        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Nature paper submission',
      date: 'Oct 2024',
      desc:
        'Finalizing the draft for our work on Optical DFA. A culmination of two years of hardware–software co-design.',
      tags: ['Research', 'Milestone'],
      type: 'text',
      src: null,
    },
    {
      title: 'Conference in Lyon',
      date: 'Sep 2024',
      desc:
        'Presenting our poster on physics-constrained deep learning. Great discussions on the thermodynamics of learning.',
      tags: ['Travel', 'Conference'],
      type: 'image',
      src:
        'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilters = document.getElementById('gallery-filters');

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTags = document.getElementById('lightbox-tags');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxIcon = document.getElementById('lightbox-icon');
  const lightboxClose = document.getElementById('lightbox-close');

  function createGalleryCard(item, index) {
    const card = document.createElement('article');
    card.className =
      'gallery-card glass rounded-2xl overflow-hidden border border-white/5 group interactable cursor-pointer reveal-scroll reveal-up';
    card.style.transitionDelay = `${index * 80}ms`;

    // Thumbnail
    const thumb = document.createElement('div');
    thumb.className = 'h-48 bg-stone-900 relative overflow-hidden';

    if (item.src) {
      const img = document.createElement('img');
      img.className =
        'card-thumb w-full h-full object-cover transition-transform duration-700 ease-out';
      img.src = item.src;
      img.alt = item.title;
      thumb.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className =
        'w-full h-full flex items-center justify-center bg-white/5';
      placeholder.innerHTML =
        '<i class="ph ph-article text-4xl text-stone-700"></i>';
      thumb.appendChild(placeholder);
    }

    const overlay = document.createElement('div');
    overlay.className =
      'card-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center';
    overlay.innerHTML =
      '<span class="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-xs font-medium">View details</span>';
    thumb.appendChild(overlay);

    // Content
    const content = document.createElement('div');
    content.className = 'p-6';

    const topRow = document.createElement('div');
    topRow.className = 'flex justify-between items-start mb-2';

    const date = document.createElement('span');
    date.className =
      'text-accentWarm text-[10px] font-bold uppercase tracking-wider';
    date.textContent = item.date;
    topRow.appendChild(date);

    content.appendChild(topRow);

    const title = document.createElement('h4');
    title.className =
      'text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1';
    title.textContent = item.title;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'text-stone-500 text-sm line-clamp-2';
    desc.textContent = item.desc;
    content.appendChild(desc);

    card.appendChild(thumb);
    card.appendChild(content);

    card.addEventListener('click', () => openLightbox(item));

    return card;
  }

  function renderGallery(items = galleryData) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    items.forEach((item, index) => {
      const card = createGalleryCard(item, index);
      galleryGrid.appendChild(card);
    });

    // Attach reveal observer to new elements
    attachScrollReveal();
  }

  function buildGalleryFilters() {
    if (!galleryFilters || !galleryData.length) return;

    const tagSet = new Set();
    galleryData.forEach((item) => {
      (item.tags || []).forEach((tag) => tagSet.add(tag));
    });

    const tags = ['All', ...Array.from(tagSet)];
    galleryFilters.innerHTML = '';

    tags.forEach((tag, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.tag = tag;
      btn.textContent = tag;
      btn.className =
        'gallery-filter-btn px-3 py-1.5 rounded-full text-xs border border-white/10 text-stone-300 hover:bg-white/10 transition-all';

      if (index === 0) {
        btn.classList.add('gallery-filter-btn-active');
      }

      btn.addEventListener('click', () => {
        galleryFilters
          .querySelectorAll('.gallery-filter-btn')
          .forEach((b) => b.classList.remove('gallery-filter-btn-active'));
        btn.classList.add('gallery-filter-btn-active');

        if (tag === 'All') {
          renderGallery(galleryData);
        } else {
          const subset = galleryData.filter(
            (item) => item.tags && item.tags.includes(tag),
          );
          renderGallery(subset);
        }
      });

      galleryFilters.appendChild(btn);
    });
  }

  function openLightbox(item) {
    if (!lightbox) return;

    lightboxTitle.textContent = item.title;
    lightboxDate.textContent = item.date;
    lightboxDesc.textContent = item.desc;

    if (item.src) {
      lightboxImg.src = item.src;
      lightboxImg.classList.remove('hidden');
      lightboxIcon.classList.add('hidden');
    } else {
      lightboxImg.classList.add('hidden');
      lightboxIcon.classList.remove('hidden');
    }

    lightboxTags.innerHTML = '';
    (item.tags || []).forEach((tag) => {
      const chip = document.createElement('span');
      chip.className =
        'px-2 py-1 bg-white/10 rounded text-[10px] text-stone-300 uppercase tracking-wide';
      chip.textContent = tag;
      lightboxTags.appendChild(chip);
    });

    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  /* -------------------------------------------------------
     2. Navigation transitions, section highlighting,
        scroll progress & back-to-top
     ------------------------------------------------------- */

  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const pageWiper = document.getElementById('page-wiper');

  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function scrollWithWipe(targetId) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection || !pageWiper) return;

    pageWiper.classList.remove('wiping-out');
    pageWiper.classList.add('wiping-in');
    body.classList.add('transitioning');

    // Wait for the wipe to cover the screen
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });

      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }

      // Let the wipe exit and restore content
      setTimeout(() => {
        pageWiper.classList.remove('wiping-in');
        pageWiper.classList.add('wiping-out');
        body.classList.remove('transitioning');
      }, 120);
    }, 800);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      event.preventDefault();
      const targetId = href.slice(1);
      scrollWithWipe(targetId);
    });
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Scroll-down chevron in hero
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      scrollWithWipe('about');
    });
  }

  // Scroll progress + navbar shadow + back-to-top visibility
  function updateScrollProgress() {
    if (!scrollProgressBar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgressBar.style.width = `${progress}%`;
  }

  function updateNavbarState() {
    if (!navbar) return;
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('shadow-lg', scrolled);
    navbar.classList.toggle('bg-dark/90', scrolled);
  }

  function updateBackToTop() {
    if (!backToTopBtn) return;
    const shouldShow = window.scrollY > 400;
    backToTopBtn.classList.toggle('visible', shouldShow);
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function handleScroll() {
    updateScrollProgress();
    updateNavbarState();
    updateBackToTop();
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial state

  // Section-based nav highlighting
  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const linkMap = new Map();
    document
      .querySelectorAll('.nav-link[href^="#"]')
      .forEach((link) => {
        const id = link.getAttribute('href').slice(1);
        if (!linkMap.has(id)) linkMap.set(id, []);
        linkMap.get(id).push(link);
      });

    let currentId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (currentId === id) return;
            currentId = id;

            // Reset all
            linkMap.forEach((links) =>
              links.forEach((link) => link.classList.remove('nav-link-active')),
            );

            const activeLinks = linkMap.get(id) || [];
            activeLinks.forEach((link) =>
              link.classList.add('nav-link-active'),
            );
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  initSectionObserver();

  /* -------------------------------------------------------
     3. Scroll reveal observer
     ------------------------------------------------------- */

  let scrollObserver = null;

  function initScrollReveal() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, options);

    attachScrollReveal();
  }

  function attachScrollReveal() {
    if (!scrollObserver) return;
    const revealElements = document.querySelectorAll('.reveal-scroll');
    revealElements.forEach((el) => scrollObserver.observe(el));
  }

  initScrollReveal();

  /* -------------------------------------------------------
     4. Custom cursor (desktop only, with delegation)
     ------------------------------------------------------- */

  function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      cursorDot.style.display = 'none';
      cursorOutline.style.display = 'none';
      return;
    }

    cursorDot.style.display = 'block';
    cursorOutline.style.display = 'block';

    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      cursorDot.style.top = `${cursorY}px`;
      cursorDot.style.left = `${cursorX}px`;

      // Highlight outline when hovering interactive elements
      if (event.target.closest('.interactable, a, button')) {
        body.classList.add('hovering');
      } else {
        body.classList.remove('hovering');
      }
    });

    const animateOutline = () => {
      outlineX += (cursorX - outlineX) * 0.15;
      outlineY += (cursorY - outlineY) * 0.15;

      cursorOutline.style.top = `${outlineY}px`;
      cursorOutline.style.left = `${outlineX}px`;

      requestAnimationFrame(animateOutline);
    };

    animateOutline();
  }

  initCustomCursor();

  /* -------------------------------------------------------
     5. Initial gallery render & filters
     ------------------------------------------------------- */

  renderGallery();
  buildGalleryFilters();
});
