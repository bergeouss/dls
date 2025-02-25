function searchGuides(query) {
    const guides = document.querySelectorAll('.guides-container ul li');
    guides.forEach(guide => {
        const text = guide.textContent.toLowerCase();
        guide.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}