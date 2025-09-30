// js/core.js - MODIFIED to wait for includes

function initializeCore() {
    // All of your original core.js code is now inside this function.
    
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerButton = document.getElementById('hamburger-button');

    // --- Mobile Menu Toggle (with animation) ---
    window.toggleMobileMenu = function() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('menu-open');
        }
    };

    // --- Click Outside to Close Mobile Menu ---
    document.addEventListener('click', function(event) {
        // This check is safe because mobileMenu and hamburgerButton will be null if the header isn't loaded yet.
        if (mobileMenu && mobileMenu.classList.contains('menu-open')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnHamburger = hamburgerButton && hamburgerButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnHamburger) {
                mobileMenu.classList.remove('menu-open');
            }
        }
    });

    // --- Glass Navbar on Scroll ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('bg-white/75', 'backdrop-blur-lg', 'border-b', 'border-gray-200');
                header.classList.remove('shadow-card');
            } else {
                header.classList.remove('bg-white/75', 'backdrop-blur-lg', 'border-b', 'border-gray-200');
                header.classList.add('shadow-card');
            }
        });
    }

    // --- Active Navigation Link ---
    const currentPageFile = window.location.pathname.split('/').pop() || 'homepage.html';
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
}

// This is the conditional loader.
// It checks if the `loadIncludes` function from includes.js exists.
if (typeof loadIncludes === 'function') {
    // If it exists, wait for the custom 'all-includes-loaded' event to run our code.
    document.addEventListener('all-includes-loaded', initializeCore);
} else {
    // If it doesn't exist, fall back to the standard DOMContentLoaded event.
    document.addEventListener('DOMContentLoaded', initializeCore);
}