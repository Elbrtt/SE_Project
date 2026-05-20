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
    
    // Filter for "worth it" deals: discount > 20% OR price <= 15
    const deals = games.filter(game => {
        if (!game.deals || game.deals.length === 0) return false;
        return game.deals.some(deal => deal.discount > 20 || deal.price <= 15);
    });

    dealsGrid.innerHTML = deals.map(game => {
        // Find the best deal for this game
        const bestDeal = game.deals.reduce((best, current) => {
            return (current.discount > best.discount) ? current : best;
        }, game.deals[0]);

        const oldPrice = (parseFloat(bestDeal.price) / (1 - bestDeal.discount / 100)).toFixed(2);
        
        // Map platform to Lucide icon
        const getPlatformIcon = (source) => {
            switch(source.toLowerCase()) {
                case 'steam': return 'monitor';
                case 'epic': return 'gamepad-2';
                case 'gog': return 'ghost';
                default: return 'command';
            }
        };

        return renderCard({
            title: game.title,
            image: game.image,
            content: `
                <div class="deal-meta">
                    <div class="nb-badge nb-badge-danger">-${bestDeal.discount}%</div>
                    <div class="platform-icons">
                        ${game.deals.map(d => `<i data-lucide="${getPlatformIcon(d.source)}" class="platform-icon" title="${d.source}"></i>`).join('')}
                    </div>
                </div>
                <div class="deal-price-row">
                    <span class="old-price">$${oldPrice}</span>
                    <span class="new-price">$${bestDeal.price}</span>
                </div>
            `,
            extraClasses: 'deal-card',
            onClick: `window.navigationService.showPage('detail', '${game.id}')`
        });
    }).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
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

        const state = window.ownedState.getGameStatus(ownedGame.id);
        const status = state ? state.status : 'ready';
        const progress = state ? state.progress : 0;

        let statusText = 'Ready to Download';
        let statusIcon = 'download-cloud';
        let actionLabel = 'Download';
        let actionIcon = 'download';
        let isDownloading = status === 'downloading';

        if (status === 'downloading') {
            statusText = `Downloading... ${progress}%`;
            statusIcon = 'loader';
            actionLabel = 'Downloading';
        } else if (status === 'installed') {
            statusText = 'Ready to Play';
            statusIcon = 'check-circle';
            actionLabel = 'Play';
            actionIcon = 'play';
        }

        const statusHtml = `
            <div class="library-game-status-container">
                <div ${tooltipProps(status === 'installed' ? 'Installed on Nebula' : 'Cloud Library', 'top')} class="library-game-status ${status}">
                    <i data-lucide="${statusIcon}" class="status-icon ${isDownloading ? 'spin' : ''}"></i>
                    <span>${statusText}</span>
                </div>
                ${isDownloading ? `
                    <div class="nb-progress-bar">
                        <div class="nb-progress-fill" style="width: ${progress}%"></div>
                    </div>
                ` : ''}
            </div>
        `;

        const actions = `
            <div class="library-game-actions">
                ${renderButton({
                    label: actionLabel,
                    variant: status === 'installed' ? 'secondary' : 'primary',
                    extraClasses: `download-btn ${isDownloading ? 'disabled' : ''}`,
                    onClick: isDownloading ? '' : `event.stopPropagation(); ${status === 'installed' ? `window.notificationService.showNotification('Launching ${gameData.title}...')` : `window.uiEngine.downloadGame('${ownedGame.id}', '${gameData.title}')`}`
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
            content: statusHtml,
            image: gameData.image,
            footer: actions,
            extraClasses: `library-game-card ${status}`,
            onClick: `window.navigationService.showPage('detail', '${ownedGame.id}')`
        });
    }).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

window.gameLibraryService = {
    renderRecommendedGames,
    renderDeals,
    renderLibraryGames
};
