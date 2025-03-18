/**
 * This function toggles the visibility of the sidebar menu.
 * It adds or removes the 'active' class to the sidebar and 'shifted' to content.
 */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar'); // Get the sidebar element.
    const content = document.querySelector('.content'); // Use the original content selector

    // Check if both elements exist before trying to modify them.
    if (sidebar && content) {
        sidebar.classList.toggle('active'); // Toggle 'active' class on the sidebar.
        content.classList.toggle('shifted'); // Toggle 'shifted' class on the content.
    }
}

/**
 * This function performs a global search based on the provided query.
 * It redirects to a search results page with the query as a parameter.
 * @param {string} query - The search query string.
 */
function globalSearch(query) {
    // Show suggestions as user types
    if (window.showSearchSuggestions) {
        showSearchSuggestions(query);
    }
    
    // Only redirect to search page if user presses Enter or if function was called from suggestion click
    if (window.event && window.event.key === 'Enter' && query.length >= 2) {
        window.location.href = '/dls/pages/search-results.html?query=' + encodeURIComponent(query);
    } else if (!window.event && query.length >= 2) {
        // This case handles when function is called directly from suggestion click
        window.location.href = '/dls/pages/search-results.html?query=' + encodeURIComponent(query);
    }
}
/** Event listener to toggle sidebar with "hamburger"
*/
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', toggleMenu);
    
    // Auto-retract sidebar based on mouse position
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.content');
    
    if (sidebar && mainContent) {
        let sidebarTimer;
        
        // Detect when mouse leaves the sidebar area
        document.addEventListener('mousemove', (e) => {
            // Only proceed if sidebar is active
            if (sidebar.classList.contains('active')) {
                // Get exact sidebar boundaries
                const sidebarRect = sidebar.getBoundingClientRect();
                
                // Check if mouse is outside the sidebar area
                if (e.clientX > sidebarRect.right) {
                    // Set a timer to close the sidebar after a short delay
                    clearTimeout(sidebarTimer);
                    sidebarTimer = setTimeout(() => {
                        sidebar.classList.remove('active');
                        if (mainContent) mainContent.classList.remove('shifted');
                    }, 300); // 300ms delay before closing for more responsive feel
                } else {
                    // Cancel the timer if mouse moves back to sidebar area
                    clearTimeout(sidebarTimer);
                }
            }
        });
        
        // Keep sidebar open when hovering over it
        sidebar.addEventListener('mouseenter', () => {
            clearTimeout(sidebarTimer);
        });
    }
});

// Retract the sidebar based on mouse position (not used anymore, see comments below).
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar'); // Get the sidebar element.
    const content = document.querySelector('.content'); // Get the content element.
    // we don't use this feature in the new html so this part of the code is useless
    /*
    sidebar.addEventListener('mouseleave', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    sidebar.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('active')) {
            sidebar.classList.add('active');
            content.classList.add('shifted');

        }
    });*/

});

// Initialize Swiper.js for the hero carousel
document.addEventListener('DOMContentLoaded', () => {
    // Hero data array
    const heroesData = [
        { id: 'bodala', name: 'Bodala', rarity: 'Légendaire' },
        { id: 'stella', name: 'Stella', rarity: 'Légendaire' },
        { id: 'felix', name: 'Felix', rarity: 'Légendaire' },
        { id: 'lynne', name: 'Lynne', rarity: 'Légendaire' },
        { id: 'bard', name: 'Bard', rarity: 'Légendaire' },
        { id: 'adut', name: 'Adut', rarity: 'Légendaire' },
        { id: 'jaden', name: 'Jaden', rarity: 'Légendaire' },
        { id: 'peggy', name: 'Peggy', rarity: 'Elite' },
        { id: 'louis', name: 'Louis', rarity: 'Légendaire' }
    ];
    
    // Get the swiper wrapper element
    const swiperWrapper = document.querySelector('.hero-carousel .swiper-wrapper');
    
    // Generate slides dynamically
    if (swiperWrapper) {
        // Clear any existing slides
        swiperWrapper.innerHTML = '';
        
        // Create slides from the data array
        heroesData.forEach(hero => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            
            slide.innerHTML = `
                <a href="/dls/pages/hero.html?hero=${hero.id}">
                    <img src="/dls/images/heroes/${hero.id}.webp" alt="${hero.name}" loading="lazy" class="carousel-image">
                    <p class="carousel-caption">${hero.name} - ${hero.rarity}</p>
                </a>
            `;
            
            swiperWrapper.appendChild(slide);
        });
    }

    const swiper = new Swiper('.hero-carousel', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
        }
    });
});
