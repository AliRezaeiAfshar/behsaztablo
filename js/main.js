// js/main.js - Cleaned Up Version

document.addEventListener("DOMContentLoaded", function() {

    // --- Mobile Menu Toggle ---
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    };

    // --- Active Navigation Link ---
    const currentPageFile = window.location.pathname.split('/').pop() || 'homepage.html';
    const navLinks = document.querySelectorAll('header nav a:not(.btn-accent)');

    navLinks.forEach(link => {
        if (link.hasAttribute('href')) {
            const linkFile = link.getAttribute('href').split('/').pop();
            if (linkFile === currentPageFile) {
                link.classList.add('text-primary', 'font-semibold');
                link.classList.remove('text-secondary-600');
            } else {
                link.classList.remove('text-primary', 'font-semibold');
                link.classList.add('text-secondary-600');
            }
        }
    });

    // --- Carousel Functionality (if it's on the page) ---
    if (document.getElementById('hero-carousel')) {
        let slideIndex = 1;
        showSlides(slideIndex);
        window.plusSlides = n => showSlides(slideIndex += n);
        window.currentSlide = n => showSlides(slideIndex = n);
        
        function showSlides(n) {
            let slides = document.getElementsByClassName("carousel-slide");
            let dots = document.getElementsByClassName("carousel-dot");
            if (slides.length === 0) return;
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("bg-opacity-100");
                dots[i].classList.add("bg-opacity-50");
            }
            slides[slideIndex - 1].style.opacity = "1";
            dots[slideIndex - 1].classList.add("bg-opacity-100");
        }
        setInterval(() => plusSlides(1), 3000);
    }
});