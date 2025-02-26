/**
 * Enhanced search results functionality for Doomsday: Last Survivors
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        const results = searchAllContent(decodeURIComponent(query));
        displayResults(results);
    } else {
        document.getElementById('search-results').innerHTML = '<p>Aucune recherche spécifiée.</p>';
    }
});

function searchAllContent(query) {
    // Use the getAllSearchableContent function from search-suggestions.js if available
    let allContent = [];
    
    if (typeof getAllSearchableContent === 'function') {
        allContent = getAllSearchableContent();
    } else {
        // Fallback to the data in this file (same as search-suggestions.js)
        const heroes = [
            { name: "Bodala", rarity: "Légendaire", specialization: ["Infantry", "General", "Skills"] },
            { name: "Stella", rarity: "Légendaire", specialization: ["Infantry", "Siege", "Skills"] },
            { name: "Felix", rarity: "Légendaire", specialization: ["Rider", "General", "Skills"] },
            { name: "Lynne", rarity: "Légendaire", specialization: ["Infantry", "Siege", "Defense"] },
            { name: "Bard", rarity: "Légendaire", specialization: ["Infantry", "Support", "Skills"] },
            { name: "Adut", rarity: "Légendaire", specialization: ["Rider", "General", "Attack"] },
            { name: "Jaden", rarity: "Légendaire", specialization: ["Infantry", "Siege", "Skills"] },
            { name: "Peggy", rarity: "Elite", specialization: ["Support", "Gathering", "Skills"] },
            { name: "Louis", rarity: "Légendaire", specialization: ["Infantry", "General", "Defense"] }
        ];

        const guides = [
            "Prise en Main - Comment Démarrer",
            "Optimisation de Base",
            "Stratégies PvP Avancées",
            "Guide des Ressources",
            "Développement de Héros",
            "Stratégies d'Alliance"
        ];

        const news = [
            "Nouvelle Mise à Jour 1.5",
            "Événement Spécial Zombies",
            "Tournoi PvP Saisonnier",
            "Bonus de Connexion Quotidiens"
        ];

        const buildings = [
            "Caserne",
            "Centre de Recherche",
            "Centre de Commandement",
            "Mur de Défense",
            "Tour de Guet",
            "Entrepôt"
        ];

        allContent = [...heroes, ...guides, ...news, ...buildings];
    }

    return allContent.filter(item => {
        if (typeof item === 'object') {
            return item.name.toLowerCase().includes(query.toLowerCase()) || 
                item.rarity.toLowerCase().includes(query.toLowerCase()) || 
                item.specialization.some(spec => spec.toLowerCase().includes(query.toLowerCase()));
        } else {
            return item.toLowerCase().includes(query.toLowerCase());
        }
    });
}

function displayResults(results) {
    const container = document.getElementById('search-results');
    const query = new URLSearchParams(window.location.search).get('query');
    
    // Clear container first
    container.innerHTML = '';
    
    if (results.length > 0) {
        // Add filters
        const filters = document.createElement('div');
        filters.className = 'search-filters';
        filters.innerHTML = `
            <button class="search-filter-btn active" data-filter="all">Tous (${results.length})</button>
            <button class="search-filter-btn" data-filter="hero">Héros</button>
            <button class="search-filter-btn" data-filter="guide">Guides</button>
            <button class="search-filter-btn" data-filter="news">Actualités</button>
            <button class="search-filter-btn" data-filter="building">Bâtiments</button>
        `;
        container.appendChild(filters);
        
        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results-container';
        
        // Generate results HTML
        resultsContainer.innerHTML = results.map(result => {
            if (typeof result === 'object') {
                // Hero result
                return `<div class="search-result" data-type="hero">
                    <span class="search-result-category">Héros</span>
                    <h3>${result.name}</h3>
                    <p>Rareté: ${result.rarity}</p>
                    <p>Spécialisation: ${result.specialization.join(', ')}</p>
                    <a href="/dls/pages/heroes.html#${result.name.toLowerCase()}" class="view-more">Voir détails <i class="fas fa-arrow-right"></i></a>
                </div>`;
            } else {
                // Determine result type
                let type = 'content';
                let category = 'Contenu';
                
                if (result.includes('Mise à Jour') || result.includes('Événement')) {
                    type = 'news';
                    category = 'Actualités';
                } else if (result.includes('Stratégie') || result.includes('Guide') || result.includes('Prise en Main')) {
                    type = 'guide';
                    category = 'Guides';
                } else if (result.includes('Centre') || result.includes('Caserne')) {
                    type = 'building';
                    category = 'Bâtiments';
                }
                
                return `<div class="search-result" data-type="${type}">
                    <span class="search-result-category">${category}</span>
                    <h3>${result}</h3>
                    <p>${highlightQuery(result, query)}</p>
                    <a href="/dls/pages/${type === 'news' ? 'news' : 
                                    type === 'guide' ? 'guides' : 
                                    type === 'building' ? 'buildings' : 'index'}.html" class="view-more">
                        Voir plus <i class="fas fa-arrow-right"></i>
                    </a>
                </div>`;
            }
        }).join('');
        
        container.appendChild(resultsContainer);
        
        // Add filter functionality
        setupFilterListeners();
    } else {
        container.innerHTML = `<div class="no-results">
            <i class="fas fa-search" style="font-size: 3rem; opacity: 0.5; margin-bottom: 1rem;"></i>
            <p>Aucun résultat trouvé pour <strong>"${query}"</strong></p>
            <p>Essayez un autre terme ou vérifiez l'orthographe.</p>
        </div>`;
    }
}

// Highlight query terms in the text
function highlightQuery(text, query) {
    if (!query) return text;
    
    // Escape special characters in the query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Set up filter button listeners
function setupFilterListeners() {
    document.querySelectorAll('.search-filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.search-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter results
            const filter = button.getAttribute('data-filter');
            const results = document.querySelectorAll('.search-result');
            
            results.forEach(result => {
                if (filter === 'all') {
                    result.style.display = 'block';
                } else {
                    result.style.display = result.getAttribute('data-type') === filter ? 'block' : 'none';
                }
            });
        });
    });
}