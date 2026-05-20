import { games, getGameById } from './gameService.js';
import { 
    ownedGames, 
    loadOwnedGames, 
    saveOwnedGames, 
    setOwnedGames,
    downloadGame as coreDownloadGame,
    getGameStatus
} from './ownedState.js';
import { 
    renderRecommendedGames, 
    renderLibraryGames, 
    updateFeaturedButtonState 
} from './gameLibraryService.js';
import { getAllFriends } from './friendService.js';
import { openChat } from './chatService.js';
import { showNotification } from './notificationService.js';

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
        
        // Refresh detail page if active
        const detailPage = document.getElementById('detailPage');
        if (detailPage.classList.contains('active')) {
            renderGameDetail(gameId);
        }
    } else {
        showNotification(`${gameTitle} already in library!`);
    }
}

function renderGameDetail(gameId) {
    const game = getGameById(gameId);
    if (!game) return;

    const isOwned = ownedGames.some(g => g.id === game.id);
    const detailPage = document.getElementById('detailPage');
    
    // Use Component-based rendering from gameDetail.js
    if (window.components && window.components.renderGameDetail) {
        detailPage.innerHTML = window.components.renderGameDetail(game, isOwned);
        if (window.lucide) window.lucide.createIcons();
    } else {
        // Fallback to basic static update if component fails
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
            });
        }
    }
    showPage('detail');
}

function downloadGame(gameId, gameTitle) {
    showNotification(`Starting download: ${gameTitle}`);
    
    coreDownloadGame(
        gameId, 
        gameTitle, 
        // onProgress
        (progress) => {
            // Refresh Library if active
            const libraryPage = document.getElementById('libraryPage');
            if (libraryPage.classList.contains('active')) {
                renderLibraryGames(downloadGame, playGame, removeGame);
            }
            
            // Refresh Detail if active
            const detailPage = document.getElementById('detailPage');
            if (detailPage.classList.contains('active')) {
                renderGameDetail(gameId);
            }
        },
        // onComplete
        () => {
            renderLibraryGames(downloadGame, playGame, removeGame);
            
            const detailPage = document.getElementById('detailPage');
            if (detailPage.classList.contains('active')) {
                renderGameDetail(gameId);
            }
            
            showNotification(`${gameTitle} downloaded successfully!`);
        }
    );
}

function playGame(gameTitle) {
    const textContent = `[ RUNNING PROCESS ]\n\nStarting: ${gameTitle}...\nStatus: OK`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    showNotification(`Launching ${gameTitle}...`);
}

function removeGame(gameId) {
    const game = getGameById(gameId);
    setOwnedGames(ownedGames.filter(g => g.id !== gameId));
    renderLibraryGames(downloadGame, playGame, removeGame);
    refreshDiscover();
    
    // Refresh detail if active
    const detailPage = document.getElementById('detailPage');
    if (detailPage.classList.contains('active')) {
        renderGameDetail(gameId);
    }
    
    showNotification(`${game ? game.title : 'Game'} removed from library`);
}

function renderFriendsList() {
    const friendsPage = document.getElementById('friendsPage');
    if (!friendsPage) return;

    const friends = getAllFriends();
    
    friendsPage.innerHTML = `
        <div class="friends-layout">
            <div class="friends-list nb-card">
                <div class="friends-header">
                    <h2 class="nb-title">Friends</h2>
                    <div class="friends-search">
                        <input type="text" placeholder="Search friends..." class="nb-input">
                    </div>
                </div>
                <div class="friends-container" id="friendsContainer">
                </div>
            </div>
            <div class="chat-area nb-card">
                <div class="empty-chat">
                    <img src="../assets/se-logo.png" alt="Logo">
                    <p>Select a friend to start chatting</p>
                </div>
            </div>
        </div>
    `;

    const container = document.getElementById('friendsContainer');
    friends.forEach(friend => {
        let statusClass = 'offline';
        if (friend.status === 'Online') statusClass = 'online';
        if (friend.status === 'In-Game') statusClass = 'in-game';

        const card = document.createElement('div');
        card.className = 'friend-card nb-card nb-hover-elevate';
        card.innerHTML = `
            <div class="friend-avatar-container">
                <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                <div class="status-dot ${statusClass}"></div>
            </div>
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="friend-status">${friend.status}</div>
            </div>
            <div class="friend-actions">
                <button class="action-btn chat-trigger"><i data-lucide="message-square"></i></button>
                <button class="action-btn call-trigger"><i data-lucide="phone"></i></button>
                <button class="action-btn video-trigger"><i data-lucide="video"></i></button>
            </div>
        `;
        
        card.addEventListener('click', () => openChat(friend.id));
        card.querySelector('.chat-trigger').addEventListener('click', (e) => {
            e.stopPropagation();
            openChat(friend.id);
        });
        card.querySelector('.call-trigger').addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification(`Calling ${friend.name}...`);
        });
        card.querySelector('.video-trigger').addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification(`Starting video call with ${friend.name}...`);
        });

        container.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    const navbar = document.getElementById('navbar');
    if (pageName === 'detail') {
        navbar.classList.add('collapsed-detail');
    } else {
        navbar.classList.remove('collapsed-detail');
    }

    if (pageName === 'discover') {
        document.getElementById('discoverPage').classList.add('active');
        document.querySelector('.discover').classList.add('active');
    } else if (pageName === 'library') {
        document.getElementById('libraryPage').classList.add('active');
        document.querySelector('.library').classList.add('active');
        renderLibraryGames(downloadGame, playGame, removeGame);
    } else if (pageName === 'friends') {
        document.getElementById('friendsPage').classList.add('active');
        document.querySelector('.friends').classList.add('active');
        renderFriendsList();
    } else if (pageName === 'detail') {
        document.getElementById('detailPage').classList.add('active');
    }
}

function setupEventListeners() {
    document.querySelector('.discover').addEventListener('click', () => showPage('discover'));
    document.querySelector('.library').addEventListener('click', () => showPage('library'));
    document.querySelector('.friends').addEventListener('click', () => showPage('friends'));
    
    // Static Detail Back Btn (Legacy)
    const backBtn = document.getElementById('backToDiscoverBtn');
    if (backBtn) backBtn.addEventListener('click', () => showPage('discover'));

    const featuredLearnMore = document.querySelector('.featured-info .btn-secondary');
    if (featuredLearnMore) featuredLearnMore.addEventListener('click', () => renderGameDetail('featured-1'));

    const bannerOwnBtn = document.querySelector('.featured-actions .own-btn');
    if (bannerOwnBtn) bannerOwnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ownGame('featured-1', 'DOTA 2');
    });

    document.getElementById('collapseBtn').addEventListener('click', () => document.getElementById('navbar').classList.toggle('collapsed'));
    
    ['min-button', 'win-button', 'exit-button'].forEach(cls => {
        const btn = document.querySelector(`.${cls}`);
        if (btn) {
            btn.addEventListener('click', () => {
                const action = cls.split('-')[0];
                if (window.electron?.windowControls) window.electron.windowControls[action === 'exit' ? 'close' : action === 'win' ? 'maximize' : 'minimize']();
            });
        }
    });
}

// Expose legacy globals for components
window.navigationService = { showPage };
window.uiEngine = { ownGame, downloadGame, removeGame, openChat };
window.notificationService = { showNotification };
window.ownedState = { 
    isOwned: (id) => ownedGames.some(g => g.id === id),
    getGameStatus: (id) => getGameStatus(id)
};
