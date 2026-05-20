export let ownedGames = [];

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
