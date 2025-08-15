/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    // Function to change active navigation link based on scroll position
    function changeActiveLink() {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150; // Adjusted for navbar height
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
    changeActiveLink(); // Run initially to set active link on page load

    // Smooth scrolling behavior when clicking navbar links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for navbar
                    behavior: "smooth",
                });
            }
        });
    });

    // Ensure the Home button scrolls to the top
    document.querySelector(".navbar ul li a[href='#home']").addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Reveal sections with animation on scroll
    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }


    // Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navbar ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('bx-menu');
    menuToggle.querySelector('i').classList.toggle('bx-x');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('bx-menu');
            menuToggle.querySelector('i').classList.remove('bx-x');
        }
    });
});

    window.addEventListener("scroll", revealSections);
    revealSections(); // Run initially to show sections on load
});

