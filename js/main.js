// js/main.js - Final Version

document.addEventListener("DOMContentLoaded", function() {
    const pdfModal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        // How many projects to show at a time
        const projectsPerLoad = 3; 

        // Find all initially hidden projects
        let hiddenProjects = document.querySelectorAll('.hidden-project');
        let projectsShown = 0;

        const loadMoreProjects = () => {
            for (let i = 0; i < projectsPerLoad; i++) {
                const projectIndex = projectsShown + i;
                if (hiddenProjects[projectIndex]) {
                    hiddenProjects[projectIndex].classList.remove('hidden');
                }
            }
            projectsShown += projectsPerLoad;

            // Hide the button if no more projects are hidden
            if (projectsShown >= hiddenProjects.length) {
                loadMoreBtn.style.display = 'none';
            }
        };

        // Attach the function to the button's click event
        loadMoreBtn.addEventListener('click', loadMoreProjects);
        
        // Initially hide button if there are no hidden projects
        if (hiddenProjects.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    }

    window.openPdfModal = function(pdfSrc) {
        if (pdfModal && pdfViewer) {
            pdfViewer.src = pdfSrc;
            pdfModal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    window.closePdfModal = function(event) {
        // This condition allows closing by clicking the background overlay
        if (event && event.target !== pdfModal) {
            return;
        }
        if (pdfModal) {
            pdfModal.classList.remove('modal-open');
            pdfViewer.src = ''; // Clear the src to stop the PDF from loading in the background
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    // --- Image Modal Functionality ---
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerButton = document.getElementById('hamburger-button');

    window.openImageModal = function(imageSrc) {
        if (modal && modalImage) {
            modalImage.src = imageSrc;
            modal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
     window.toggleMobileMenu = function() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('menu-open');
            mobileMenu.classList.toggle('hidden');
        }
    };

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
    
    document.addEventListener('click', function(event) {
        // Check if the menu exists, is open, and the click was outside both the menu and the button
        if (mobileMenu && mobileMenu.classList.contains('menu-open')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnHamburger = hamburgerButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnHamburger) {
                mobileMenu.classList.remove('menu-open'); // Close the menu
            }
        }
    });


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
            setInterval(showSlides, 3000);
        }
    }
});