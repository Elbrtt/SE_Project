// Game data service
const games = [
    {
        id: 'game-1',
        title: 'Mystic Legends',
        category: 'Fantasy RPG',
        image: '../assets/games/dishonored.jpg',
        description: 'Embark on an epic journey through mystical lands and become a legend.',
        rating: 4.8,
        developer: 'Arcane Studios',
        releaseDate: '2023-10-15',
        deals: [
            { source: 'Steam', price: 49.99, discount: 20 },
            { source: 'Epic', price: 59.99, discount: 0 }
        ]
    },
    {
        id: 'game-2',
        title: 'Void Runner',
        category: 'Sci-Fi Shooter',
        image: '../assets/games/ds.jpeg',
        description: 'Fast-paced combat in the depths of space. Survive the void.',
        rating: 4.5,
        developer: 'Orbit Games',
        releaseDate: '2024-01-20',
        deals: [
            { source: 'Steam', price: 29.99, discount: 15 },
            { source: 'GOG', price: 25.00, discount: 10 }
        ]
    },
    {
        id: 'game-3',
        title: 'Dark Souls Echo',
        category: 'Action RPG',
        image: '../assets/games/dishonored.jpg',
        description: 'Unforgiving combat and deep lore in a dying world.',
        rating: 4.9,
        developer: 'Echo Software',
        releaseDate: '2022-05-12',
        deals: [
            { source: 'Steam', price: 39.99, discount: 50 }
        ]
    },
    {
        id: 'game-4',
        title: 'Neon Drift',
        category: 'Racing',
        image: '../assets/games/gow.jpeg',
        description: 'High-octane racing through neon-lit futuristic cityscapes.',
        rating: 4.2,
        developer: 'Speed Force',
        releaseDate: '2023-08-30',
        deals: [
            { source: 'Steam', price: 19.99, discount: 0 },
            { source: 'Origin', price: 14.99, discount: 25 }
        ]
    },
    {
        id: 'game-5',
        title: 'Whispers Unknown',
        category: 'Horror',
        image: '../assets/games/ds.jpeg',
        description: 'A psychological horror experience that will keep you guessing.',
        rating: 4.6,
        developer: 'Silent Hill Team',
        releaseDate: '2024-02-14',
        deals: [
            { source: 'Steam', price: 34.99, discount: 10 }
        ]
    },
    {
        id: 'game-6',
        title: 'Arcane Realms',
        category: 'Fantasy Adventure',
        image: '../assets/games/dishonored.jpg',
        description: 'Explore vast open worlds filled with magic and mystery.',
        rating: 4.7,
        developer: 'World Builders',
        releaseDate: '2023-12-01',
        deals: [
            { source: 'Steam', price: 45.00, discount: 30 }
        ]
    },
    {
        id: 'game-7',
        title: 'Command Center',
        category: 'Strategy',
        image: '../assets/games/gow.jpeg',
        description: 'Master the battlefield with superior tactics and strategy.',
        rating: 4.4,
        developer: 'Tactical Mind',
        releaseDate: '2022-11-20',
        deals: [
            { source: 'Steam', price: 24.99, discount: 50 },
            { source: 'Microsoft', price: 49.99, discount: 0 }
        ]
    },
    {
        id: 'game-8',
        title: 'Jungle Quest',
        category: 'Platformer',
        image: '../assets/games/ds.jpeg',
        description: 'Leap through dangerous jungles in search of ancient treasure.',
        rating: 4.0,
        developer: 'Jump Start',
        releaseDate: '2023-03-10',
        deals: [
            { source: 'Steam', price: 9.99, discount: 0 }
        ]
    }
];

window.gameService = {
    getAllGames: () => games,
    getGameById: (id) => games.find(g => g.id === id)
};