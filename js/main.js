// js/main.js - Final Version

document.addEventListener("DOMContentLoaded", function() {

    // --- Image Modal Functionality ---
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');

    window.openImageModal = function(imageSrc) {
        if (modal && modalImage) {
            modalImage.src = imageSrc;
            modal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    window.closeImageModal = function(event) {
        // This condition allows closing by clicking the background but not the image itself
        if (event && event.target !== modal) {
            return;
        }
        if (modal) {
            modal.classList.remove('modal-open');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // --- Mobile Menu Toggle ---
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    };

    // --- Mobile Menu Toggle ---
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    };

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

    // --- Active Navigation Link ---
    const currentPageFile = window.location.pathname.split('/').pop() || 'homepage.html';
    // This selector now specifically targets the <a> tags with the .nav-link class
    const navLinks = document.querySelectorAll('header nav a.nav-link');

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

    // --- Glass Navbar on Scroll ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('bg-white/75', 'backdrop-blur-lg');
                header.classList.remove('shadow-card');
            } else {
                header.classList.remove('bg-white/75', 'backdrop-blur-lg');
                header.classList.add('shadow-card');
            }
        });
    }
    
    // --- Carousel Functionality (if on homepage) ---
    // if (document.getElementById('hero-carousel')) {
    //     let slideIndex = 1;
    //     showSlides(slideIndex);
    //     window.plusSlides = n => showSlides(slideIndex += n);
    //     window.currentSlide = n => showSlides(slideIndex = n);
        
    //     function showSlides(n) {
    //         let slides = document.getElementsByClassName("carousel-slide");
    //         let dots = document.getElementsByClassName("carousel-dot");
    //         if (slides.length === 0) return;
    //         if (n > slides.length) { slideIndex = 1 }
    //         if (n < 1) { slideIndex = slides.length }
    //         for (let i = 0; i < slides.length; i++) {
    //             slides[i].style.opacity = "0";
    //         }
    //         for (let i = 0; i < dots.length; i++) {
    //             dots[i].classList.remove("bg-opacity-100");
    //             dots[i].classList.add("bg-opacity-50");
    //         }
    //         slides[slideIndex - 1].style.opacity = "1";
    //         dots[slideIndex - 1].classList.add("bg-opacity-100");
    //     }
    //     setInterval(() => plusSlides(1), 3000);
    // }
    if (document.getElementById('hero-carousel')) {
        let slideIndex = 0; // Start at 0 for easier array indexing
        const slides = document.getElementsByClassName("carousel-slide");
        
        function showSlides() {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[i].style.opacity = "0";
            }

            // Increment index and loop back to 0 if at the end
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            // Show the current slide
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].classList.add('active');
                slides[slideIndex - 1].style.opacity = "1";
            }
        }
        
        // Initial call to show the first slide
        if (slides.length > 0) {
            showSlides(); 
            // Set the interval to change slides every 5 seconds (5000 ms)
            setInterval(showSlides, 4000);
        }
    }
});