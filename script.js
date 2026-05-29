/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    function changeActiveLink() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", changeActiveLink);
    changeActiveLink();

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: "smooth",
                });
            }
        });
    });

    const homeLink = document.querySelector(".navbar ul li a[href='#home']");
    if (homeLink) {
        homeLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    // ========== SEAMLESS INFINITE SCROLL ==========
    function setupInfiniteScroll(containerSelector, speed = 2.0) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.log("Container not found:", containerSelector);
            return;
        }
        
        console.log("Infinite scroll setup for:", containerSelector);
        
        // Start from beginning
        container.scrollLeft = 0;
        container.style.scrollSnapType = 'none';
        
        // Clone content for seamless infinite effect
        const originalContent = container.innerHTML;
        container.innerHTML = originalContent + originalContent;
        
        let animationId;
        let isHovering = false;
        let isDragging = false;
        
        function autoScroll() {
            if (!isHovering && !isDragging && container) {
                const maxScroll = container.scrollWidth - container.clientWidth;
                let newScrollLeft = container.scrollLeft + speed;
                
                // When reaching the cloned content, reset to original start
                if (newScrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = newScrollLeft - (container.scrollWidth / 2);
                } else {
                    container.scrollLeft = newScrollLeft;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        }
        
        container.addEventListener('mouseenter', () => { isHovering = true; });
        container.addEventListener('mouseleave', () => { isHovering = false; });
        container.addEventListener('mousedown', () => { isDragging = true; });
        container.addEventListener('mouseup', () => { setTimeout(() => { isDragging = false; }, 100); });
        
        animationId = requestAnimationFrame(autoScroll);
        
        window.addEventListener('beforeunload', () => {
            if (animationId) cancelAnimationFrame(animationId);
        });
    }
    
    setTimeout(() => {
        setupInfiniteScroll('.projects-container', 2.0);
        setupInfiniteScroll('.certificates-container', 2.0);
    }, 500);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navbar ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('bx-menu');
            icon.classList.toggle('bx-x');
        }
    });

    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bx-menu');
                    icon.classList.remove('bx-x');
                }
            }
        });
    });
}