import { renderButton } from '../components/ui/button.js';
import { renderCard } from '../components/ui/card.js';
import { tooltipProps } from '../components/ui/tooltip.js';

/**
 * Game Library Service - Handles rendering lists of games.
 */

function renderRecommendedGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;

    const games = window.gameService.getAllGames();
    gamesGrid.innerHTML = games.map(game => {
        const isOwned = window.ownedState.isOwned(game.id);
        return window.components.renderGameCard(game, isOwned);
    }).join('');
}

function renderDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    if (!dealsGrid) return;

    const games = window.gameService.getAllGames();
    const deals = games.filter(game => game.deals && game.deals.length > 0);

    dealsGrid.innerHTML = deals.map(game => {
        const bestDeal = game.deals[0];
        const oldPrice = (parseFloat(bestDeal.price) / (1 - bestDeal.discount / 100)).toFixed(2);
        
        return renderCard({
            title: game.title,
            image: game.image,
            content: `
                <div class="nb-badge nb-badge-danger">-${bestDeal.discount}%</div>
                <div class="deal-price-row">
                    <span class="old-price">$${oldPrice}</span>
                    <span class="new-price">$${bestDeal.price}</span>
                </div>
            `,
            extraClasses: 'deal-card',
            onClick: `window.navigationService.showPage('detail', '${game.id}')`
        });
    }).join('');
}

function renderLibraryGames() {
    const ownedGamesContainer = document.getElementById('ownedGames');
    const emptyLibrary = document.getElementById('emptyLibrary');

    if (!ownedGamesContainer) return;

    const ownedGames = window.ownedState.getOwnedGames();

    if (ownedGames.length === 0) {
        ownedGamesContainer.innerHTML = '';
        if (emptyLibrary) emptyLibrary.classList.remove('hidden');
        return;
    }

    if (emptyLibrary) emptyLibrary.classList.add('hidden');

    ownedGamesContainer.innerHTML = ownedGames.map(ownedGame => {
        const gameData = window.gameService.getGameById(ownedGame.id) || {
            id: 'featured-1',
            title: 'Cyber Nexus',
            image: '../assets/games/cyberpunk.jpg'
        };

        const actions = `
            <div class="library-game-actions">
                ${renderButton({
                    label: 'Download',
                    variant: 'primary',
                    extraClasses: 'download-btn',
                    onClick: `event.stopPropagation(); window.uiEngine.downloadGame('${gameData.title}')`
                })}
                ${renderButton({
                    label: 'Remove',
                    variant: 'danger',
                    extraClasses: 'remove-btn',
                    onClick: `event.stopPropagation(); window.uiEngine.removeGame('${ownedGame.id}')`
                })}
            </div>
        `;

        return renderCard({
            title: gameData.title,
            content: `<div ${tooltipProps('Installed on Nebula', 'top')} class="library-game-status">✓ Ready to play</div>`,
            image: gameData.image,
            footer: actions,
            extraClasses: 'library-game-card',
            onClick: `window.navigationService.showPage('detail', '${ownedGame.id}')`
        });
    }).join('');
}

window.gameLibraryService = {
    renderRecommendedGames,
    renderDeals,
    renderLibraryGames
};
