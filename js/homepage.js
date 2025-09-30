// js/homepage.js - MODIFIED to wait for includes

function initializeHomepage() {
    const logos = [
                { src: '../assets/images/anjomansenfi.webp', alt: 'وزارت نفت', text: 'وزارت نفت' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'انجمن صنفی تابلوسازان', text: 'انجمن صنفی تابلوسازان' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'Type Test', text: 'Type Test' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'ISO 9001:2008', text: 'ISO 9001:2008' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'وزارت نفت', text: 'وزارت نفت' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'انجمن صنفی تابلوسازان', text: 'انجمن صنفی تابلوسازان' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'Type Test', text: 'Type Test' },
                { src: '../assets/images/anjomansenfi.webp', alt: 'ISO 9001:2008', text: 'ISO 9001:2008' }
            ];

            const slider = document.getElementById('cert-slider');
            const track = document.getElementById('cert-track');

            if (slider && track) {
                // Create the HTML for each logo item
                const logoHtml = logos.map(logo => `
                    <div class="flex-shrink-0 w-1/2 md:w-1/4 px-4 text-center">
                        <div class="flex justify-center items-center h-64 mb-3">
                            <img src="${logo.src}" alt="${logo.alt}" class="max-h-full w-auto object-contain">
                        </div>
                        <p class="text-sm font-sans font-semibold text-secondary-700">${logo.text}</p>
                    </div>
                `).join('');

                // Duplicate the logos to create a seamless loop
                track.innerHTML = logoHtml + logoHtml;

                // Apply the animation class
                track.classList.add('cert-animate');

                // Pause animation on hover
                slider.addEventListener('mouseenter', () => {
                    track.style.animationPlayState = 'paused';
                });

                // Resume animation on mouse leave
                slider.addEventListener('mouseleave', () => {
                    track.style.animationPlayState = 'running';
                });
            }
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

    // --- FADING Carousel Functionality ---
    if (document.getElementById('hero-carousel')) {
        let slideIndex = 0; // Start at 0 for easier array indexing
        const slides = document.getElementsByClassName("carousel-slide");
        
        function showSlides() {
            if (slides.length === 0) return;
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
            setInterval(showSlides, 3000);
        }
    }
}

// This is the conditional loader.
if (typeof loadIncludes === 'function') {
    // If includes.js exists, wait for it to finish before running the homepage scripts.
    document.addEventListener('all-includes-loaded', initializeHomepage);
} else {
    // Otherwise, run the scripts after the initial HTML has loaded.
    document.addEventListener('DOMContentLoaded', initializeHomepage);
}