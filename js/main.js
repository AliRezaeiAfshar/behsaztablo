// js/main.js - Final Version with Number Counter Animation

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
                link.classList.add('active', 'text-primary');
                link.classList.remove('text-secondary-600');
            } else {
                link.classList.remove('active', 'text-primary');
                link.classList.add('text-secondary-600');
            }
        }
    });

    // --- Animated Counter on Scroll ---
    const metricsSection = document.getElementById('metrics-section');
    if (metricsSection) {
        const counters = metricsSection.querySelectorAll('.counter');

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            let start = 0;
            const stepTime = 20; // update every 20ms
            const steps = duration / stepTime;
            const increment = target / steps;

            const updateCount = () => {
                start += increment;
                if (start < target) {
                    counter.innerText = `+${Math.floor(start)}`;
                    setTimeout(updateCount, stepTime);
                } else {
                    counter.innerText = `+${target}`;
                }
            };
            updateCount();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.unobserve(metricsSection); // Animate only once
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });

        observer.observe(metricsSection);
    }

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