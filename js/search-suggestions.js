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
    const searchBar = document.querySelector('#header-search-bar');
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
    getSearchSuggestions(query).then(suggestions => {
        if (suggestions.length > 0) {
            dropdown.innerHTML = suggestions.map(suggestion => {
                let displayText, category;
                
                if (typeof suggestion === 'object') {
                    displayText = suggestion.name;
                    category = suggestion.category || 'Contenu';
                } else {
                    displayText = suggestion;
                    category = 'Contenu';
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
    });
}

// Get search suggestions based on query
async function getSearchSuggestions(query) {
    query = query.toLowerCase();
    
    // Get all content to search through
    const allContent = await getAllSearchableContent();
    
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
async function getAllSearchableContent() {
    const heroes = await fetch('/dls/data/heroes.json').then(res => res.json());
    const guides = await fetch('/dls/data/guides.json').then(res => res.json());
    const news = await fetch('/dls/data/news.json').then(res => res.json());
    const buildings = await fetch('/dls/data/buildings.json').then(res => res.json());

    return [...heroes, ...guides, ...news, ...buildings];
}

// Select a suggestion from dropdown
function selectSuggestion(text) {
    document.querySelector('.search-bar').value = text;
    document.getElementById('search-suggestions').style.display = 'none';
    globalSearch(text);
}

// Global search function
function globalSearch(query) {
    // Show suggestions in real-time
    showSearchSuggestions(query);
    
    // Only redirect if Enter key is pressed or suggestion is clicked
    // Redirect happens in the event handler or selectSuggestion function
}