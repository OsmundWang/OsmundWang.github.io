document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       DATA SOURCE: PROJECTS
       Single source of truth for index.html & projects.html
       ========================================= */
    const projectsData = [
        {
            title: "Optical Training of Large Transformers",
            years: "2023 – Present",
            status: "ongoing",
            highlight: true, // Shows on home page
            tags: ["Optics", "Deep Learning", "Hardware"],
            desc: "Built a hardware-in-the-loop pipeline leveraging an optical processor to train large Transformer families (1B+ parameters) via Direct Feedback Alignment (ODFA). Investigated compute scaling laws and confirmed optical merits in energy and throughput.",
            links: [
                { text: "Nature (Under Review)", url: "assets/docs/main_text.pdf", icon: "ph-file-pdf" }
            ]
        },
        {
            title: "Statistical-Physics Framework for Optical RBMs",
            years: "2023",
            status: "completed",
            highlight: false,
            tags: ["Stat Phys", "Theory", "Optics"],
            desc: "Developed a statistical-physics framework for analyzing Restricted Boltzmann Machines (RBMs) in optical settings. Used energy-based probabilistic modelling and the replica method to derive robust design principles.",
            links: []
        },
        {
            title: "Reconfigurable Optical Neural Nets at Scale",
            years: "2022 – 2024",
            status: "completed",
            highlight: true,
            tags: ["Optics", "Experiment"],
            desc: "Scaled constraint-aware ONNs and performed in-situ architecture search under hardware limits. Implemented physics-aware training with measured non-idealities, bridging the gap to digital baselines.",
            links: []
        },
        {
            title: "Bayesian Evaluation for Noisy Physics Data",
            years: "2018 – 2021",
            status: "completed",
            highlight: false,
            tags: ["Bayesian", "Physics"],
            desc: "Built Bayesian neural networks with uncertainty quantification to fuse noisy and divergent datasets in nuclear physics. Designed priors to enforce domain constraints.",
            links: []
        },
        {
            title: "Lab Infrastructure & Hardware Control",
            years: "Ongoing",
            status: "ongoing",
            highlight: false,
            tags: ["Systems", "Raspberry Pi"],
            desc: "Designing custom control boards and local computing infrastructure to synchronize and steer complex free-space optical experiments for the research group.",
            links: []
        }
    ];

    /* =========================================
       DATA SOURCE: GALLERY
       Single source of truth for index.html & gallery.html
       ========================================= */
    const galleryData = [
        {
            title: "Optical Lab Setup",
            date: "Nov 2024",
            desc: "Calibrating the DMD for the new large-scale transformer experiments. The alignment requires micron-level precision.",
            tags: ["Lab", "Optics"],
            type: "image", 
            src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" 
        },
        {
            title: "Nature Paper Submission",
            date: "Oct 2024",
            desc: "Finalizing the draft for our work on Optical DFA. A culmination of two years of hardware-software co-design.",
            tags: ["Research", "Milestone"],
            type: "text", 
            src: null 
        },
        {
            title: "Conference in Lyon",
            date: "Sep 2024",
            desc: "Presenting our poster on Physics-Constrained Deep Learning. Great discussions on the thermodynamics of learning.",
            tags: ["Travel", "Conference"],
            type: "image",
            src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Early Prototype",
            date: "Feb 2024",
            desc: "First light on the new optical breadboard. Testing the scattering medium response.",
            tags: ["Lab", "Prototype"],
            type: "image",
            src: "https://images.unsplash.com/photo-1517420704952-d9f397176ad2?auto=format&fit=crop&w=800&q=80"
        }
    ];

    /* =========================================
       RENDERING LOGIC
       ========================================= */

    // Helper: Create Project Card HTML
    function createProjectCard(project, index) {
        const tagsHtml = project.tags.map(t => 
            `<span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-stone-400">${t}</span>`
        ).join('');

        const linksHtml = project.links && project.links.length > 0 
            ? `<div class="mt-4 flex gap-3 border-t border-white/5 pt-4">
                ${project.links.map(l => `
                    <a href="${l.url}" target="_blank" class="flex items-center gap-2 text-xs font-bold text-accentWarm hover:text-white transition-colors">
                        <i class="ph ${l.icon}"></i> ${l.text}
                    </a>
                `).join('')}
               </div>` 
            : '';

        // Status badge style
        const isOngoing = project.status === 'ongoing';
        const statusColor = isOngoing ? 'text-green-400 bg-green-400/10' : 'text-stone-500 bg-stone-500/10';

        return `
            <div class="project-card glass p-8 rounded-3xl border border-white/10 reveal-scroll reveal-up hover:bg-white/5 transition-colors group relative overflow-hidden" style="transition-delay: ${index * 100}ms">
                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${statusColor}">${project.years}</span>
                        </div>
                        <h3 class="text-2xl font-bold text-white group-hover:text-accent transition-colors">${project.title}</h3>
                    </div>
                </div>
                
                <p class="text-stone-400 leading-relaxed mb-6 max-w-3xl">
                    ${project.desc}
                </p>

                <div class="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div class="flex gap-2 flex-wrap">${tagsHtml}</div>
                    ${linksHtml}
                </div>
            </div>
        `;
    }

    // 1. Render Home Projects (Highlight only)
    const homeProjectsList = document.getElementById('home-projects-list');
    if (homeProjectsList) {
        const featured = projectsData.filter(p => p.highlight);
        homeProjectsList.innerHTML = featured.map((p, i) => createProjectCard(p, i)).join('');
    }

    // 2. Render All Projects (Grouped by status loosely for simplicity, or just list all)
    const allProjectsList = document.getElementById('all-projects-list');
    if (allProjectsList) {
        // You could group them, but a clean list sorted by date/importance is often better for this style
        allProjectsList.innerHTML = projectsData.map((p, i) => createProjectCard(p, i)).join('');
    }

    // Helper: Create Gallery Card HTML
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

    // 3. Render Home Gallery (Limit 3)
    const homeGalleryGrid = document.getElementById('home-gallery-grid');
    if (homeGalleryGrid) {
        const recent = galleryData.slice(0, 3);
        homeGalleryGrid.innerHTML = recent.map((item, i) => createGalleryCard(item, i)).join('');
        attachGalleryListeners();
    }

    // 4. Render Full Gallery
    const allGalleryGrid = document.getElementById('all-gallery-grid');
    if (allGalleryGrid) {
        allGalleryGrid.innerHTML = galleryData.map((item, i) => createGalleryCard(item, i)).join('');
        attachGalleryListeners();
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox-modal');
    function attachGalleryListeners() {
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => {
                openLightbox(parseInt(card.dataset.index));
            });
        });
    }

    function openLightbox(index) {
        if (!lightbox) return;
        const item = galleryData[index];
        document.getElementById('lightbox-title').innerText = item.title;
        document.getElementById('lightbox-date').innerText = item.date;
        document.getElementById('lightbox-desc').innerText = item.desc;
        
        const imgEl = document.getElementById('lightbox-img');
        const iconEl = document.getElementById('lightbox-icon');
        
        if (item.src) {
            imgEl.src = item.src;
            imgEl.classList.remove('hidden');
            iconEl.classList.add('hidden');
        } else {
            imgEl.classList.add('hidden');
            iconEl.classList.remove('hidden');
        }

        const tagContainer = document.getElementById('lightbox-tags');
        tagContainer.innerHTML = item.tags.map(t => `<span class="px-2 py-1 bg-white/10 rounded text-[10px] text-stone-300 uppercase">${t}</span>`).join('');

        lightbox.classList.remove('hidden');
    }

    // Close Lightbox Events
    if (lightbox) {
        const closeBtn = document.getElementById('lightbox-close');
        if(closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.add('hidden');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && !lightbox.classList.contains('hidden')) {
                lightbox.classList.add('hidden');
            }
        });
    }


    /* =========================================
       NAVIGATION & TRANSITIONS
       ========================================= */
    const wiper = document.getElementById('page-wiper');
    const body = document.body;

    // Internal Anchor Scrolling (Smooth)
    document.querySelectorAll('.anchor-scroll').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href'); // e.g. index.html#about or #about
            const targetId = href.includes('#') ? href.split('#')[1] : null;
            if (targetId) {
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    // If mobile menu is open, close it
                    document.getElementById('mobile-menu').classList.add('hidden');
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Page Transition Logic (Wipe on Link Click)
    document.querySelectorAll('.page-transition').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            
            // 1. Start Wipe In
            wiper.classList.remove('wiping-out');
            wiper.classList.add('wiping-in');
            body.classList.add('transitioning');

            // 2. Wait & Navigate
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600); 
        });
    });

    // Entrance Animation (Optional: Wipe Out on Load)
    // Note: Browser refresh naturally handles a "fresh" look, but we can trigger a wipe-out if we want.
    // For now, we stick to CSS scroll reveals which handle entrance gracefully.


    /* =========================================
       SCROLL REVEAL
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Re-observe elements after rendering
    setTimeout(() => {
        document.querySelectorAll('.reveal-scroll').forEach(el => scrollObserver.observe(el));
    }, 100);


    /* =========================================
       UI UTILITIES
       ========================================= */
    
    // Custom Cursor
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isFinePointer && cursorDot && cursorOutline) {
        cursorDot.style.display = 'block';
        cursorOutline.style.display = 'block';
        let cx = 0, cy = 0, ox = 0, oy = 0;

        document.addEventListener('mousemove', e => { 
            cx = e.clientX; cy = e.clientY; 
            cursorDot.style.top = cy+'px'; cursorDot.style.left = cx+'px'; 
        });

        const animateCursor = () => {
            ox += (cx - ox) * 0.15; oy += (cy - oy) * 0.15;
            cursorOutline.style.top = oy+'px'; cursorOutline.style.left = ox+'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('.interactable, a, button')) {
                document.body.classList.add('hovering');
            } else {
                document.body.classList.remove('hovering');
            }
        });
    }
    
    // Navbar Glass Effect
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-lg', 'bg-dark/90');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-dark/90');
            }
        });
    }

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }
});