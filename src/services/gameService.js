export const games = [
    {
        id: 'game-1',
        title: 'Dishonored',
        category: 'Action Adventure',
        image: '../assets/games/dishonored.jpg',
        bg: '../assets/games/dishonored.jpg',
        rating: '4.8/5',
        developer: 'Arkane Studios',
        releaseDate: 'Oct 9, 2012',
        description: 'Dishonored is an immersive first-person action game that casts you as a supernatural assassin driven by revenge. With a flexible combat system, creatively eliminate your targets as you combine the supernatural abilities, weapons and unusual gadgets at your disposal. Pursue your enemies under the cover of darkness or ruthlessly attack them head on with weapons drawn.',
        deals: [
            { source: 'Steam', price: '$19.99', discount: 0 },
            { source: 'Epic', price: '$9.99', discount: 50 },
            { source: 'GOG', price: '$19.99', discount: 0 }
        ]
    },
    {
        id: 'game-2',
        title: 'Dark Souls III',
        category: 'Fantasy RPG',
        image: '../assets/games/ds.jpeg',
        bg: '../assets/ds_bg.png',
        rating: '4.9/5',
        developer: 'FromSoftware',
        releaseDate: 'Apr 12, 2016',
        description: 'Dark Souls continues to push the boundaries with the latest, ambitious chapter in the critically-acclaimed and genre-defining series. Prepare yourself to Embrace The Darkness! As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments.',
        deals: [
            { source: 'Steam', price: '$59.99', discount: 0 },
            { source: 'Humble', price: '$14.99', discount: 75 }
        ]
    },
    {
        id: 'game-3',
        title: 'Baldur\'s Gate 3',
        category: 'Action RPG',
        image: '../assets/games/images/baldur_s_gate_3/header.jpg',
        bg: '../assets/games/images/baldur_s_gate_3/hero.jpg',
        rating: '5.0/5',
        developer: 'Larian Studios',
        releaseDate: 'Aug 3, 2023',
        description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening within you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.',
        deals: [
            { source: 'Steam', price: '$59.99', discount: 0 },
            { source: 'GOG', price: '$59.99', discount: 0 }
        ]
    },
    {
        id: 'game-4',
        title: 'God Of War: Ragnarok',
        category: 'Action RPG',
        image: '../assets/games/gow.jpeg',
        bg: '../assets/gow_bg.jpg',
        rating: '4.9/5',
        developer: 'Santa Monica Studio',
        releaseDate: 'Nov 9, 2022',
        description: 'From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.',
        deals: [
            { source: 'PlayStation', price: '$69.99', discount: 0 },
            { source: 'Steam', price: '$59.99', discount: 0 }
        ]
    },
    {
        id: 'game-5',
        title: 'Cyberpunk 2077',
        category: 'RPG',
        image: '../assets/games/images/cyberpunk_2077/header.jpg',
        bg: '../assets/games/images/cyberpunk_2077/hero.jpg',
        rating: '4.5/5',
        developer: 'CD Projekt Red',
        releaseDate: 'Dec 10, 2020',
        description: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Improved and featuring all-new free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades.',
        deals: [
            { source: 'Steam', price: '$29.99', discount: 50 },
            { source: 'Epic', price: '$29.99', discount: 50 },
            { source: 'GOG', price: '$29.99', discount: 50 }
        ]
    },
    {
        id: 'game-6',
        title: 'Elden Ring',
        category: 'Action RPG',
        image: '../assets/games/images/elden_ring/header.jpg',
        bg: '../assets/games/images/elden_ring/hero.jpg',
        rating: '5.0/5',
        developer: 'FromSoftware',
        releaseDate: 'Feb 25, 2022',
        description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.',
        deals: [
            { source: 'Steam', price: '$59.99', discount: 0 },
            { source: 'Bandai Namco', price: '$59.99', discount: 0 }
        ]
    },
    {
        id: 'game-7',
        title: 'Hades',
        category: 'Roguelike',
        image: '../assets/games/images/hades/library_600x900.jpg',
        bg: '../assets/games/images/hades/hero.jpg',
        rating: '4.9/5',
        developer: 'Supergiant Games',
        releaseDate: 'Sept 17, 2020',
        description: 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre. As the immortal Prince of the Underworld, you\'ll wield the powers and mythic weapons of Olympus to break free from the clutches of the god of the dead himself, while growing stronger and unraveling more of the story with each unique escape attempt.',
        deals: [
            { source: 'Steam', price: '$12.49', discount: 50 },
            { source: 'Epic', price: '$12.49', discount: 50 }
        ]
    },
    {
        id: 'game-8',
        title: 'Portal 2',
        category: 'Platformer',
        image: '../assets/games/images/portal_2/header.jpg',
        bg: '../assets/games/images/portal_2/hero.jpg',
        rating: '5.0/5',
        developer: 'Valve',
        releaseDate: 'Apr 18, 2011',
        description: 'Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following. The single-player portion of Portal 2 introduces a cast of dynamic new characters, a host of fresh puzzle elements, and a much larger set of devious test chambers.',
        deals: [
            { source: 'Steam', price: '$1.99', discount: 80 }
        ]
    }
    
];

export const deals = [
    {
        id: 'game-5',
        title: 'Cyberpunk 2077',
        category: 'RPG',
        originalPrice: '$59.99',
        discountPrice: '$29.99',
        discount: '-50%',
        image: '../assets/games/images/cyberpunk_2077/header.jpg'
    },
    {
        id: 'game-7',
        title: 'Hades',
        category: 'Roguelike',
        originalPrice: '$24.99',
        discountPrice: '$12.49',
        discount: '-50%',
        image: '../assets/games/images/hades/library_600x900.jpg'
    },
    {
        id: 'game-8',
        title: 'Portal 2',
        category: 'Platformer',
        originalPrice: '$9.99',
        discountPrice: '$1.99',
        discount: '-80%',
        image: '../assets/games/images/portal_2/header.jpg'
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
            rating: '4.7/5',
            developer: 'Valve',
            releaseDate: 'Jul 9, 2013',
            description: "Deepest multi-player action RTS game ever made and there's always a new strategy or tactic to discover. It's completely free to play and always will be – start defending your ancient now.",
            deals: [
                { source: 'Steam', price: 'Free', discount: 0 }
            ]
        };
    }
    return games.find(g => g.id === id);
}

// Global reference for legacy components
window.gameService = { getGameById };
