import { games } from './gameService.js';
import { ownedGames, loadOwnedGames, saveOwnedGames, setOwnedGames } from './ownedState.js';
import { 
    renderRecommendedGames, 
    renderLibraryGames, 
    updateFeaturedButtonState 
} from './gameLibraryService.js';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadOwnedGames();
    refreshDiscover();
    setupEventListeners();
    showPage('discover');
});

function refreshDiscover() {
    renderRecommendedGames(ownGame, renderGameDetail);
    updateFeaturedButtonState();
}

function ownGame(gameId, gameTitle) {
    const isAlreadyOwned = ownedGames.some(g => g.id === gameId);
    if (!isAlreadyOwned) {
        ownedGames.push({
            id: gameId,
            title: gameTitle,
            datePurchased: new Date().toISOString(),
            isInstalled: false
        });
        saveOwnedGames();
        refreshDiscover();
        showNotification(`${gameTitle} added to library!`);
    } else {
        showNotification(`${gameTitle} already in library!`);
    }
}

function renderGameDetail(gameId) {
    let game = games.find(g => g.id === gameId);
    if (!game && gameId === 'featured-1') {
        game = {
            id: 'featured-1',
            title: 'DOTA 2',
            category: 'Action RTS',
            image: '../assets/games/images/dota_2/header.jpg',
            bg: '../assets/games/images/dota_2/hero.jpg',
            description: "Deepest multi-player action RTS game ever made and there's always a new strategy or tactic to discover. It's completely free to play and always will be – start defending your ancient now."
        };
    }
    if (!game) return;

    const isOwned = ownedGames.some(g => g.id === game.id);
    document.getElementById('detailTitle').textContent = game.title;
    document.getElementById('detailCategory').textContent = game.category;
    document.getElementById('detailDescription').textContent = game.description || 
        `Immerse yourself in the world of ${game.title}. Master its complex mechanics, explore beautiful environments, and build your ultimate playstyle.`;
    document.getElementById('detailHeaderImage').style.backgroundImage = `url('${game.bg}')`;

    const statusLabel = document.getElementById('detailStatusLabel');
    if (statusLabel) statusLabel.textContent = isOwned ? 'IN YOUR LIBRARY' : 'STATUS';

    const actionBtn = document.getElementById('detailActionBtn');
    const newActionBtn = actionBtn.cloneNode(true);
    actionBtn.replaceWith(newActionBtn);

    if (isOwned) {
        newActionBtn.textContent = 'PLAY NOW';
        newActionBtn.className = 'btn btn-play main-action-btn';
        newActionBtn.addEventListener('click', () => playGame(game.title));
    } else {
        newActionBtn.textContent = 'OWN NOW';
        newActionBtn.className = 'btn btn-primary main-action-btn';
        newActionBtn.addEventListener('click', () => {
            ownGame(game.id, game.title);
            renderGameDetail(game.id);
        });
    }
    showPage('detail');
}

function downloadGame(gameId, gameTitle) {
    const textContent = `Marketplace Launcher\n\nGAME INSTALLED: ${gameTitle}\n\nRequired file. Do not delete.`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameTitle.replace(/\s+/g, '_')}_Game_Data.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const gameIndex = ownedGames.findIndex(g => g.id === gameId);
    if (gameIndex !== -1) {
        ownedGames[gameIndex].isInstalled = true;
        saveOwnedGames();
        renderLibraryGames(downloadGame, playGame, removeGame);
        showNotification(`${gameTitle} downloaded successfully!`);
    }
}

function playGame(gameTitle) {
    const textContent = `[ RUNNING PROCESS ]\n\nStarting: ${gameTitle}...\nStatus: OK`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    showNotification(`Launching ${gameTitle}...`);
}

function removeGame(gameId) {
    const gameData = games.find(g => g.id === gameId) || { title: gameId === 'featured-1' ? 'DOTA 2' : 'Game' };
    setOwnedGames(ownedGames.filter(g => g.id !== gameId));
    renderLibraryGames(downloadGame, playGame, removeGame);
    refreshDiscover();
    showNotification(`${gameData.title} removed from library`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast show';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    if (pageName === 'discover') {
        document.getElementById('discoverPage').classList.add('active');
        document.querySelector('.discover').classList.add('active');
    } else if (pageName === 'library') {
        document.getElementById('libraryPage').classList.add('active');
        document.querySelector('.library').classList.add('active');
        renderLibraryGames(downloadGame, playGame, removeGame);
    } else if (pageName === 'detail') {
        document.getElementById('detailPage').classList.add('active');
    }
}

function setupEventListeners() {
    document.querySelector('.discover').addEventListener('click', () => showPage('discover'));
    document.querySelector('.library').addEventListener('click', () => showPage('library'));
    document.getElementById('backToDiscoverBtn').addEventListener('click', () => showPage('discover'));

    const featuredLearnMore = document.querySelector('.featured-info .btn-secondary');
    if (featuredLearnMore) featuredLearnMore.addEventListener('click', () => renderGameDetail('featured-1'));

    const bannerOwnBtn = document.querySelector('.featured-actions .own-btn');
    if (bannerOwnBtn) bannerOwnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ownGame(bannerOwnBtn.dataset.gameId, bannerOwnBtn.dataset.gameTitle);
    });

    document.getElementById('collapseBtn').addEventListener('click', () => document.getElementById('navbar').classList.toggle('collapsed'));
    
    ['min-button', 'win-button', 'exit-button'].forEach(cls => {
        document.querySelector(`.${cls}`).addEventListener('click', () => {
            const action = cls.split('-')[0];
            if (window.electron?.windowControls) window.electron.windowControls[action === 'exit' ? 'close' : action === 'win' ? 'maximize' : 'minimize']();
        });
    });
}
