function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('active');
    content.classList.toggle('shifted');
}

// Fonction de recherche globale sur tout le site
function globalSearch(query) {
    if (query.length > 2) { // Rechercher après 3 caractères
        window.location.href = 'pages/search-results.html?query=' + encodeURIComponent(query);
    }
}

// Rétracter le panneau latéral en fonction de la position de la souris
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    sidebar.addEventListener('mouseleave', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            content.classList.remove('shifted');
        }
    });

    sidebar.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('active')) {
            sidebar.classList.add('active');
            content.classList.add('shifted');
        }
    });
});
