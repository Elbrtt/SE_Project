// Game data
const games = [
    {
        id: 'game-1',
        title: 'Dishonored',
        category: 'Action Adventure',
        image: '../assets/games/dishonored.jpg'
    },
    {
        id: 'game-2',
        title: 'Dark Souls III',
        category: 'Fantasy RPG',
        image: '../assets/games/ds.jpeg'
    },
    {
        id: 'game-3',
        title: 'Baldur\'s Gate',
        category: 'Action RPG',
        image: '../assets/games/images/baldur_s_gate_3/header.jpg'
    },
    {
        id: 'game-4',
        title: 'God Of War: Ragnarok',
        category: 'Action RPG',
        image: '../assets/games/gow.jpeg'
    },
    {
        id: 'game-5',
        title: 'Cyberpunk 2077',
        category: 'RPG',
        image: '../assets/games/images/cyberpunk_2077/header.jpg'
    },
    {
        id: 'game-6',
        title: 'Elden Ring',
        category: 'Action RPG',
        image: '../assets/games/images/elden_ring/header.jpg'
    },
    {
        id: 'game-7',
        title: 'Hades',
        category: 'Roguelike',
        image: '../assets/games/images/hades/library_600x900.jpg'
    },
    {
        id: 'game-8',
        title: 'Portal 2',
        category: 'Platformer',
        image: '../assets/games/images/portal_2/header.jpg'
    }
];

// App State
let ownedGames = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadOwnedGames();
    renderRecommendedGames();
    updateFeaturedButtonState(); // Sinkronisasi tombol banner utama
    setupEventListeners();
    showPage('discover');
});

// Load owned games from localStorage
function loadOwnedGames() {
    const saved = localStorage.getItem('ownedGames');
    ownedGames = saved ? JSON.parse(saved) : [];
}

// Save owned games to localStorage
function saveOwnedGames() {
    localStorage.setItem('ownedGames', JSON.stringify(ownedGames));
}

// Render recommended games grid
function renderRecommendedGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
    }
    
    // Bind click events ke semua tombol own (termasuk yang di banner atas)
    document.querySelectorAll('.own-btn').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll('.own-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = btn.dataset.gameId;
            const gameTitle = btn.dataset.gameTitle;
            ownGame(gameId, gameTitle);
        });
    });
}

// Create individual game card HTML
function createGameCard(game) {
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

// Mark game as owned
function ownGame(gameId, gameTitle) {
    const isAlreadyOwned = ownedGames.some(g => g.id === gameId);
    
    if (!isAlreadyOwned) {
        ownedGames.push({
            id: gameId,
            title: gameTitle,
            datePurchased: new Date().toISOString()
        });
        saveOwnedGames();
        renderRecommendedGames();
        updateFeaturedButtonState();
        showNotification(`${gameTitle} added to library!`);
    } else {
        showNotification(`${gameTitle} already in library!`);
    }
}

// Update status tombol pada banner utama secara dinamis
function updateFeaturedButtonState() {
    const featuredBtn = document.querySelector('.featured-actions .own-btn');
    if (featuredBtn) {
        const isOwned = ownedGames.some(g => g.id === 'featured-1');
        featuredBtn.textContent = isOwned ? 'OWNED' : 'Own Now';
    }
}

// Render owned games in library
function renderLibraryGames() {
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
            title: 'Dota 2',
            image: '../assets/games/images/dota_2/header.jpg'
        };

        return `
            <div class="library-game-card">
                <div class="library-game-image" style="background-image: url('${gameData.image}')"></div>
                <div class="library-game-info">
                    <div class="library-game-title">${gameData.title}</div>
                    <div class="library-game-actions">
                        <button class="btn btn-primary download-btn" data-game-id="${ownedGame.id}" data-game-title="${gameData.title}">
                            Download
                        </button>
                        <button class="btn danger remove-btn" data-game-id="${ownedGame.id}">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add event listeners
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const gameTitle = btn.dataset.gameTitle;
            downloadGame(gameTitle);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const gameId = btn.dataset.gameId;
            removeGame(gameId);
        });
    });
}

// Download game
function downloadGame(gameTitle) {
    showNotification(`${gameTitle} downloaded successfully!`);
}

// Remove game from library
function removeGame(gameId) {
    let gameTitle = "Game";
    if (gameId === 'featured-1') {
        gameTitle = "Cyber Nexus";
    } else {
        const gameData = games.find(g => g.id === gameId);
        if (gameData) gameTitle = gameData.title;
    }

    ownedGames = ownedGames.filter(g => g.id !== gameId);
    saveOwnedGames();
    renderLibraryGames();
    renderRecommendedGames();
    updateFeaturedButtonState();
    showNotification(`${gameTitle} removed from library`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #00d4ff;
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 0.4rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Show/hide pages
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (pageName === 'discover') {
        document.getElementById('discoverPage').classList.add('active');
        document.querySelector('.discover').classList.add('active');
    } else if (pageName === 'library') {
        document.getElementById('libraryPage').classList.add('active');
        document.querySelector('.library').classList.add('active');
        renderLibraryGames();
    }
}

// Setup event listeners (SINTAKSIS SUDAH DIPERBAIKI TOTAL)
function setupEventListeners() {
    document.querySelector('.discover').addEventListener('click', () => showPage('discover'));
    document.querySelector('.library').addEventListener('click', () => showPage('library'));
    
    // Logika Tombol Hamburger Terpusat & Konsisten ☰
    document.getElementById('collapseBtn').addEventListener('click', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('collapsed');
    });
    
    // Window controls menggunakan bridge dari preload.js
    document.querySelector('.min-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.minimize();
        } else {
            console.log("Minimize triggered (Electron context missing)");
        }
    });
    
    document.querySelector('.win-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.maximize();
        } else {
            console.log("Maximize triggered (Electron context missing)");
        }
    });
    
    document.querySelector('.exit-button').addEventListener('click', () => {
        if (window.electron && window.electron.windowControls) {
            window.electron.windowControls.close();
        } else {
            console.log("Close triggered (Electron context missing)");
        }
    });
}