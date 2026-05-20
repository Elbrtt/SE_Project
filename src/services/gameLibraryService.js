import { games } from './gameService.js';
import { ownedGames } from './ownedState.js';

// Render recommended games grid
export function renderRecommendedGames(onOwnGame, onShowDetail) {
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
    }
    
    document.querySelectorAll('.game-card-action.own-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            onOwnGame(btn.dataset.gameId, btn.dataset.gameTitle);
        });
    });

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const btn = card.querySelector('.own-btn');
            if (btn) {
                onShowDetail(btn.dataset.gameId);
            }
        });
    });
}

// Create individual game card HTML
export function createGameCard(game) {
    const isOwned = ownedGames.some(g => g.id === game.id);
    const ownedBadge = isOwned ? `<div class="game-card-owned">OWNED</div>` : '';
    
    return `
        <div class="game-card">
            <div class="game-card-image" style="background-image: url('${game.image}')">
                ${ownedBadge}
            </div>
            <div class="game-card-info">
                <div class="game-card-title">${game.title}</div>
                <div class="game-card-category">${game.category}</div>
                <button class="game-card-action own-btn" data-game-id="${game.id}" data-game-title="${game.title}">
                    ${isOwned ? 'OWNED' : 'OWN'}
                </button>
            </div>
        </div>
    `;
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
export function renderLibraryGames(onDownload, onPlay, onRemove) {
    const ownedGamesContainer = document.getElementById('ownedGames');
    const emptyLibrary = document.getElementById('emptyLibrary');
    
    if (!ownedGamesContainer) return;
    
    if (ownedGames.length === 0) {
        ownedGamesContainer.innerHTML = '';
        if (emptyLibrary) emptyLibrary.classList.remove('hidden');
        return;
    }
    
    if (emptyLibrary) emptyLibrary.classList.add('hidden');
    
    ownedGamesContainer.innerHTML = ownedGames.map(ownedGame => {
        const gameData = games.find(g => g.id === ownedGame.id) || {
            id: 'featured-1',
            title: 'DOTA 2',
            image: '../assets/games/images/dota_2/header.jpg'
        };

        const state = window.ownedState.getGameStatus(ownedGame.id);
        const status = state ? state.status : 'ready';
        const progress = state ? state.progress : 0;
        
        let actionButtonHTML = '';
        if (status === 'downloading') {
            actionButtonHTML = `<button class="btn btn-primary disabled" disabled>Downloading ${progress}%</button>`;
        } else if (status === 'installed') {
            actionButtonHTML = `<button class="btn btn-play play-btn" data-game-id="${ownedGame.id}" data-game-title="${gameData.title}">Play</button>`;
        } else {
            actionButtonHTML = `<button class="btn btn-primary download-btn" data-game-id="${ownedGame.id}" data-game-title="${gameData.title}">Download</button>`;
        }

        return `
            <div class="library-game-card">
                <div class="game-card-image" style="background-image: url('${gameData.image}')"></div>
                <div class="game-card-info">
                    <div class="game-card-title">${gameData.title}</div>
                    <div class="library-game-actions">
                        ${actionButtonHTML}
                        <button class="remove-btn-img remove-btn" data-game-id="${ownedGame.id}" title="Remove Game">
                            <img src="../assets/trash.png" alt="Remove">
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => onDownload(btn.dataset.gameId, btn.dataset.gameTitle));
    });

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => onPlay(btn.dataset.gameTitle));
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => onRemove(btn.dataset.gameId));
    });
}
