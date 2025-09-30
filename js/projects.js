// js/project-portfolio.js - Only for the project portfolio page

document.addEventListener("DOMContentLoaded", function() {

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
    // --- Filter Logic ---
    // (If you add filter functionality, the code would go here)
});