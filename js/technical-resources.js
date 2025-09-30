// js/technical-resources.js
// Small compatibility layer providing functions previously exposed by legacy main.js
// so pages (technical_resources.html) can call these helpers without ReferenceErrors.

(function () {
  // openCalculator(name) - opens a calculator modal or navigates to a calculator page
  window.openCalculator = function (calculatorId) {
    // If a dedicated calculator page exists, navigate there. Otherwise, open a lightweight modal.
    try {
      const page = `calculators/${calculatorId}.html`;
      // quick existence check could be done via fetch, but keep simple: navigate
      window.location.href = page;
    } catch (e) {
      console.error('openCalculator error', e);
    }
  };

  // downloadResource(key) - opens gated-download modal
  window.downloadResource = function (resourceId) {
    const modal = document.getElementById('download-modal');
    if (modal) {
      modal.classList.remove('hidden');
      // store requested id for processing
      modal.dataset.requestedResource = resourceId;
    } else {
      // fallback: navigate to resource direct link
      window.location.href = `../assets/resources/${resourceId}.zip`;
    }
  };

  window.downloadGatedResource = function (resourceId) {
    // alias for downloadResource
    window.downloadResource(resourceId);
  };

  window.downloadSpecSheet = function (id) { window.downloadResource(id); };
  window.downloadCADLibrary = function (id) { window.downloadResource(id); };

  // filterResources(category) - shows/hides sections
  window.filterResources = function (category) {
    const sections = document.querySelectorAll('.resource-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    if (category === 'all') {
      sections.forEach(sec => sec.classList.remove('hidden'));
      // reset active tab
    } else {
      const target = document.querySelector(`#${category}-section`);
      if (target) target.classList.remove('hidden');
    }
    // update active tab styles
    document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active', 'border-primary'));
    const activeBtn = Array.from(document.querySelectorAll('.filter-tab')).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(category));
    if (activeBtn) activeBtn.classList.add('active');
  };

  // playVideo(id) - opens inline video player modal or navigates to a video page
  window.playVideo = function (videoId) {
    // If there's a video modal on the page, populate it
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    if (videoModal && videoFrame) {
      // Example mapping; adjust per real ids
      const src = `/videos/${videoId}.mp4`;
      videoFrame.src = src;
      videoModal.classList.remove('hidden');
    } else {
      // fallback to a dedicated video page
      window.location.href = `videos.html?id=${videoId}`;
    }
  };

  // close download modal helper used in page
  window.closeDownloadModal = function () {
    const modal = document.getElementById('download-modal');
    if (modal) {
      modal.classList.add('hidden');
      delete modal.dataset.requestedResource;
    }
  };

  window.processDownload = function (ev) {
    ev && ev.preventDefault && ev.preventDefault();
    const modal = document.getElementById('download-modal');
    const requested = modal && modal.dataset.requestedResource;
    // simple simulated download: close modal and navigate to resource
    if (requested) {
      // In a real app you'd POST form data and return a secure URL
      window.location.href = `../assets/resources/${requested}.zip`;
    }
    window.closeDownloadModal();
  };

  // openChecklist exists on the technical resources page
  window.openChecklist = function () {
    // example: scroll to checklist or open modal
    const el = document.getElementById('checklist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

})();
