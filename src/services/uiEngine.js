import { renderButton } from '../components/ui/button.js';
import { renderCard } from '../components/ui/card.js';
import { tooltipProps } from '../components/ui/tooltip.js';

/**
 * UI Engine - Orchestrates rendering and user interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize State
    if (window.ownedState) {
        window.ownedState.init();
    }

    // Initial Render
    renderRecommendedGames();
    renderDeals();
    updateFeaturedButtonState();
    setupEventListeners();

    // Default Page
    showPage('discover');
});

/**
 * Render recommended games grid on the Discover page.
 */
function renderRecommendedGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;

    const games = window.gameService.getAllGames();
    gamesGrid.innerHTML = games.map(game => {
        const isOwned = window.ownedState.isOwned(game.id);
        return window.components.renderGameCard(game, isOwned);
    }).join('');

    // Add click listeners to game cards (excluding own-btn)
    gamesGrid.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.own-btn')) return;
            // The gameId is stored in the own-btn inside the card for legacy compatibility
            const ownBtn = card.querySelector('.own-btn');
            // If we refactored renderGameCard to use onClick, we might need another way to get gameId
            // In my refactored renderGameCard, I used: window.uiEngine.ownGame('${game.id}', '${game.title}')
            // I'll extract it or better, add a data-game-id to the card itself.
            const match = ownBtn.getAttribute('onclick').match(/'([^']+)'/);
            if (match) {
                showPage('detail', match[1]);
            }
        });
    });
}

/**
 * Render deals on the Discover page.
 */
function renderDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    if (!dealsGrid) return;

    const games = window.gameService.getAllGames();
    const deals = games.filter(game => game.deals && game.deals.length > 0);

    dealsGrid.innerHTML = deals.map(game => {
        const bestDeal = game.deals[0];
        const oldPrice = (parseFloat(bestDeal.price) / (1 - bestDeal.discount / 100)).toFixed(2);
        
        return `
            <div class="deal-card" data-game-id="${game.id}">
                <div class="deal-image" style="background-image: url('${game.image}')">
                    <div class="discount-badge">-${bestDeal.discount}%</div>
                </div>
                <div class="deal-info">
                    <div class="deal-title">${game.title}</div>
                    <div class="deal-price-row">
                        <span class="old-price">$${oldPrice}</span>
                        <span class="new-price">$${bestDeal.price}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add click listeners to deal cards
    dealsGrid.querySelectorAll('.deal-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            showPage('detail', gameId);
        });
    });
}

/**
 * Render friends list on the Friends page.
 */
function renderFriendsList() {
    const friendsPage = document.getElementById('friendsPage');
    if (!friendsPage) return;

    const friends = window.friendService.getAllFriends();
    
    friendsPage.innerHTML = `
        <div class="friends-layout">
            <div class="friends-list">
                <div class="friends-header">
                    <h2>Friends</h2>
                    <div class="friends-search">
                        <input type="text" placeholder="Search friends...">
                    </div>
                </div>
                <div class="friends-container">
                    ${friends.map(friend => window.components.renderFriendCard(friend)).join('')}
                </div>
            </div>
            <div class="chat-area">
                <div class="empty-chat">
                    <img src="../assets/se-logo.png" alt="Logo">
                    <p>Select a friend to start chatting</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render owned games in the Library page.
 */
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
            extraClasses: 'library-game-card'
        });
    }).join('');

    // Add click listener to library cards (excluding actions)
    ownedGamesContainer.querySelectorAll('.library-game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.nb-btn')) return;
            // Get gameId from the remove button's onClick attribute
            const removeBtn = card.querySelector('.remove-btn');
            const match = removeBtn.getAttribute('onclick').match(/'([^']+)'/);
            if (match) {
                showPage('detail', match[1]);
            }
        });
    });
}

/**
 * Opens a dummy chat for a friend.
 */
function openChat(friendId) {
    const chatArea = document.querySelector('.chat-area');
    const friend = window.friendService.getAllFriends().find(f => f.id === friendId);
    if (!friend || !chatArea) return;

    chatArea.innerHTML = `
        <div class="chat-header">
            <img src="${friend.avatar}" class="friend-avatar">
            <h3>${friend.name}</h3>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="msg received">Hey! Are you online?</div>
            <div class="msg received">Want to play some ${window.gameService.getAllGames()[0].title}?</div>
            <div class="msg sent">Sure! Let's go.</div>
        </div>
        <div class="chat-input-area">
            <input type="text" placeholder="Type a message..." id="chatInput">
            <button class="nb-btn nb-btn-primary" onclick="window.uiEngine.sendMessage()">Send</button>
        </div>
    `;

    // Scroll to bottom
    const msgContainer = document.getElementById('chatMessages');
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

/**
 * Dummy send message function.
 */
function sendMessage() {
    const input = document.getElementById('chatInput');
    const msgContainer = document.getElementById('chatMessages');
    if (!input || !input.value.trim()) return;

    const msg = document.createElement('div');
    msg.className = 'msg sent';
    msg.textContent = input.value;
    msgContainer.appendChild(msg);
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    setTimeout(() => {
        showNotification('Message sent!');
    }, 200);
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
        renderRecommendedGames();
        renderDeals();
        updateFeaturedButtonState();
        
        // Update detail page if active
        const detailPage = document.getElementById('detailPage');
        if (detailPage.classList.contains('active')) {
            const game = window.gameService.getGameById(gameId);
            if (game) {
                detailPage.innerHTML = window.components.renderGameDetail(game, true);
            }
        }

        showNotification(`${gameTitle} added to library!`);
    } else {
        showNotification(`${gameTitle} already in library!`);
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
    renderLibraryGames();
    renderRecommendedGames();
    renderDeals();
    updateFeaturedButtonState();

    // Update detail page if active
    const detailPage = document.getElementById('detailPage');
    if (detailPage.classList.contains('active')) {
        const game = window.gameService.getGameById(gameId);
        if (game) {
            detailPage.innerHTML = window.components.renderGameDetail(game, false);
        }
    }

    showNotification(`${gameTitle} removed from library`);
}

/**
 * Handles "Download" button click.
 */
function downloadGame(gameTitle) {
    showNotification(`${gameTitle} downloaded successfully!`);
}

/**
 * Switch between pages (Discover/Library/Friends/Detail).
 */
function showPage(pageName, data) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Sidebar visibility
    const navbar = document.getElementById('navbar');
    if (pageName === 'detail') {
        navbar.classList.add('collapsed-detail'); // New class for minimal sidebar
    } else {
        navbar.classList.remove('collapsed-detail');
    }

    if (pageName === 'discover') {
        document.getElementById('discoverPage').classList.add('active');
        document.querySelector('.discover').classList.add('active');
        renderRecommendedGames();
        renderDeals();
    } else if (pageName === 'library') {
        document.getElementById('libraryPage').classList.add('active');
        document.querySelector('.library').classList.add('active');
        renderLibraryGames();
    } else if (pageName === 'friends') {
        document.getElementById('friendsPage').classList.add('active');
        document.querySelector('.friends').classList.add('active');
        renderFriendsList();
    } else if (pageName === 'detail') {
        const detailPage = document.getElementById('detailPage');
        const gameId = data;
        const game = window.gameService.getGameById(gameId);
        const isOwned = window.ownedState.isOwned(gameId);

        if (game) {
            detailPage.innerHTML = window.components.renderGameDetail(game, isOwned);
            detailPage.classList.add('active');
        }
    }
}

/**
 * Global event listeners.
 */
function setupEventListeners() {
    // Navigation
    document.querySelector('.discover').addEventListener('click', () => showPage('discover'));
    document.querySelector('.library').addEventListener('click', () => showPage('library'));
    document.querySelector('.friends').addEventListener('click', () => showPage('friends'));

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
        learnMoreBtn.addEventListener('click', () => showPage('detail', 'game-1'));
    }
}

/**
 * Display a temporary notification popup.
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification-toast', 'show');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        // Synchronized with --anim-duration-standard (0.3s)
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Expose to global scope for components to call
window.uiEngine = {
    showPage,
    ownGame,
    removeGame,
    openChat,
    sendMessage,
    downloadGame
};
