// Owned games state management
let ownedGames = [];

const loadOwnedGames = () => {
    const saved = localStorage.getItem('ownedGames');
    ownedGames = saved ? JSON.parse(saved) : [];
};

const saveOwnedGames = () => {
    localStorage.setItem('ownedGames', JSON.stringify(ownedGames));
};

window.ownedState = {
    init: () => loadOwnedGames(),
    getOwnedGames: () => ownedGames,
    isOwned: (id) => ownedGames.some(g => g.id === id),
    addGame: (gameId, gameTitle) => {
        if (!ownedGames.some(g => g.id === gameId)) {
            ownedGames.push({
                id: gameId,
                title: gameTitle,
                datePurchased: new Date().toISOString()
            });
            saveOwnedGames();
            return true;
        }
        return false;
    },
    removeGame: (gameId) => {
        ownedGames = ownedGames.filter(g => g.id !== gameId);
        saveOwnedGames();
    }
};