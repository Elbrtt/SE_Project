/**
 * Game Detail Component
 */
(function() {
    window.components = window.components || {};

    /**
     * Renders the game detail view
     * @param {Object} game Game object
     * @param {boolean} isOwned Whether the game is owned
     * @returns {string} HTML string
     */
    window.components.renderGameDetail = function(game, isOwned) {
        // Find best deal or use default
        const bestDeal = game.deals && game.deals.length > 0 ? game.deals[0] : { price: 'Free', source: 'Internal' };
        
        const dealsHtml = (game.deals || []).map(deal => `
            <div class="deal-item">
                <span class="store-name">${deal.source}</span>
                <span class="deal-price">$${deal.price} <small>(${deal.discount}% off)</small></span>
                <button class="buy-btn" onclick="showNotification('Redirecting to ${deal.source}...')">View Deal</button>
            </div>
        `).join('');

        return `
            <div class="game-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="window.uiEngine.showPage('discover')">
                        ← Back to Discover
                    </button>
                </div>
                
                <div class="detail-banner">
                    <img src="${game.image}" alt="${game.title}">
                </div>

                <div class="detail-content">
                    <div class="detail-main-info">
                        <div class="detail-title-row">
                            <h1>${game.title}</h1>
                            <div class="detail-meta">
                                <span class="rating">⭐ ${game.rating}</span>
                                <span class="category">${game.category}</span>
                            </div>
                        </div>
                        
                        <div class="detail-developer-info">
                            <p><strong>Developer:</strong> ${game.developer}</p>
                            <p><strong>Release Date:</strong> ${game.releaseDate}</p>
                        </div>

                        <div class="detail-description">
                            <h3>About the game</h3>
                            <p>${game.description}</p>
                        </div>
                    </div>

                    <div class="detail-sidebar">
                        <div class="action-box">
                            <div class="current-price">$${bestDeal.price}</div>
                            <button class="btn btn-primary own-btn ${isOwned ? 'owned' : ''}" 
                                    onclick="window.uiEngine.ownGame('${game.id}', '${game.title}')">
                                ${isOwned ? 'OWNED' : 'Own Now'}
                            </button>
                        </div>

                        <div class="price-comparison">
                            <h3>Price Comparison</h3>
                            <div class="deals-list">
                                ${dealsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
})();
