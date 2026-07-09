/* ================================
   MAIN JAVASCRIPT
   Portfolio Website
================================ */

// ================================
// PROJECT DATA
// ================================
const projects = {
    1: {
        title: "Vyra",
        category: "Brand Identity & Logo Design",
        gallery: [
            "assets/images/Vira/vyra1.jpg",
            "assets/images/Vira/vyra2.png",
            "assets/images/Vira/vyra3.jpg",
            "assets/images/Vira/vyra4.jpg",
            "assets/images/Vira/vyra5.jpg"
        ],
        description: "Vyra is a contemporary jewelry brand rooted in minimalist luxury. The brand identity pairs a refined geometric wordmark with a delicate gold triangle motif, reflecting precision, elegance, and modern femininity across packaging and product presentation.",
        client: "Vyra Jewelry",
        year: "2026",
        services: "Logo Design, Brand Identity, Packaging"
    },
    2: {
        title: "Brainwise",
        category: "Logo Design & Visual System",
        gallery: [
            "assets/images/brain/brain1.jpg",
            "assets/images/brain/brain2.jpg",
            "assets/images/brain/brain3.jpg",
            "assets/images/brain/brain4.jpg",
            "assets/images/brain/brain5.jpg"
        ],
        description: "Brainwise is a data intelligence consultancy helping businesses make smarter decisions. The logo combines a brain motif with an upward trend line, symbolizing insight and growth. The identity extends across signage and environmental branding with a bold yellow-on-black palette.",
        client: "Brainwise",
        year: "2025",
        services: "Logo Design, Visual Identity, Signage"
    },
    3: {
        title: "Nova",
        category: "Brand Identity & Packaging",
        gallery: [
            "assets/images/novas/nova1.jpg",
            "assets/images/novas/nova2.png",
            "assets/images/novas/nova3.jpg",
            "assets/images/novas/nova4.jpg",
            "assets/images/novas/nova5.jpg"
        ],
        description: "Nova is a forward-thinking brand built around energy, innovation, and bold visual impact. The identity system was crafted to feel modern and memorable across packaging, digital touchpoints, and brand collateral.",
        client: "Nova",
        year: "2025",
        services: "Logo Design, Packaging, Brand Guidelines"
    }
};

// ================================
// DOM ELEMENTS
// ================================
const videoContainer = document.getElementById('video-container');
const videoThumbnail = document.getElementById('video-thumbnail');
const playOverlay = document.getElementById('play-overlay');
const playBtn = document.getElementById('play-btn');
const mainVideo = document.getElementById('main-video');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalSingle = document.getElementById('modal-single');
const modalGallery = document.getElementById('modal-gallery');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalClient = document.getElementById('modal-client');
const modalYear = document.getElementById('modal-year');
const modalServices = document.getElementById('modal-services');

// ================================
// VIDEO PLAYER FUNCTIONALITY
// ================================
function playVideo() {
    // Hide thumbnail and play button
    videoThumbnail.classList.add('hidden');
    playOverlay.classList.add('hidden');
    
    // Show and play video
    mainVideo.classList.remove('hidden');
    mainVideo.play();
}

function pauseVideo() {
    mainVideo.pause();
    mainVideo.classList.add('hidden');
    videoThumbnail.classList.remove('hidden');
    playOverlay.classList.remove('hidden');
}

// Event listeners for video
if (playBtn) {
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });
}

if (playOverlay) {
    playOverlay.addEventListener('click', playVideo);
}

// When video ends, show thumbnail again
if (mainVideo) {
    mainVideo.addEventListener('ended', () => {
        pauseVideo();
    });
}

// ================================
// PROJECT MODAL FUNCTIONALITY
// ================================
function openModal(projectId) {
    const project = projects[projectId];
    
    if (!project) return;
    
    if (project.gallery) {
        modalSingle.classList.add('hidden');
        modalGallery.classList.remove('hidden');
        modalGallery.innerHTML = project.gallery.map((src, index) => `
            <div class="bg-charcoal rounded-xl sm:rounded-2xl overflow-hidden">
                <img src="${src}" alt="${project.title} ${index + 1}" class="w-full h-auto block">
            </div>
        `).join('');
    } else {
        modalSingle.classList.remove('hidden');
        modalGallery.classList.add('hidden');
        modalGallery.innerHTML = '';

        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDescription.textContent = project.description;
        modalClient.textContent = project.client;
        modalYear.textContent = project.year;
        modalServices.textContent = project.services;
    }
    
    // Show modal
    projectModal.classList.remove('hidden');
    setTimeout(() => {
        projectModal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.classList.add('modal-open');
}

function closeModal() {
    projectModal.classList.remove('active');
    
    setTimeout(() => {
        projectModal.classList.add('hidden');
        modalGallery.innerHTML = '';
        modalSingle.classList.remove('hidden');
        modalGallery.classList.add('hidden');
    }, 300);
    
    // Restore body scroll
    document.body.classList.remove('modal-open');
}

// Event listeners for project cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId);
    });
});

// Event listeners for modal close
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// HEADER SCROLL EFFECT
// ================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// CONSOLE MESSAGE
// ================================
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, JavaScript & TailwindCSS', 'font-size: 14px; color: #6B6B6B;');

