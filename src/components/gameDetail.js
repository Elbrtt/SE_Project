import { renderButton } from './ui/button.js';
import { tooltipProps } from './ui/tooltip.js';

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
        
        const dealsHtml = (game.deals || []).map(deal => {
            const viewBtn = renderButton({
                label: 'View Deal',
                variant: 'ghost',
                extraClasses: 'buy-btn',
                onClick: `window.notificationService.showNotification('Redirecting to ${deal.source}...')`
            });

            return `
                <div class="deal-item nb-hover-elevate">
                    <span class="store-name">${deal.source}</span>
                    <span class="deal-price">$${deal.price} <small>(${deal.discount}% off)</small></span>
                    ${viewBtn}
                </div>
            `;
        }).join('');

        const backBtn = renderButton({
            label: '← Back to Discover',
            variant: 'ghost',
            extraClasses: 'back-btn',
            onClick: "window.navigationService.showPage('discover')"
        });

        const ownBtnLabel = isOwned ? 'OWNED' : 'Own Now';
        const ownBtnVariant = isOwned ? 'secondary' : 'primary';
        const ownBtn = renderButton({
            label: ownBtnLabel,
            variant: ownBtnVariant,
            extraClasses: `own-btn ${isOwned ? 'owned' : ''}`,
            onClick: `window.uiEngine.ownGame('${game.id}', '${game.title}')`
        });

        return `
            <div class="game-detail">
                <div class="detail-header">
                    ${backBtn}
                </div>
                
                <div class="detail-banner nb-card">
                    <img src="${game.image}" alt="${game.title}">
                </div>

                <div class="detail-content">
                    <div class="detail-main-info nb-card">
                        <div class="detail-title-row">
                            <h1 class="nb-title">${game.title}</h1>
                            <div class="detail-meta">
                                <span class="rating" ${tooltipProps('User Rating', 'top')}>⭐ ${game.rating}</span>
                                <span class="category" ${tooltipProps('Category', 'top')}>${game.category}</span>
                            </div>
                        </div>
                        
                        <div class="detail-developer-info">
                            <p><strong>Developer:</strong> ${game.developer}</p>
                            <p><strong>Release Date:</strong> ${game.releaseDate}</p>
                        </div>

                        <div class="detail-description">
                            <h3 class="nb-subtitle">About the game</h3>
                            <p>${game.description}</p>
                        </div>
                    </div>

                    <div class="detail-sidebar">
                        <div class="action-box nb-card">
                            <div class="current-price">$${bestDeal.price}</div>
                            ${ownBtn}
                        </div>

                        <div class="price-comparison nb-card">
                            <h3 class="nb-subtitle">Price Comparison</h3>
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
