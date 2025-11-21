document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. GALLERY MODULE
       Manage your photos and blog entries here.
       ========================================= */
    
    // To add new photos, upload them to 'assets/img/' and add an entry below.
    const galleryData = [
        {
            title: "Optical Lab Setup",
            date: "Nov 2024",
            desc: "Calibrating the DMD for the new large-scale transformer experiments. The alignment requires micron-level precision.",
            tags: ["Lab", "Optics"],
            type: "image", 
            // Use local paths like 'assets/img/lab-setup.jpg' or external URLs
            src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" 
        },
        {
            title: "Paper Submission",
            date: "Oct 2024",
            desc: "Finalizing the draft for our work on Optical DFA. A culmination of two years of hardware-software co-design.",
            tags: ["Research", "Milestone"],
            type: "text", 
            src: null // Text only
        },
        {
            title: "Conference in Lyon",
            date: "Sep 2024",
            desc: "Presenting our poster on Physics-Constrained Deep Learning. Great discussions on the thermodynamics of learning.",
            tags: ["Travel", "Conference"],
            type: "image",
            src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox-modal');
    
    // Render Gallery Cards
    function renderGallery() {
        if(!galleryGrid) return;
        
        galleryGrid.innerHTML = galleryData.map((item, index) => `
            <div class="gallery-card glass rounded-2xl overflow-hidden border border-white/5 group interactable cursor-pointer reveal-scroll reveal-up" 
                 style="transition-delay: ${index * 100}ms"
                 data-index="${index}">
                <!-- Image/Thumbnail Area -->
                <div class="h-48 bg-stone-900 relative overflow-hidden">
                    ${item.src 
                        ? `<img src="${item.src}" class="card-thumb w-full h-full object-cover transition-transform duration-700 ease-out" alt="${item.title}">`
                        : `<div class="w-full h-full flex items-center justify-center bg-white/5"><i class="ph ph-article text-4xl text-stone-700"></i></div>`
                    }
                    <!-- Overlay -->
                    <div class="card-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                        <span class="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-xs font-medium">View Details</span>
                    </div>
                </div>
                <!-- Content -->
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-accentWarm text-[10px] font-bold uppercase tracking-wider">${item.date}</span>
                    </div>
                    <h4 class="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">${item.title}</h4>
                    <p class="text-stone-500 text-sm line-clamp-2">${item.desc}</p>
                </div>
            </div>
        `).join('');

        // Add Click Listeners to generated cards
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => {
                openLightbox(parseInt(card.dataset.index));
            });
        });
    }

    // Lightbox Logic
    function openLightbox(index) {
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

    // Close Lightbox
    const closeBtn = document.getElementById('lightbox-close');
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }

    // Close on backdrop click
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.add('hidden');
        });
    }

    // Init Gallery
    renderGallery();


    /* =========================================
       2. NAVIGATION TRANSITION (WIPE)
       ========================================= */
    const navLinks = document.querySelectorAll('.nav-link');
    const wiper = document.getElementById('page-wiper');
    const body = document.body;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only trigger for internal anchor links (starts with #)
            const href = link.getAttribute('href');
            // If it's a real file (like CV), don't intercept
            if (!href || !href.startsWith('#')) return; 
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            // 1. Start Wipe IN
            wiper.classList.remove('wiping-out');
            wiper.classList.add('wiping-in');
            
            // 2. Scale Content
            body.classList.add('transitioning');

            // 3. Wait for wipe
            setTimeout(() => {
                // 4. Scroll Instantly
                targetSection.scrollIntoView({ behavior: 'auto' });
                
                // Close Mobile Menu if open
                document.getElementById('mobile-menu').classList.add('hidden');

                // 5. Reveal
                setTimeout(() => {
                    wiper.classList.remove('wiping-in');
                    wiper.classList.add('wiping-out'); 
                    body.classList.remove('transitioning');
                }, 100);

            }, 800);
        });
    });


    /* =========================================
       3. SCROLL REVEAL SYSTEM
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    // Observe elements
    setTimeout(() => {
        document.querySelectorAll('.reveal-scroll').forEach(el => scrollObserver.observe(el));
    }, 100);


    /* =========================================
       4. UI UTILITIES & CURSOR
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
            cx = e.clientX; 
            cy = e.clientY; 
            cursorDot.style.top = cy+'px'; 
            cursorDot.style.left = cx+'px'; 
        });

        const animateCursor = () => {
            ox += (cx - ox) * 0.15; 
            oy += (cy - oy) * 0.15;
            cursorOutline.style.top = oy+'px'; 
            cursorOutline.style.left = ox+'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Add hover effect for interactable elements
        document.querySelectorAll('.interactable, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => body.classList.remove('hovering'));
        });
    }
    
    // Navbar Glass Effect on Scroll
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

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }
});