// js/includes.js - HTML Include System

document.addEventListener("DOMContentLoaded", function() {
    loadIncludes();
});

async function loadIncludes() {
    // Find all elements with data-include attribute
    const includeElements = document.querySelectorAll('[data-include]');
    
    // Load each include
    for (const element of includeElements) {
        const includePath = element.getAttribute('data-include');
        
        try {
            const response = await fetch(includePath);
            
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
                
                // Trigger custom event for post-include processing
                element.dispatchEvent(new CustomEvent('include-loaded', {
                    detail: { path: includePath }
                }));
            } else {
                console.error(`Failed to load include: ${includePath}`);
                element.innerHTML = `<!-- Include failed: ${includePath} -->`;
            }
        } catch (error) {
            console.error(`Error loading include ${includePath}:`, error);
            element.innerHTML = `<!-- Include error: ${includePath} -->`;
        }
    }
    
    // Dispatch event when all includes are loaded
    document.dispatchEvent(new CustomEvent('all-includes-loaded'));
}

// Helper function to manually load a specific include
window.loadInclude = function(selector, path) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute('data-include', path);
        fetch(path)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
                element.dispatchEvent(new CustomEvent('include-loaded', {
                    detail: { path: path }
                }));
            })
            .catch(error => {
                console.error(`Error loading include ${path}:`, error);
            });
    }
};