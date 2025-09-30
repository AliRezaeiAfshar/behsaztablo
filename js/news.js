// js/news.js - For pages with news/blog functionality

// Wrap initialization into a named function so event wiring can reference it
function initializeNews() {
    // --- News Pagination Functionality ---
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        const itemsPerPage = 3; // How many items to show on each page
        const allItems = Array.from(newsGrid.getElementsByClassName('news-item'));
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        const paginationControls = document.getElementById('pagination-controls');
        let currentPage = 1;

        function showPage(pageNumber) {
            currentPage = pageNumber;
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Hide all items first
            allItems.forEach(item => item.classList.add('hidden'));
            
            // Show only the items for the current page
            const itemsToShow = allItems.slice(startIndex, endIndex);
            itemsToShow.forEach(item => item.classList.remove('hidden'));

            updatePaginationButtons();
        }

        function updatePaginationButtons() {
            if (!paginationControls) return;
            paginationControls.innerHTML = ''; // Clear existing buttons

            // Create Previous button
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '&lsaquo;'; // Left arrow
            prevButton.className = 'pagination-btn';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => showPage(currentPage - 1));
            paginationControls.appendChild(prevButton);

            // Create Page Number buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                pageButton.className = 'pagination-btn';
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => showPage(i));
                paginationControls.appendChild(pageButton);
            }

            // Create Next button
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '&rsaquo;'; // Right arrow
            nextButton.className = 'pagination-btn';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => showPage(currentPage + 1));
            paginationControls.appendChild(nextButton);
        }

        // Initial setup
        if (allItems.length > itemsPerPage) {
            showPage(1);
        }
    }

    // --- Marquee functionality for partner/brand logos ---
    const marqueeContent = document.querySelector("ul.marquee-content");
    if (marqueeContent) {
        const root = document.documentElement;
        const marqueeElementsDisplayed = parseInt(getComputedStyle(root).getPropertyValue("--marquee-elements-displayed") || 0);
        const originalItemsCount = marqueeContent.children.length;
        
        // Set the CSS variables needed for animation calculations
        root.style.setProperty("--marquee-elements", originalItemsCount * 2);
        root.style.setProperty("--marquee-original-elements", originalItemsCount);
        
        // Create array of original elements to avoid issues with live HTMLCollection
        const originalItems = Array.from(marqueeContent.children);
        
        // Clone all original items to create seamless loop
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeContent.appendChild(clone);
        });
        
        // Force a reflow to ensure CSS variables are applied
        marqueeContent.offsetHeight;
        
        // Ensure animation is running by adding a class
        marqueeContent.classList.add('marquee-active');
        
        // Double-check after a short delay
        setTimeout(() => {
            const computedDuration = getComputedStyle(marqueeContent).animationDuration;
            const computedName = getComputedStyle(marqueeContent).animationName;
            // If animation is not running, force it
            if (computedName === 'none' || computedDuration === '0s') {
                marqueeContent.style.animation = 'scrolling 15s linear infinite';
            }
        }, 100);
    }
}

// Wire initializer depending on include loader availability
if (typeof loadIncludes === 'function') {
    document.addEventListener('all-includes-loaded', initializeNews);
} else {
    document.addEventListener('DOMContentLoaded', initializeNews);
}