document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       CONFIGURATION
       ========================================= */
    const HOME_GALLERY_LIMIT = 3; 

    /* =========================================
       DATA SOURCE: PROJECTS
       ========================================= */
    const projectsData = [
        {
            title: "Optical Forward and Backward",
            years: "2025 – Present",
            status: "ongoing",
            highlight: false, 
            image: "assets/img/orbm.png", 
            tags: ["Optics", "Deep Learning", "Hardware"],
            bullets: [
                "Bidirectional Digital Optical Phase Conjugation (DOPC) through a multimode fibre.",
                "Unify harware bothways with single way device.",
                "To design as a optical forward/backward engine for deep learning."
            ],
            desc: "We are developing a bidirectional Digital Optical Phase Conjugation (DOPC) platform that can launch and recover complex fields on both forward and backward paths through a scattering medium / multimode fibre. <br><br> This enables a unified hardware engine for optical forward and backward passes in deep learning, hopefully simplifying system design and enhancing scalability for large-scale optical neural networks.",
            links: []
        },
        {
            title: "Optical Training of Large Transformers",
            years: "2023 – Present",
            status: "ongoing",
            highlight: true, 
            image: "assets/img/odfa.png", 
            tags: ["Optics", "DeepLearning", "Hardware"],
            bullets: [
                "Training 1B+ parameter models via Optics.",
                "Hardware-in-the-loop optical processing Transformer families.",
                "Speed scaling law favors optics."
            ],
            desc: "We propose and implement a hardware-in-the-loop pipeline leveraging an optical processor to train large Transformer families (1B+ parameters) via Optical Direct Feedback Alignment (ODFA). Unlike standard backpropagation, this method allows us to bypass the digital memory bottleneck. <br><br> Our results confirm optical merits in energy efficiency and throughput, paving the way for next-generation photonic accelerators.",
            links: [
                { text: "Under Review", url: "https://arxiv.org/html/2409.12965v2", icon: "ph-file-pdf" }
            ]
        },
        {
            title: "Statistical-Physics Framework for Optical RBMs",
            years: "2023",
            status: "completed",
            highlight: false,
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
            tags: ["Stat-Phys", "Theory", "Optics"],
            bullets: [
                "Energy-based probabilistic modelling of optical systems.",
                "Used Replica Method to derive design principles.",
                "Bridged thermodynamics and neural network theory."
            ],
            desc: "Developed a statistical-physics framework for analyzing Restricted Boltzmann Machines (RBMs) in optical settings. By treating the optical system as a spin glass, we used energy-based probabilistic modelling and the replica method to derive robust design principles that account for physical noise and component variability.",
            links: []
        },
        {
            title: "Reconfigurable Optical Neural Nets",
            years: "2022 – 2024",
            status: "completed",
            highlight: true,
            image: "assets/img/ornn.png",
            tags: ["Optics", "Experiment"],
            bullets: [
                "Scaled constraint-aware ONNs and performed in-situ architecture search under hardware limits.",
                "Physics-aware training with measured non-idealities."
            ],
            desc: "Scaled constraint-aware ONNs and performed in-situ architecture search under hardware limits. Implemented physics-aware training with measured non-idealities, bridging the gap to digital baselines.",
            links: [{ text: "Under Review", url: "", icon: "ph-file-pdf" }]
        },
        {
            title: "Bayesian Evaluation for Noisy Physics Data",
            years: "2018 – 2021",
            status: "completed",
            highlight: true,
            image: "assets/img/bayes.png",
            tags: ["Bayesian", "Physics", "DeepLearning"],
            bullets: [
                "Bayesian Neural Networks with uncertainty quantification.",
                "Fused noisy and divergent nuclear physics datasets."
            ],
            desc: "Built Bayesian neural networks with uncertainty quantification to fuse noisy and divergent datasets in nuclear physics.",
            links: [{ text: "PRL", url: "https://link.aps.org/doi/10.1103/PhysRevLett.123.122501", icon: "ph-file-pdf" }]
        },
    ];

    /* =========================================
       DATA SOURCE: GALLERY
       ========================================= */
    const galleryData = [
        {
            title: "Talk at HKU",
            date: "Sept 2025",
            desc: "Thanks for the invitation to speak at HKU.",
            tags: ["Travel", "Optics"],
            type: "image", 
            src: "assets/img/2025_9_hku.jpg" 
        },
        {
            title: "Best poster award at MLPH",
            date: "Sept 2024",
            desc: "Received the best poster award for our work on ODFA.",
            tags: ["Research", "Milestone"],
            type: "image", 
            src: "assets/img/2024_9_como.jpg"
        },
        {
            title: "JRPS conference in Lyon",
            date: "June 2024",
            desc: "Presenting pre-release our work on optical training.",
            tags: ["Travel", "Conference"],
            type: "image",
            src: "assets/img/2024_7_lyon.jpg"
        },
        {
            title: "Graduation Day",
            date: "July 2021",
            desc: "Receive my bachelor in Physics/Economics from Peking University!",
            tags: ["Milestone", "Graduation"],
            type: "image",
            src: "assets/img/2021_grad.jpg"
        }
    ];

    /* =========================================
       RENDERING LOGIC
       ========================================= */
    
    // Projects
    function createProjectCard(project, index) {
        const isOngoing = project.status === 'ongoing';
        const statusBadge = isOngoing 
            ? '<span class="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">Ongoing</span>'
            : '<span class="px-2 py-0.5 rounded bg-stone-500/10 text-stone-500 text-[10px] font-bold uppercase tracking-wider">Completed</span>';
        const bulletsHtml = project.bullets.map(b => `<li>${b}</li>`).join('');

        return `
            <article class="project-card glass rounded-3xl overflow-hidden border border-white/10 reveal-scroll reveal-up hover:bg-white/5 transition-colors group relative" 
                     data-index="${index}" style="transition-delay: ${index * 100}ms">
                <div class="project-thumb-container relative w-full h-[200px] overflow-hidden bg-[#1c1917]">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
                    <div class="absolute top-4 left-4 z-10 glass px-3 py-1 rounded-full backdrop-blur-md">
                        <span class="text-xs font-bold text-white">${project.years}</span>
                    </div>
                </div>
                <div class="p-8 flex-1 flex flex-col">
                    <div class="mb-4">
                        <div class="flex items-center gap-3 mb-2">${statusBadge}</div>
                        <h3 class="text-2xl font-serif font-bold text-white group-hover:text-accentWarm transition-colors">${project.title}</h3>
                    </div>
                    <ul class="project-bullets mb-6 list-none m-0 p-0 space-y-2">
                        ${project.bullets.map(b => `<li class="relative pl-5 text-sm text-stone-400 before:content-['•'] before:absolute before:left-0 before:text-accentWarm before:font-bold">${b}</li>`).join('')}
                    </ul>
                    <div class="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                        <div class="flex gap-2">
                             ${project.tags.slice(0, 2).map(t => `<span class="text-xs text-stone-500 bg-white/5 px-2 py-1 rounded">${t}</span>`).join('')}
                        </div>
                        <span class="text-sm font-medium text-accentWarm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                            Read more <i class="ph ph-arrow-right"></i>
                        </span>
                    </div>
                </div>
            </article>
        `;
    }

    const homeProjectsList = document.getElementById('home-projects-list');
    if (homeProjectsList) {
        const featured = projectsData.filter(p => p.highlight);
        homeProjectsList.className = "grid md:grid-cols-2 lg:grid-cols-3 gap-8"; 
        homeProjectsList.innerHTML = featured.map((p, i) => createProjectCard(p, projectsData.indexOf(p))).join('');
    }

    const allProjectsList = document.getElementById('all-projects-list');
    if (allProjectsList) {
        allProjectsList.className = "grid md:grid-cols-2 gap-8";
        allProjectsList.innerHTML = projectsData.map((p, i) => createProjectCard(p, i)).join('');
    }

    // Gallery
    function createGalleryCard(item, index) {
        return `
            <div class="gallery-card glass rounded-2xl overflow-hidden border border-white/5 group interactable cursor-pointer reveal-scroll reveal-up" 
                 style="transition-delay: ${index * 100}ms"
                 data-index="${index}">
                <div class="h-48 bg-stone-900 relative overflow-hidden">
                    ${item.src 
                        ? `<img src="${item.src}" class="card-thumb w-full h-full object-cover transition-transform duration-700 ease-out" alt="${item.title}">`
                        : `<div class="w-full h-full flex items-center justify-center bg-white/5"><i class="ph ph-article text-4xl text-stone-700"></i></div>`
                    }
                    <div class="card-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                        <span class="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-xs font-medium">View Details</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-accentWarm text-[10px] font-bold uppercase tracking-wider">${item.date}</span>
                    </div>
                    <h4 class="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">${item.title}</h4>
                    <p class="text-stone-500 text-sm line-clamp-2">${item.desc}</p>
                </div>
            </div>
        `;
    }

    const homeGalleryGrid = document.getElementById('home-gallery-grid');
    if (homeGalleryGrid) {
        const recent = galleryData.slice(0, HOME_GALLERY_LIMIT);
        homeGalleryGrid.innerHTML = recent.map((item, i) => createGalleryCard(item, i)).join('');
    }

    const allGalleryGrid = document.getElementById('all-gallery-grid');
    if (allGalleryGrid) {
        allGalleryGrid.innerHTML = galleryData.map((item, i) => createGalleryCard(item, i)).join('');
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => openLightbox('gallery', parseInt(card.dataset.index)));
        });
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => openLightbox('project', parseInt(card.dataset.index)));
        });

        const closeBtn = document.getElementById('lightbox-close');
        if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === "Escape" && !lightbox.classList.contains('hidden')) closeLightbox(); });
    }

    function closeLightbox() { if(lightbox) lightbox.classList.add('hidden'); }

    function openLightbox(type, index) {
        if (!lightbox) return;
        let data = {};
        if (type === 'gallery') {
            const item = galleryData[index];
            data = { title: item.title, subtitle: item.date, desc: item.desc, tags: item.tags, img: item.src, links: [] };
        } else if (type === 'project') {
            const item = projectsData[index];
            data = { title: item.title, subtitle: item.years, desc: item.desc, tags: item.tags, img: item.image, links: item.links || [] };
        }

        document.getElementById('lightbox-title').innerText = data.title;
        document.getElementById('lightbox-date').innerText = data.subtitle;
        document.getElementById('lightbox-desc').innerHTML = data.desc;
        const imgEl = document.getElementById('lightbox-img');
        const iconEl = document.getElementById('lightbox-icon');
        if (data.img) { imgEl.src = data.img; imgEl.classList.remove('hidden'); if(iconEl) iconEl.classList.add('hidden'); }
        else { imgEl.classList.add('hidden'); if(iconEl) iconEl.classList.remove('hidden'); }
        document.getElementById('lightbox-tags').innerHTML = data.tags.map(t => `<span class="px-2 py-1 bg-white/10 rounded text-[10px] text-stone-300 uppercase">${t}</span>`).join('');
        
        const linkContainer = document.getElementById('lightbox-links');
        if (linkContainer) {
            if (data.links.length > 0) {
                linkContainer.classList.remove('hidden');
                linkContainer.innerHTML = data.links.map(l => `<a href="${l.url}" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-accentWarm text-dark font-bold rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-wider shadow-lg"><i class="ph ${l.icon} text-lg"></i> ${l.text}</a>`).join('');
            } else {
                linkContainer.classList.add('hidden');
                linkContainer.innerHTML = '';
            }
        }
        lightbox.classList.remove('hidden');
    }


    /* =========================================
       UNIFIED NAVIGATION & ANIMATION SYSTEM
       ========================================= */
    const wiper = document.getElementById('page-wiper');
    const body = document.body;
    const mobileMenu = document.getElementById('mobile-menu');

    // 1. Select all navigation links (Menu items + Page transitions)
    // Note: We target 'nav-link' (main menu) and 'page-transition' (internal buttons like 'View All')
    const navLinks = document.querySelectorAll('.nav-link, .page-transition');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignore external links or empty links
            if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;

            e.preventDefault();

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Determine if target is on the CURRENT page
            // Logic: If href is just "#id" OR if it is "index.html#id" and we are currently on index.html
            const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
            const targetIsIndex = href.includes('index.html') || href.startsWith('#');
            
            let isInternalNav = false;
            let targetId = null;

            if (href.startsWith('#')) {
                isInternalNav = true;
                targetId = href.substring(1);
            } else if (targetIsIndex && isIndexPage) {
                // We are on index, target is index.html...
                if (href.includes('#')) {
                    isInternalNav = true;
                    targetId = href.split('#')[1];
                } else {
                    // Just "index.html" -> scroll to top
                    isInternalNav = true;
                    targetId = 'top'; 
                }
            }

            // ACTION: Internal Scroll vs Page Navigation
            if (isInternalNav) {
                handleInternalNavigation(targetId);
            } else {
                handlePageNavigation(href);
            }
        });
    });

    function handleInternalNavigation(targetId) {
        // 1. Wipe In (Cover Screen)
        wiper.classList.remove('wiping-out');
        wiper.classList.add('wiping-in');
        body.classList.add('transitioning');

        // 2. Wait for cover, then Scroll, then Wipe Out
        setTimeout(() => {
            if (targetId === 'top') {
                window.scrollTo({ top: 0, behavior: 'instant' }); // Instant because hidden
            } else {
                const el = document.getElementById(targetId);
                if (el) el.scrollIntoView({ behavior: 'instant' });
            }

            // 3. Wipe Out (Reveal)
            // We need a small delay to ensure scroll rendering is done
            setTimeout(() => {
                wiper.classList.remove('wiping-in');
                wiper.classList.add('wiping-out');
                body.classList.remove('transitioning');
            }, 100);

        }, 600); // Match CSS transition time
    }

    function handlePageNavigation(targetUrl) {
        // 1. Wipe In (Cover Screen)
        wiper.classList.remove('wiping-out');
        wiper.classList.add('wiping-in');
        body.classList.add('transitioning');

        // 2. Navigate away
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    /* =========================================
       SCROLL REVEAL & UTILITIES
       ========================================= */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    setTimeout(() => {
        document.querySelectorAll('.reveal-scroll').forEach(el => scrollObserver.observe(el));
    }, 100);

    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isFinePointer && cursorDot && cursorOutline) {
        cursorDot.style.display = 'block'; cursorOutline.style.display = 'block';
        let cx = 0, cy = 0, ox = 0, oy = 0;
        document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cursorDot.style.top = cy+'px'; cursorDot.style.left = cx+'px'; });
        const animateCursor = () => { ox += (cx - ox) * 0.15; oy += (cy - oy) * 0.15; cursorOutline.style.top = oy+'px'; cursorOutline.style.left = ox+'px'; requestAnimationFrame(animateCursor); };
        animateCursor();
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('.interactable, a, button, .project-card, .gallery-card')) document.body.classList.add('hovering');
            else document.body.classList.remove('hovering');
        });
    }
    
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) navbar.classList.add('shadow-lg', 'bg-dark/90');
            else navbar.classList.remove('shadow-lg', 'bg-dark/90');
        });
    }

    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }

    /* =========================================
       SCROLL PROGRESS & BACK TO TOP (Index Only)
       ========================================= */
    
    // Check if we are on index page
    const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    if (isIndexPage) {
        const progressBar = document.getElementById('scroll-progress');
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            // 1. Progress Bar Logic
            if (progressBar) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + "%";
            }

            // 2. Back to Top Visibility
            if (backToTopBtn) {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }
        });

        // Back to Top Click Handler
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /* =========================================
       UI CLEANUP (Remove Focus Box)
       ========================================= */
    // When a nav link is clicked, remove focus to kill the outline
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            link.blur(); // Removes focus immediately after click
        });
    });
});