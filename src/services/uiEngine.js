/**
 * UI Engine - Orchestrates rendering and user interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize State
    if (window.ownedState) {
        window.ownedState.init();
    }

    // Initial Render
    window.gameLibraryService.renderRecommendedGames();
    window.gameLibraryService.renderDeals();
    updateFeaturedButtonState();
    setupEventListeners();

    // Default Page
    window.navigationService.showPage('discover');
});

/**
 * Render friends list on the Friends page.
 */
function renderFriendsList() {
    const friendsPage = document.getElementById('friendsPage');
    if (!friendsPage) return;

    const friends = window.friendService.getAllFriends();
    
    friendsPage.innerHTML = `
        <div class="friends-layout">
            <div class="friends-list nb-card">
                <div class="friends-header">
                    <h2 class="nb-title">Friends</h2>
                    <div class="friends-search">
                        <input type="text" placeholder="Search friends..." class="nb-input">
                    </div>
                </div>
                <div class="friends-container">
                    ${friends.map(friend => window.components.renderFriendCard(friend)).join('')}
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

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Update the state of the featured game button on the Discover page.
 */
function updateFeaturedButtonState() {
    const featuredBtn = document.querySelector('.featured-actions .own-btn');
    if (featuredBtn) {
        const isOwned = window.ownedState.isOwned('featured-1');
        featuredBtn.textContent = isOwned ? 'OWNED' : 'Own Now';
        if (isOwned) {
            featuredBtn.classList.add('nb-btn-secondary');
            featuredBtn.classList.remove('nb-btn-primary');
        } else {
            featuredBtn.classList.add('nb-btn-primary');
            featuredBtn.classList.remove('nb-btn-secondary');
        }
    }
}

/**
 * Mark a game as owned and refresh UI.
 */
function ownGame(gameId, gameTitle) {
    const success = window.ownedState.addGame(gameId, gameTitle);

    if (success) {
        window.gameLibraryService.renderRecommendedGames();
        window.gameLibraryService.renderDeals();
        updateFeaturedButtonState();
        
        // Update detail page if active
        const detailPage = document.getElementById('detailPage');
        if (detailPage.classList.contains('active')) {
            const game = window.gameService.getGameById(gameId);
            if (game) {
                detailPage.innerHTML = window.components.renderGameDetail(game, true);
                if (window.lucide) window.lucide.createIcons();
            }
        }

        window.notificationService.showNotification(`${gameTitle} added to library!`);
    } else {
        window.notificationService.showNotification(`${gameTitle} already in library!`);
    }
}

/**
 * Remove a game from the library and refresh UI.
 */
function removeGame(gameId) {
    let gameTitle = "Game";
    if (gameId === 'featured-1') {
        gameTitle = "Cyber Nexus";
    } else {
        const gameData = window.gameService.getGameById(gameId);
        if (gameData) gameTitle = gameData.title;
    }

    window.ownedState.removeGame(gameId);
    window.gameLibraryService.renderLibraryGames();
    window.gameLibraryService.renderRecommendedGames();
    window.gameLibraryService.renderDeals();
    updateFeaturedButtonState();

    // Update detail page if active
    const detailPage = document.getElementById('detailPage');
    if (detailPage.classList.contains('active')) {
        const game = window.gameService.getGameById(gameId);
        if (game) {
            detailPage.innerHTML = window.components.renderGameDetail(game, false);
            if (window.lucide) window.lucide.createIcons();
        }
    }

    window.notificationService.showNotification(`${gameTitle} removed from library`);
}

/**
 * Refreshes UI across multiple views.
 */
function refreshUI(gameId) {
    window.gameLibraryService.renderLibraryGames();
    window.gameLibraryService.renderRecommendedGames();
    window.gameLibraryService.renderDeals();
    updateFeaturedButtonState();

    // Update detail page if active and matches gameId
    const detailPage = document.getElementById('detailPage');
    if (detailPage && detailPage.classList.contains('active')) {
        const game = window.gameService.getGameById(gameId);
        if (game) {
            const isOwned = window.ownedState.isOwned(gameId);
            detailPage.innerHTML = window.components.renderGameDetail(game, isOwned);
            if (window.lucide) window.lucide.createIcons();
        }
    }
}

/**
 * Handles "Download" button click.
 */
function downloadGame(gameId, gameTitle) {
    const gameStatus = window.ownedState.getGameStatus(gameId);
    if (!gameStatus || gameStatus.status === 'installed' || gameStatus.status === 'downloading') {
        return;
    }

    window.ownedState.updateGameStatus(gameId, 'downloading', 0);
    refreshUI(gameId);
    window.notificationService.showNotification(`Starting download: ${gameTitle}`);

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            window.ownedState.updateGameStatus(gameId, 'installed', 100);
            refreshUI(gameId);
            window.notificationService.showNotification(`${gameTitle} installed successfully!`);
        } else {
            window.ownedState.updateGameStatus(gameId, 'downloading', progress);
            refreshUI(gameId);
        }
    }, 800);
}

/**
 * Global event listeners.
 */
function setupEventListeners() {
    // Navigation
    document.querySelector('.discover').addEventListener('click', () => window.navigationService.showPage('discover'));
    document.querySelector('.library').addEventListener('click', () => window.navigationService.showPage('library'));
    document.querySelector('.friends').addEventListener('click', () => window.navigationService.showPage('friends'));

    // Sidebar Collapse
    document.getElementById('collapseBtn').addEventListener('click', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('collapsed');
    });

    // Window Controls (Electron bridge)
    document.querySelector('.min-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.minimize();
        }
    });

    document.querySelector('.win-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.maximize();
        }
    });

    document.querySelector('.exit-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.close();
        }
    });

    // Featured "Learn More" redirect
    const learnMoreBtn = document.querySelector('.featured-actions .btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => window.navigationService.showPage('detail', 'game-1'));
    }
}

// Expose to global scope for components to call
window.uiEngine = {
    renderFriendsList,
    ownGame,
    removeGame,
    downloadGame
};
