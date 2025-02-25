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
    // Simuler une recherche sur tout le contenu (héros, guides, actualités, bâtiments, commentaires)
    const heroes = [
        { name: "Bodala", rarity: "Légendaire", specialization: ["Infantry", "General", "Skills"] },
        { name: "Stella", rarity: "Rare", specialization: ["Infantry", "Siege", "Skills"] },
        { name: "Felix", rarity: "Commun", specialization: ["Rider", "General", "Skills"] },
        // Ajoutez les autres héros à partir des données OCR
    ];

    const guides = [
        "Prise en Main - Comment Démarrer",
        "Optimisation de Base",
        "Stratégies PvP Avancées",
        // Ajoutez les autres guides
    ];

    const news = [
        "Nouvelle Mise à Jour 1.5",
        "Événement Spécial Zombies",
        // Ajoutez les autres actualités
    ];

    const buildings = [
        "Caserne",
        "Centre de Recherche",
        // Ajoutez les autres bâtiments
    ];

    const allContent = [...heroes, ...guides, ...news, ...buildings];
    return allContent.filter(item => 
        typeof item === 'object' ? 
            item.name.toLowerCase().includes(query.toLowerCase()) || 
            item.rarity.toLowerCase().includes(query.toLowerCase()) || 
            item.specialization.some(spec => spec.toLowerCase().includes(query.toLowerCase())) :
        item.toLowerCase().includes(query.toLowerCase())
    );
}

function displayResults(results) {
    const container = document.getElementById('search-results');
    if (results.length > 0) {
        container.innerHTML = results.map(result => {
            if (typeof result === 'object') {
                return `<div class="search-result"><h3>${result.name}</h3><p>Rareté: ${result.rarity}, Spécialisation: ${result.specialization.join(", ")}</p><a href="/dls/pages/heroes.html#${result.name.toLowerCase()}">Voir plus</a></div>`;
            } else {
                return `<div class="search-result"><h3>${result}</h3><p>Résultat trouvé dans Guides, Actualités ou Bâtiments.</p><a href="#">Voir plus</a></div>`;
            }
        }).join('');
    } else {
        container.innerHTML = `<p>Aucun résultat trouvé pour "${query}". Essayez un autre terme.</p>`;
    }
}
