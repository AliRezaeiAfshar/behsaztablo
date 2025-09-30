// convert-to-includes.js - Helper script to convert existing pages to use includes

/**
 * This script helps convert existing HTML pages to use the include system
 * Run in browser console on any page to see what changes would be made
 */

function analyzePageForIncludes() {
    console.log('🔍 Analyzing page for include opportunities...\n');
    
    // Find header
    const header = document.querySelector('header');
    if (header) {
        console.log('✅ Found header element');
        console.log('   Length:', header.outerHTML.length, 'characters');
        console.log('   Suggestion: Move to includes/header.html');
        console.log('   Replace with: <div data-include="../includes/header.html"></div>\n');
    }
    
    // Find footer
    const footer = document.querySelector('footer');
    if (footer) {
        console.log('✅ Found footer element');
        console.log('   Length:', footer.outerHTML.length, 'characters');
        console.log('   Suggestion: Move to includes/footer.html');
        console.log('   Replace with: <div data-include="../includes/footer.html"></div>\n');
    }
    
    // Find navigation
    const nav = document.querySelector('nav');
    if (nav && !header?.contains(nav)) {
        console.log('✅ Found standalone navigation');
        console.log('   Suggestion: Consider moving to includes/navigation.html\n');
    }
    
    // Check for includes.js
    const includesScript = document.querySelector('script[src*="includes.js"]');
    if (includesScript) {
        console.log('✅ includes.js already loaded');
    } else {
        console.log('❌ includes.js not found');
        console.log('   Add: <script src="../js/includes.js"></script>\n');
    }
    
    // Check for existing data-include elements
    const existingIncludes = document.querySelectorAll('[data-include]');
    if (existingIncludes.length > 0) {
        console.log('✅ Found', existingIncludes.length, 'existing includes:');
        existingIncludes.forEach(el => {
            console.log('   -', el.getAttribute('data-include'));
        });
    }
    
    console.log('\n📋 Conversion Checklist:');
    console.log('□ Create includes/header.html');
    console.log('□ Create includes/footer.html');
    console.log('□ Add includes.js script');
    console.log('□ Replace header/footer HTML with data-include divs');
    console.log('□ Test with local server');
}

// Auto-run analysis
analyzePageForIncludes();