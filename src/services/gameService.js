export const games = [
    {
        id: 'game-1',
        title: 'Dishonored',
        category: 'Action Adventure',
        image: '../assets/games/dishonored.jpg',
        bg:'../assets/games/dishonored.jpg'
    },
    {
        id: 'game-2',
        title: 'Dark Souls III',
        category: 'Fantasy RPG',
        image: '../assets/games/ds.jpeg',
        bg: '../assets/ds_bg.png'

    },
    {
        id: 'game-3',
        title: 'Baldur\'s Gate',
        category: 'Action RPG',
        image: '../assets/games/images/baldur_s_gate_3/header.jpg',
        bg: '../assets/games/images/baldur_s_gate_3/hero.jpg'
    },
    {
        id: 'game-4',
        title: 'God Of War: Ragnarok',
        category: 'Action RPG',
        image: '../assets/games/gow.jpeg',
        bg: '../assets/gow_bg.jpg'
    },
    {
        id: 'game-5',
        title: 'Cyberpunk 2077',
        category: 'RPG',
        image: '../assets/games/images/cyberpunk_2077/header.jpg',
        bg:'../assets/games/images/cyberpunk_2077/hero.jpg'
    },
    {
        id: 'game-6',
        title: 'Elden Ring',
        category: 'Action RPG',
        image: '../assets/games/images/elden_ring/header.jpg',
        bg: '../assets/games/images/elden_ring/hero.jpg'
    },
    {
        id: 'game-7',
        title: 'Hades',
        category: 'Roguelike',
        image: '../assets/games/images/hades/library_600x900.jpg',
        bg: '../assets/games/images/hades/hero.jpg'
    },
    {
        id: 'game-8',
        title: 'Portal 2',
        category: 'Platformer',
        image: '../assets/games/images/portal_2/header.jpg',
        bg: '../assets/games/images/portal_2/hero.jpg'
    }
];

export function getGameById(id) {
    if (id === 'featured-1') {
        return {
            id: 'featured-1',
            title: 'DOTA 2',
            category: 'Action RTS',
            image: '../assets/games/images/dota_2/header.jpg',
            bg: '../assets/games/images/dota_2/hero.jpg',
            description: "Deepest multi-player action RTS game ever made and there's always a new strategy or tactic to discover. It's completely free to play and always will be – start defending your ancient now."
        };
    }
    return games.find(g => g.id === id);
}

// Global reference for legacy components
window.gameService = { getGameById };

