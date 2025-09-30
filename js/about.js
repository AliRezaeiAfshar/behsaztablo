// js/about.js - Only for the about page

document.addEventListener("DOMContentLoaded", function() {
    
    // --- PDF Viewer Modal Functionality ---
    const pdfModal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');

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
});