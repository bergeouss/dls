/**
 * This function toggles the visibility of the sidebar menu.
 * It adds or removes the 'active' class to the sidebar and 'shifted' to content.
 */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar'); // Get the sidebar element.
    const content = document.querySelector('.content'); // Get the content element.

    // Check if both elements exist before trying to modify them.
    if (sidebar && content) {
      sidebar.classList.toggle('active'); // Toggle 'active' class on the sidebar.
      content.classList.toggle('shifted'); // Toggle 'shifted' class on the content.
    }
    // we don't use shifted class anymore in the new html so this part of the code is useless
}

/**
 * This function performs a global search based on the provided query.
 * It redirects to a search results page with the query as a parameter.
 * @param {string} query - The search query string.
 */
function globalSearch(query) {
    if (query.length > 2) { // Search only if the query is at least 3 characters long.
        window.location.href = '/dls/pages/search-results.html?query=' + encodeURIComponent(query); // Redirect to search results page.
    }
}

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

    const swiper = new Swiper('.swiper', {
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
