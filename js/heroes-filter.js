const heroes = [
    { name: "Bodala", rarity: "Légendaire", specialization: ["Infantry", "General", "Skills"] },
    { name: "Stella", rarity: "Rare", specialization: ["Infantry", "Siege", "Skills"] },
    { name: "Felix", rarity: "Commun", specialization: ["Rider", "General", "Skills"] },
    // Ajoutez les autres héros à partir des données OCR
];

function renderHeroes(heroesToRender) {
    const container = document.getElementById('heroContainer');
    container.innerHTML = heroesToRender.map(hero => `
        <div class="hero-card">
            <h3>${hero.name}</h3>
            <p>Rareté: ${hero.rarity}</p>
            <p>Spécialisation: ${hero.specialization.join(", ")}</p>
            <a href="pages/heroes.html#${hero.name.toLowerCase()}-detail">Détails</a>
        </div>
    `).join('');
}

function filterHeroes() {
    const rarity = document.getElementById('rarityFilter').value;
    const filtered = rarity === 'all' ? heroes : heroes.filter(h => h.rarity === rarity);
    renderHeroes(filtered);
}

function filterHeroesBySearch(query) {
    const filtered = heroes.filter(hero => 
        hero.name.toLowerCase().includes(query.toLowerCase()) || 
        hero.rarity.toLowerCase().includes(query.toLowerCase()) || 
        hero.specialization.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
    );
    renderHeroes(filtered || heroes); // Afficher tous les héros si aucun résultat
    if (filtered.length === 0) {
        const container = document.getElementById('heroContainer');
        container.innerHTML = `<p>Aucun héros trouvé pour "${query}". Essayez un autre terme.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        filterHeroesBySearch(decodeURIComponent(searchQuery));
    } else {
        renderHeroes(heroes);
    }

    document.getElementById('rarityFilter').addEventListener('change', filterHeroes);
});
