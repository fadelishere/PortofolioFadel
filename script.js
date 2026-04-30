document.addEventListener('DOMContentLoaded', () => {
    // 1. INISIALISASI AOS
    AOS.init({
        once: false, 
        offset: 120, 
        duration: 1100, 
        easing: 'ease-out-quint', 
        delay: 50,
        mirror: true, 
        anchorPlacement: 'top-bottom', 
    });

    // ================================
    // 2. SPLASH SCREEN & MULTI-BAHASA
    // =================================
    const loading = document.getElementById('loading');
    const greetingText = document.getElementById('greeting-text');
    
    if (loading && greetingText) {
        // Cek apakah halaman ini dimuat karena di-refresh oleh user
        const navEntries = window.performance.getEntriesByType("navigation");
        const isReload = (navEntries.length > 0 && navEntries[0].type === "reload") || 
                        (window.performance.navigation && window.performance.navigation.type === 1);

        // Cek apakah splash screen sudah pernah tampil di sesi tab ini
        const hasSeenSplash = sessionStorage.getItem('splashShown');

        // Jika sudah pernah melihat splash screen DAN bukan karena halaman di-refresh, langsung sembunyikan
        if (hasSeenSplash && !isReload) {
            loading.style.display = 'none';
        } else {
            // Tandai bahwa splash screen sudah ditampilkan
            sessionStorage.setItem('splashShown', 'true');

            const greetings = ["hello", "hola", "namaste", "bonjour", "ciao", "مرحبا", "こんにちは", "안녕하세요"];
            let currentIndex = 0;
            let isSkipped = false;
            
            const animDuration = 1500; 
            const delayBetweenWords = 200; 

            // Logika Tombol Skip
            const skipBtn = document.getElementById('skip-splash-btn');
            if (skipBtn) {
                skipBtn.addEventListener('click', () => {
                    isSkipped = true; // Menghentikan animasi teks berikutnya
                    loading.classList.add('opacity-0', 'pointer-events-none');
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 1000);
                });
            }

            function showNextGreeting() {
                if (isSkipped) return; 

                if (currentIndex < greetings.length) {
                    greetingText.textContent = greetings[currentIndex];
                    
                    greetingText.classList.remove('animate-greeting-apple');
                    void greetingText.offsetWidth; 
                    greetingText.classList.add('animate-greeting-apple');

                    setTimeout(() => {
                        currentIndex++;
                        showNextGreeting();
                    }, animDuration + delayBetweenWords); 
                    
                } else {
                    loading.classList.add('opacity-0', 'pointer-events-none'); 
                    
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 1000); 
                }
            }

            setTimeout(showNextGreeting, 300);
        }
    }

// ====================================================
    // 3. LOGIKA MOBILE MENU HAMBURGER (OPEN/CLOSE)
    // ====================================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCard = document.getElementById('mobile-menu-card'); // Variabel baru untuk inner card
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        const isMenuOpen = mobileMenu.classList.contains('opacity-100');
        
        if (isMenuOpen) {
            // Animasi Menutup
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            
            // Efek mengecilkan card
            if (mobileMenuCard) {
                mobileMenuCard.classList.remove('scale-100');
                mobileMenuCard.classList.add('scale-95');
            }
            
            document.body.style.overflow = 'auto'; 
        } else {
            // Animasi Membuka
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            
            // Efek pop-up membesarkan card
            if (mobileMenuCard) {
                mobileMenuCard.classList.remove('scale-95');
                mobileMenuCard.classList.add('scale-100');
            }
            
            document.body.style.overflow = 'hidden'; 
        }
    }

    if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

// ===========================
// 4. LOGIKA NAVBAR SCROLL
// ===========================
const navWrapper = document.getElementById('nav-wrapper');
let lastScrollY = window.scrollY;
let ticking = false; 

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScrollY > 60) {
                navWrapper.classList.add('nav-scrolled-wrapper');
            } else {
                navWrapper.classList.remove('nav-scrolled-wrapper');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===========================
// 5. LOGIKA PROJECT MODAL & DATA DINAMIS
// ===========================
const projectModal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

// Database Proyek Bahasa Inggris
const projectsData = [
    {
        title: "Baby Glow",
        category: "Web Design",
        role: "Web Design",
        techStack: ["Figma"],
        description: "Baby Glow is a mobile application concept designed to help parents manage their babies health and comfort. The app bridges children’s medical and wellness needs by providing easy access to pediatric specialists and professional baby spa therapists, with flexible service options such as homecare visits or appointments at clinics/hospitals.\n\nBaby Glow comes with a user-friendly, calming, and practical interface. It is designed so that parents who are in a hurry or feeling anxious can easily find a doctor, schedule visits, or book baby spa services with just a few taps.",
        image: "image/project-1.png",
        liveLink: "https://www.figma.com/proto/UCXKrpNLbioe75bl39EjCm/Baby-Glow?node-id=1-2&p=f&t=1JUWXYb5dOywO55D-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2"
    },
    {
        title: "Next Drive",
        category: "Web Design",
        role: "Web Design",
        techStack: ["Figma"],
        description: "Next Drive is a UI/UX design concept for a modern automotive marketplace website. This platform is designed to bridge the needs of users who want to buy cars (both new and used) safely, while also making it easier for individuals or dealers who want to sell their vehicles quickly at competitive prices.\n\nThe design of Next Drive focuses on building trust and enhancing discoverability. The website offers a clean interface, intuitive navigation, and the presentation of technical data in a way that is easy to understand for both casual users and automotive enthusiasts.",
        image: "image/project-2.png",
        liveLink: "https://www.figma.com/proto/Il12xaw8ibwahVs7hpx0oq/UTS---03069?node-id=1-4&p=f&t=9F40DLs0kVmaeC0y-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=1%3A4"
    },
    {
        title: "OmahUti",
        category: "Web Development, Demo",
        role: "Web Development",
        techStack: ["JavaScript", "PHP", "Tailwind", "SQL"],
        description: "OmahUti is a website that I developed specifically to help promote local F&B products such as cheese sticks, nastar, and various kinds of cookies. Since the main target audience is young people (Gen Z and millennials), the website was built using modern technology to create an interactive and engaging experience.\n\nIt does not only focus on the front-end design to attract customers, but the back-end has also been equipped with a management dashboard system to handle product data and operations in a more organized and structured way.",
        image: "image/project-4.png",
        liveLink: "maintenance.html"
    },
    {
        title: "Graphic Design", 
        category: "Graphic Design",
        role: "Graphic Design",
        techStack: ["Canva"],
        description: "This collection of works consists of visual assets that I designed to support various marketing campaigns and events. In every design process, I always strive to balance aesthetic value with clarity of information so that the message can be delivered effectively. I achieve this through clean layouts, attractive color combinations, and bold, easy-to-read typography. The works I create are also quite diverse to meet various promotional needs. In addition to designing posters, I also create banners and X-banners for print media, as well as arrange Instagram feed layouts, live report frames, and video bumpers as digital assets.",
        image: "image/project-3.png",
        liveLink: "https://canva.link/designfadelnaya"
    }
];

let currentProjectIndex = 0;
let isDescExpanded = false;

// Render data ke dalam HTML Modal
function renderModalData(index) {
    const project = projectsData[index];
    
    // Set text element
    document.getElementById('modal-title').textContent = project.title;
    
    // Render Multiple Labels untuk Category
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = ''; 
    
    const categories = project.category.split(', ');
    categories.forEach(cat => {
        let styleClasses = "bg-primary/10 text-primary border-primary/30"; // Default warna primary (biru cyan)
        
        // Kondisi jika labelnya adalah "Demo", berikan warna kuning yang tidak terlalu terang
        if (cat.trim() === "Demo") {
            styleClasses = "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"; 
        }
        
        tagsContainer.innerHTML += `<span class="px-4 py-1.5 ${styleClasses} text-xs font-bold rounded-full border">${cat.trim()}</span>`;
    });

    document.getElementById('modal-role').textContent = project.role;
    document.getElementById('modal-desc').textContent = project.description;
    
    // Set Image & Links
    document.getElementById('modal-main-img').src = project.image;
    document.getElementById('modal-link-live').href = project.liveLink;

    // Reset teks deskripsi ke mode terpotong (Show More) khusus untuk mobile
    const descEl = document.getElementById('modal-desc');
    isDescExpanded = false;
    descEl.classList.add('line-clamp-3');
    document.getElementById('toggle-desc-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
    document.getElementById('toggle-desc-text').textContent = 'Show More';

    // Set Tech Stack
    const techStackContainer = document.getElementById('modal-tech-stack');
    techStackContainer.innerHTML = ''; 
    project.techStack.forEach(tech => {
        techStackContainer.innerHTML += `<span class="px-3 py-1.5 bg-[#1a1a2e] border border-gray-700 rounded-full text-gray-300 text-xs">${tech}</span>`;
    });
}

// Buka Modal
function openProjectModal(index) {
    currentProjectIndex = index;
    renderModalData(currentProjectIndex);

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        projectModal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

// Tutup Modal
function closeProjectModal() {
    projectModal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300); 
}

// Fungsi tombol Prev (Kiri)
function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    renderModalData(currentProjectIndex);
}

// Fungsi tombol Next (Kanan)
function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    renderModalData(currentProjectIndex);
}

// Fungsi "Show More" / "Show Less" (Hanya berimbas di Mobile)
function toggleDesc() {
    const desc = document.getElementById('modal-desc');
    const icon = document.getElementById('toggle-desc-icon');
    const text = document.getElementById('toggle-desc-text');

    if (isDescExpanded) {
        desc.classList.add('line-clamp-3');
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        text.textContent = 'Show More';
        isDescExpanded = false;
    } else {
        desc.classList.remove('line-clamp-3');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        text.textContent = 'Show Less';
        isDescExpanded = true;
    }
}

// Tutup modal saat klik area gelap di luar modal
if(projectModal) {
    projectModal.addEventListener('click', function(e) {
        if(e.target === projectModal) {
            closeProjectModal();
        }
    });
}
});