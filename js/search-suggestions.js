/**
 * Enhanced search functionality for Doomsday: Last Survivors
 * Provides real-time search suggestions and improved search results
 */

// Create search suggestions dropdown
function createSearchSuggestionsDropdown() {
    // Check if dropdown already exists
    if (document.getElementById('search-suggestions')) {
        return document.getElementById('search-suggestions');
    }
    
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.id = 'search-suggestions';
    dropdown.className = 'search-suggestions';
    dropdown.style.display = 'none';
    
    // Insert after search bar
    const searchBar = document.querySelector('.search-bar');
    searchBar.parentNode.insertBefore(dropdown, searchBar.nextSibling);
    
    return dropdown;
}

// Display search suggestions
function showSearchSuggestions(query) {
    const dropdown = createSearchSuggestionsDropdown();
    
    if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
    }
    
    // Get search suggestions
    const suggestions = getSearchSuggestions(query);
    
    if (suggestions.length > 0) {
        dropdown.innerHTML = suggestions.map(suggestion => {
            let displayText, category;
            
            if (typeof suggestion === 'object') {
                displayText = suggestion.name;
                category = suggestion.rarity ? 'Héros' : (suggestion.type || 'Contenu');
            } else {
                displayText = suggestion;
                
                // Try to determine category based on content
                if (suggestion.includes('Mise à Jour') || suggestion.includes('Événement')) {
                    category = 'Actualités';
                } else if (suggestion.includes('Stratégie') || suggestion.includes('Guide')) {
                    category = 'Guides';
                } else if (suggestion.includes('Centre') || suggestion.includes('Caserne')) {
                    category = 'Bâtiments';
                } else {
                    category = 'Contenu';
                }
            }
            
            return `<div class="suggestion-item" onclick="selectSuggestion('${displayText}')">
                <span class="suggestion-text">${displayText}</span>
                <span class="suggestion-category">${category}</span>
            </div>`;
        }).join('');
        
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Get search suggestions based on query
function getSearchSuggestions(query) {
    query = query.toLowerCase();
    
    // Get all content to search through
    const allContent = getAllSearchableContent();
    
    // Filter content that matches query
    return allContent.filter(item => {
        if (typeof item === 'object') {
            return item.name.toLowerCase().includes(query) ||
                (item.rarity && item.rarity.toLowerCase().includes(query)) ||
                (item.specialization && item.specialization.some(spec => spec.toLowerCase().includes(query)));
        } else {
            return item.toLowerCase().includes(query);
        }
    }).slice(0, 5); // Limit to 5 suggestions
}

// Get all searchable content
function getAllSearchableContent() {
    // Heroes data
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

    // Guides data
    const guides = [
        "Prise en Main - Comment Démarrer",
        "Optimisation de Base",
        "Stratégies PvP Avancées",
        "Guide des Ressources",
        "Développement de Héros",
        "Stratégies d'Alliance"
    ];

    // News data
    const news = [
        "Nouvelle Mise à Jour 1.5",
        "Événement Spécial Zombies",
        "Tournoi PvP Saisonnier",
        "Bonus de Connexion Quotidiens"
    ];

    // Buildings data
    const buildings = [
        "Caserne",
        "Centre de Recherche",
        "Centre de Commandement",
        "Mur de Défense",
        "Tour de Guet",
        "Entrepôt"
    ];

    return [...heroes, ...guides, ...news, ...buildings];
}

// Select a suggestion from dropdown
function selectSuggestion(text) {
    document.querySelector('.search-bar').value = text;
    document.getElementById('search-suggestions').style.display = 'none';
    globalSearch(text);
}

// Improved global search function (to replace the one in main.js)
function enhancedGlobalSearch(query) {
    // Show suggestions in real-time
    showSearchSuggestions(query);
    
    // Only redirect if Enter key is pressed or suggestion is clicked
    // Redirect happens in the event handler or selectSuggestion function
}