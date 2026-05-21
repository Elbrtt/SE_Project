import { games, deals } from './gameService.js';
import { ownedGames } from './ownedState.js';
import { renderGameCard } from '../components/gameCard.js';

// Render recommended games grid
export function renderRecommendedGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = games.map(game => {
            const isOwned = ownedGames.some(g => g.id === game.id);
            return renderGameCard(game, { isOwned, type: 'discover' });
        }).join('');
    }
}

// Render deal tracker grid
export function renderRecommendedDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    if (dealsGrid) {
        dealsGrid.innerHTML = deals.map(deal => {
            const isOwned = ownedGames.some(g => g.id === deal.id);
            return renderGameCard(deal, { 
                isOwned, 
                type: 'deal',
                discount: deal.discount,
                originalPrice: deal.originalPrice,
                discountPrice: deal.discountPrice
            });
        }).join('');
    }
}

// Update Featured Button State
export function updateFeaturedButtonState() {
    const featuredBtn = document.querySelector('.featured-actions .own-btn');
    if (featuredBtn) {
        const isOwned = ownedGames.some(g => g.id === 'featured-1');
        featuredBtn.textContent = isOwned ? 'OWNED' : 'Own Now';
    }
}

// Render owned games in library
export function renderLibraryGames() {
    const ownedGamesContainer = document.getElementById('ownedGames');
    const emptyLibrary = document.getElementById('emptyLibrary');
    
    if (!ownedGamesContainer) return;
    
    if (ownedGames.length === 0) {
        ownedGamesContainer.innerHTML = '';
        if (emptyLibrary) emptyLibrary.classList.remove('hidden');
        return;
    }
    
    if (emptyLibrary) emptyLibrary.classList.add('hidden');
    
    // Masih di hardcode untuk id feature-1, fix
    ownedGamesContainer.innerHTML = ownedGames.map(ownedGame => {
        const gameData = games.find(g => g.id === ownedGame.id) || {
            id: "featured-1",
            title: 'Dota 2',
            category: "Action RTS",
            image: '../assets/games/images/dota_2/header.jpg'
        } || {
            id: ownedGame.id,
            title: 'Unknown Game',
            image: '../assets/games/images/dota_2/header.jpg'
        };

        const state = window.ownedState.getGameStatus(ownedGame.id);
        const status = state ? state.status : 'ready';
        const progress = state ? state.progress : 0;
        
        return renderGameCard(gameData, { 
            type: 'library',
            status: status,
            progress: progress
        });
    }).join('');
}
