// js/main.js

document.addEventListener("DOMContentLoaded", function() {
    // --- Mobile Menu Toggle ---
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    }

    // --- Active Navigation Link ---
    // Get the current page's filename (e.g., "homepage.html")
    const currentPageFile = window.location.pathname.split('/').pop();

    // Get all the links in the desktop and mobile navigation
    const desktopNavLinks = document.querySelectorAll('header nav .hidden.md\\:block a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    
    // Combine both lists of links
    const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];

    allNavLinks.forEach(link => {
        const linkFile = link.getAttribute('href').split('/').pop();

        // Check if the link's href matches the current page's file
        if (linkFile === currentPageFile) {
            // This is the active link
            link.classList.add('text-primary');
            link.classList.add('font-semibold'); // Add the active color
            link.classList.remove('text-secondary-600'); // Remove the inactive color
        } else {
            // This is an inactive link
            link.classList.remove('text-primary');
            link.classList.remove('font-semibold');
            link.classList.add('text-secondary-600');
        }
    });

    // --- Carousel Functionality (if it's on the page) ---
    if (document.getElementById('hero-carousel')) {
        let slideIndex = 1;
        showSlides(slideIndex);

        window.plusSlides = function(n) {
            showSlides(slideIndex += n);
        }

        window.currentSlide = function(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let slides = document.getElementsByClassName("carousel-slide");
            let dots = document.getElementsByClassName("carousel-dot");
            
            if (slides.length === 0) return; // Exit if no carousel on this page
            
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
                slides[i].style.opacity = "0";
            }
            
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("bg-white", "bg-opacity-100");
                dots[i].classList.add("bg-white", "bg-opacity-50");
            }
            
            slides[slideIndex-1].classList.add("active");
            slides[slideIndex-1].style.opacity = "1";
            dots[slideIndex-1].classList.remove("bg-opacity-50");
            dots[slideIndex-1].classList.add("bg-opacity-100");
        }

        setInterval(function() {
            plusSlides(1);
        }, 3000);
    }
});

// js/main.js

document.addEventListener("DOMContentLoaded", function() {

    // --- Toast Notification Function ---
    function showToast(message, isSuccess = true) {
        const toast = document.getElementById('toast-notification');
        const toastMessage = document.getElementById('toast-message');

        if (toast && toastMessage) {
            toastMessage.textContent = message;
            
            // Change color for success or error
            if (isSuccess) {
                toast.classList.remove('bg-error');
                toast.classList.add('bg-success-600');
            } else {
                toast.classList.remove('bg-success-600');
                toast.classList.add('bg-error');
            }

            toast.classList.add('toast-show');

            setTimeout(() => {
                toast.classList.remove('toast-show');
            }, 5000);
        }
    }

    // --- Netlify AJAX Form Submission ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default browser submission

            const formData = new FormData(quoteForm);
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                showToast("درخواست شما با موفقیت ارسال شد!");
                quoteForm.reset();
            })
            .catch((error) => {
                showToast("خطا در ارسال. لطفاً دوباره تلاش کنید.", false);
                console.error(error);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }

    // ... (rest of your main.js code for mobile menu, nav links, etc.) ...
});