/**
 * Navigation Service - Handles page switching and sidebar states.
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
        navbar.classList.add('collapsed-detail');
    } else {
        navbar.classList.remove('collapsed-detail');
    }

    if (pageName === 'discover') {
        document.getElementById('discoverPage').classList.add('active');
        document.querySelector('.discover').classList.add('active');
        window.gameLibraryService.renderRecommendedGames();
        window.gameLibraryService.renderDeals();
    } else if (pageName === 'library') {
        document.getElementById('libraryPage').classList.add('active');
        document.querySelector('.library').classList.add('active');
        window.gameLibraryService.renderLibraryGames();
    } else if (pageName === 'friends') {
        document.getElementById('friendsPage').classList.add('active');
        document.querySelector('.friends').classList.add('active');
        window.uiEngine.renderFriendsList();
    } else if (pageName === 'detail') {
        const detailPage = document.getElementById('detailPage');
        const gameId = data;
        const game = window.gameService.getGameById(gameId);
        const isOwned = window.ownedState.isOwned(gameId);

        if (game) {
            detailPage.innerHTML = window.components.renderGameDetail(game, isOwned);
            detailPage.classList.add('active');

            // Initialize Lucide icons
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }
}

window.navigationService = {
    showPage
};
