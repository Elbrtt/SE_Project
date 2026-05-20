export let ownedGames = [];
export const runtimeStatus = {};

// Load owned games from localStorage
export function loadOwnedGames() {
    const saved = localStorage.getItem('ownedGames');
    ownedGames = saved ? JSON.parse(saved) : [];
}

// Save owned games to localStorage
export function saveOwnedGames() {
    localStorage.setItem('ownedGames', JSON.stringify(ownedGames));
}

// Update ownedGames reference (for removal logic)
export function setOwnedGames(newOwnedGames) {
    ownedGames = newOwnedGames;
    saveOwnedGames();
}

/**
 * Gets the current status of a game (persistent + runtime)
 * @param {string} gameId 
 * @returns {Object} { status: 'ready'|'downloading'|'installed', progress: 0-100 }
 */
export function getGameStatus(gameId) {
    const game = ownedGames.find(g => g.id === gameId);
    if (!game) return null;

    if (runtimeStatus[gameId]) {
        return runtimeStatus[gameId];
    }

    return {
        status: game.isInstalled ? 'installed' : 'ready',
        progress: game.isInstalled ? 100 : 0
    };
}

/**
 * Simulates a game download with progress
 */
export function downloadGame(gameId, gameTitle, onProgress, onComplete) {
    if (runtimeStatus[gameId]) return; // Already downloading

    runtimeStatus[gameId] = { status: 'downloading', progress: 0 };
    
    const interval = setInterval(() => {
        const increment = Math.floor(Math.random() * 15) + 5;
        runtimeStatus[gameId].progress += increment;

        if (runtimeStatus[gameId].progress >= 100) {
            runtimeStatus[gameId].progress = 100;
            clearInterval(interval);
            
            // Persist the installation
            const gameIndex = ownedGames.findIndex(g => g.id === gameId);
            if (gameIndex !== -1) {
                ownedGames[gameIndex].isInstalled = true;
                saveOwnedGames();
            }
            
            delete runtimeStatus[gameId];
            if (onComplete) onComplete();
        } else {
            if (onProgress) onProgress(runtimeStatus[gameId].progress);
        }
    }, 800);
}
