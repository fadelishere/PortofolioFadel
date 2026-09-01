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