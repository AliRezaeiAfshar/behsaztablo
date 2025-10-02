// js/news-template.js - Dynamic news article loader

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        showError();
        return;
    }

    loadArticle(articleId);

    async function loadArticle(id) {
        try {
            // Show loading state
            showLoading();
            console.log(`Loading article with ID: ${id}`);

            // Load article data
            const response = await fetch(`../data/articles/${id}.json`);
            if (!response.ok) {
                throw new Error('Article not found');
            }

            const article = await response.json();
            
            // Populate the template with article data
            populateTemplate(article);
            
            // Hide loading and show content
            hideLoading();
            
        } catch (error) {
            console.error('Error loading article:', error);
            showError();
        }
    }

    function populateTemplate(article) {
        // Update page title and meta
        document.title = `${article.title} - ElectroPanel Pro`;
        document.getElementById('page-title').textContent = `${article.title} - ElectroPanel Pro`;
        document.getElementById('page-description').setAttribute('content', article.excerpt);
        document.getElementById('canonical-url').setAttribute('href', `${window.location.origin}${window.location.pathname}?id=${article.id}`);

        // Update article content
        document.getElementById('article-category').textContent = article.category;
        document.getElementById('article-date').textContent = article.date;
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-excerpt').textContent = article.excerpt;
        
        // Update featured image
        const articleImage = document.getElementById('article-image');
        articleImage.src = article.featuredImage;
        articleImage.alt = article.title;

        // Update article body - sanitize HTML to prevent XSS
        const articleBodyEl = document.getElementById('article-body');
        if (window.DOMPurify && typeof DOMPurify.sanitize === 'function') {
            articleBodyEl.innerHTML = DOMPurify.sanitize(article.content);
        } else {
            // If DOMPurify isn't available, fall back to textContent to avoid executing HTML
            console.warn('DOMPurify not found - inserting article content as text to avoid XSS');
            articleBodyEl.textContent = article.content.replace(/\s+/g, ' ');
        }

        // Update tags
        const tagsContainer = document.getElementById('tags-container');
        tagsContainer.innerHTML = '';
        article.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });

        // Load related articles if they exist
        if (article.relatedArticles && article.relatedArticles.length > 0) {
            loadRelatedArticles(article.relatedArticles);
        } else {
            document.getElementById('related-articles').style.display = 'none';
        }
    }

    async function loadRelatedArticles(relatedIds) {
        const container = document.getElementById('related-articles-container');
        container.innerHTML = '';

        for (const relatedId of relatedIds.slice(0, 2)) { // Show max 2 related articles
            try {
                const response = await fetch(`../data/articles/${relatedId}.json`);
                if (response.ok) {
                    const relatedArticle = await response.json();
                    const articleCard = createRelatedArticleCard(relatedArticle);
                    container.appendChild(articleCard);
                }
            } catch (error) {
                console.error('Error loading related article:', error);
            }
        }
    }

    function createRelatedArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'card-elevated group hover:shadow-industrial transition-all';
        card.innerHTML = `
            <div class="relative overflow-hidden rounded-lg mb-4">
                <img src="${article.featuredImage}" alt="${article.title}" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-sans font-semibold">${article.category}</div>
            </div>
            <p class="text-sm text-secondary-500 mb-2">${article.date}</p>
            <h3 class="text-lg font-sans font-bold text-primary mb-2">${article.title}</h3>
            <p class="text-secondary-600 text-sm mb-4">${article.excerpt}</p>
            <a href="news-template.html?id=${article.id}" class="text-primary font-sans font-semibold hover:text-accent transition-colors text-sm">ادامه مطلب →</a>
        `;
        return card;
    }

    function showLoading() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('article-content').classList.add('hidden');
        document.getElementById('error-state').classList.add('hidden');
    }

    function hideLoading() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('article-content').classList.remove('hidden');
        document.getElementById('error-state').classList.add('hidden');
    }

    function showError() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('article-content').classList.add('hidden');
        document.getElementById('error-state').classList.remove('hidden');
    }
});