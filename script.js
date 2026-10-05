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

// ===========================
// 6. ANIMASI TYPING TEXT (LOOP FIXED HEIGHT)
// ===========================
const textToType = "Work with heart, stay grateful, and keep smiling.";
const typingElement = document.getElementById("typing-text");

if (typingElement) {
    let index = 0;
    let isDeleting = false;
    const typeSpeed = 75;    // Kecepatan mengetik (ms)
    const deleteSpeed = 35;  // Kecepatan menghapus (ms)
    const pauseEnd = 2000;   // Jeda saat selesai mengetik (2 detik)
    const pauseStart = 500;  // Jeda sebelum mulai mengetik lagi (0.5 detik)

    function typeLoop() {
        const currentText = textToType.substring(0, index);
        
        // Menggunakan &nbsp; saat kosong agar tinggi baris tidak hilang/collapse
        typingElement.innerHTML = currentText || '&nbsp;';

        let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && index === textToType.length) {
            nextSpeed = pauseEnd;
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            nextSpeed = pauseStart;
            isDeleting = false;
        }

        index += isDeleting ? -1 : 1;
        setTimeout(typeLoop, nextSpeed);
    }

    setTimeout(typeLoop, 800);
}

// ===========================
// 7. TIMELINE ANIMATION (WORK PROGRAM)
// ===========================
const timelineWrapper = document.getElementById('timeline-wrapper');
const dots = document.querySelectorAll('.indicator-dot');
const lineBg = document.getElementById('program-line-bg');
const lineProgress = document.getElementById('program-line-progress');

function updateExperienceTimeline() {
    if (!timelineWrapper || dots.length < 3) return;

    // Nonaktifkan eksekusi animasi untuk tampilan mobile
    if (window.innerWidth < 768) return;

    const dot1 = dots[0];
    const dot3 = dots[dots.length - 1];

    // Kalkulasi posisi elemen
    const dot1Rect = dot1.getBoundingClientRect();
    const dot3Rect = dot3.getBoundingClientRect();
    const wrapperRect = timelineWrapper.getBoundingClientRect();

    // Jarak vertikal untuk background line agar terhubung tepat dari tengah Lingkaran 1 ke Lingkaran 3
    const topOffset = (dot1Rect.top - wrapperRect.top) + (dot1Rect.height / 2);
    const totalHeight = (dot3Rect.top + dot3Rect.height / 2) - (dot1Rect.top + dot1Rect.height / 2);

    if(lineBg) {
        lineBg.style.top = `${topOffset}px`;
        lineBg.style.height = `${totalHeight}px`;
    }

    // Hitung progres scroll
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.65; // Garis mulai bereaksi ketika kartu pertama mencapai ~65% tinggi layar
    
    let progress = 0;
    if (dot1Rect.top < triggerPoint) {
        progress = triggerPoint - dot1Rect.top;
    }

    progress = Math.max(0, Math.min(progress, totalHeight));

    if(lineProgress) {
        lineProgress.style.height = `${progress}px`;
    }

    // Nyalakan lingkaran (berubah warna menjadi primary) saat ujung garis menyentuhnya
    dots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;
        const lineBottom = dot1Rect.top + dot1Rect.height / 2 + progress;

        if (lineBottom >= dotCenter - 5) { // Toleransi 5px untuk animasi yang mulus
            dot.classList.remove('border-gray-600');
            dot.classList.add('border-primary');
            dot.style.boxShadow = '0 0 12px rgba(0, 242, 254, 0.4)';
        } else {
            dot.classList.add('border-gray-600');
            dot.classList.remove('border-primary');
            dot.style.boxShadow = 'none';
        }
    });
}

window.addEventListener('scroll', updateExperienceTimeline);
window.addEventListener('resize', updateExperienceTimeline);
setTimeout(updateExperienceTimeline, 300);

// ===========================
// 8. TAB SWITCH (WORK PROGRAM & GALLERY) MULTI-GRID
// ===========================
window.switchTab = function(tab) {
    const btnWP = document.getElementById('btn-work-program');
    const btnGallery = document.getElementById('btn-gallery');
    const contentWP = document.getElementById('content-work-program');
    const contentGallery = document.getElementById('content-gallery');
    const indicator = document.getElementById('tab-indicator');

    if (tab === 'work-program') {
        // 1. Animasi Background Slider Button ke Kiri
        indicator.style.width = btnWP.offsetWidth + 'px';
        indicator.style.transform = `translateX(0px)`;

        // 2. Ubah Status Teks (Tanpa merubah font-weight agar text tidak geter/bergeser)
        btnWP.classList.replace('text-gray-400', 'text-[#0c0c11]');
        btnWP.classList.remove('hover:text-white');
        
        btnGallery.classList.replace('text-[#0c0c11]', 'text-gray-400');
        btnGallery.classList.add('hover:text-white');

        // 3. Animasi Konten: Gallery Menghilang ke Bawah, WP Muncul dari Atas
        contentGallery.classList.replace('opacity-100', 'opacity-0');
        contentGallery.classList.replace('translate-y-0', 'translate-y-4');
        contentGallery.classList.replace('pointer-events-auto', 'pointer-events-none');
        contentGallery.classList.replace('z-10', 'z-0');

        contentWP.classList.replace('opacity-0', 'opacity-100');
        contentWP.classList.replace('translate-y-4', 'translate-y-0');
        contentWP.classList.replace('pointer-events-none', 'pointer-events-auto');
        contentWP.classList.replace('z-0', 'z-10');

        // Trigger ulang garis animasi pengalaman jika diperlukan[cite: 1]
        setTimeout(() => {
            if (typeof updateExperienceTimeline === 'function') {
                updateExperienceTimeline();
            }
        }, 300);

    } else if (tab === 'gallery') {
        // 1. Animasi Background Slider Button ke Kanan
        const slideDistance = btnGallery.offsetLeft - btnWP.offsetLeft;
        indicator.style.width = btnGallery.offsetWidth + 'px';
        indicator.style.transform = `translateX(${slideDistance}px)`;

        // 2. Ubah Status Teks
        btnGallery.classList.replace('text-gray-400', 'text-[#0c0c11]');
        btnGallery.classList.remove('hover:text-white');
        
        btnWP.classList.replace('text-[#0c0c11]', 'text-gray-400');
        btnWP.classList.add('hover:text-white');

        // 3. Animasi Konten: WP Menghilang ke Bawah, Gallery Muncul dari Atas
        contentWP.classList.replace('opacity-100', 'opacity-0');
        contentWP.classList.replace('translate-y-0', 'translate-y-4');
        contentWP.classList.replace('pointer-events-auto', 'pointer-events-none');
        contentWP.classList.replace('z-10', 'z-0');

        contentGallery.classList.replace('opacity-0', 'opacity-100');
        contentGallery.classList.replace('translate-y-4', 'translate-y-0');
        contentGallery.classList.replace('pointer-events-none', 'pointer-events-auto');
        contentGallery.classList.replace('z-0', 'z-10');
    }
};

// Mengkalibrasi posisi indikator *slider button* pada saat web pertama kali dimuat
window.addEventListener('load', () => {
    const btnWP = document.getElementById('btn-work-program');
    const indicator = document.getElementById('tab-indicator');
    if (indicator && btnWP) {
        indicator.style.width = btnWP.offsetWidth + 'px';
    }
});

// Database Proyek
const projectsData = [
    {
        title: "Baby Glow",
        category: "Web Design",
        role: "UI/UX Designer",
        techStack: ["Figma"],
        description: "Baby Glow is a mobile application concept designed to help parents manage their babies health and comfort...",
        image: "image/project-1.png",
        liveLink: "https://www.figma.com/proto/UCXKrpNLbioe75bl39EjCm/Baby-Glow?node-id=1-2&p=f&t=1JUWXYb5dOywO55D-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2"
    },
    {
        title: "Next Drive",
        category: "Web Design",
        role: "UI/UX Designer",
        techStack: ["Figma"],
        description: "Next Drive is a UI/UX design concept for a modern automotive marketplace website...",
        image: "image/project-2.png",
        liveLink: "https://www.figma.com/proto/Il12xaw8ibwahVs7hpx0oq/UTS---03069?node-id=1-4&p=f&t=9F40DLs0kVmaeC0y-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=1%3A4"
    },
    {
        title: "OmahUti",
        category: "Web Development, Demo",
        role: "Full Stack Developer",
        techStack: ["JavaScript", "PHP", "Tailwind", "SQL"],
        description: "OmahUti is a website that I developed specifically to help promote local F&B products...",
        image: "image/project-4.png",
    },
    {
        title: "Graphic Design", 
        category: "Graphic Design",
        role: "Graphic Designer",
        techStack: ["Canva", "Figma"],
        description: "This collection of works consists of visual assets that I designed to support various marketing campaigns...",
        image: "image/project-3.png",
        liveLink: "https://canva.link/designfadelnaya"
    }
];
}
);