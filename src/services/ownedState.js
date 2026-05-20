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
    getGameStatus: (id) => {
        const game = ownedGames.find(g => g.id === id);
        return game ? { status: game.status || 'ready', progress: game.progress || 0 } : null;
    },
    addGame: (gameId, gameTitle) => {
        if (!ownedGames.some(g => g.id === gameId)) {
            ownedGames.push({
                id: gameId,
                title: gameTitle,
                datePurchased: new Date().toISOString(),
                status: 'ready',
                progress: 0
            });
            saveOwnedGames();
            return true;
        }
        return false;
    },
    updateGameStatus: (gameId, status, progress = 0) => {
        const index = ownedGames.findIndex(g => g.id === gameId);
        if (index !== -1) {
            ownedGames[index].status = status;
            ownedGames[index].progress = progress;
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