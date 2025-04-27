document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const movieCards = document.querySelectorAll('.movie-card');
    const sections = document.querySelectorAll('.section');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // First reset all display states
        sections.forEach(section => {
            section.style.display = 'block'; // Show all sections initially
        });
        
        movieCards.forEach(card => {
            card.style.display = 'block'; // Show all cards initially
        });

        // If empty search, show everything
        if (searchTerm === '') {
            // Remove any existing no-results message
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
            return;
        }
        
        let hasResults = false;
        
        // Filter movies
        movieCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                // Show matching cards
                card.style.display = 'block';
                // Ensure parent section is visible
                card.closest('.section').style.display = 'block';
                hasResults = true;
            } else {
                // Hide non-matching cards
                card.style.display = 'none';
            }
        });
        
        // Hide sections that have no visible cards
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.movie-card[style="display: block;"]');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            }
        });
        
        // Show no results message if no matches found
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <h2>No results found for "${searchTerm}"</h2>
                <p>Try different keywords or check back later for new additions.</p>
            `;
            noResults.style.textAlign = 'center';
            noResults.style.padding = '50px';
            noResults.style.color = '#fff';
            
            const main = document.querySelector('main') || document.body;
            const existingNoResults = document.querySelector('.no-results');
            
            if (existingNoResults) {
                existingNoResults.replaceWith(noResults);
            } else {
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.insertAdjacentElement('afterend', noResults);
                } else {
                    document.body.prepend(noResults);
                }
            }
        } else {
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }
    
    // Search on button click
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Rest of your existing code...
    // Movie click tracking, ad handling, etc.
});