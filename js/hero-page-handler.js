// Handle the hero page dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Get the hero parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const heroName = urlParams.get('hero');
    
    if (heroName) {
        // Set the hero image by replacing the %HERO_IMG% placeholder
        const imgElement = document.querySelector('.hero-image-container img');
        if (imgElement) {
            // Use .webp images directly
            const imageUrl = `/dls/images/heroes/${heroName}.webp`;
            imgElement.src = imageUrl;
            imgElement.alt = `${heroName} Image`;
            
            // Handle image loading error
            imgElement.onerror = function() {
                imgElement.src = '/dls/images/placeholder-hero.jpg';
                console.error(`Could not load image for hero: ${heroName}`);
            };
        }
        
        // Update document title
        document.title = `${heroName.charAt(0).toUpperCase() + heroName.slice(1)} - Doomsday: Last Survivors`;
        
        // Replace other placeholders if needed
        const heroNameElements = document.querySelectorAll('h1, title');
        heroNameElements.forEach(el => {
            if (el.textContent.includes('%HERO_NAME%')) {
                el.textContent = el.textContent.replace('%HERO_NAME%', 
                    heroName.charAt(0).toUpperCase() + heroName.slice(1));
            }
        });
    }
});