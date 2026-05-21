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
        
        // Helper for store icons
        const getStoreIcon = (source) => {
            const src = source.toLowerCase();
            if (src.includes('steam')) return 'monitor';
            if (src.includes('epic')) return 'gamepad-2';
            if (src.includes('gog')) return 'ghost';
            if (src.includes('origin') || src.includes('ea')) return 'zap';
            if (src.includes('ubisoft') || src.includes('uplay')) return 'shield';
            return 'shopping-cart';
        };

        const dealsHtml = (game.deals || []).map(deal => {
            const viewBtn = renderButton({
                label: 'View Deal',
                variant: 'ghost',
                extraClasses: 'buy-btn',
                onClick: `window.notificationService.showNotification('Redirecting to ${deal.source}...')`
            });

            return `
                <div class="deal-item nb-hover-elevate">
                    <div class="deal-store">
                        <i data-lucide="${getStoreIcon(deal.source)}"></i>
                        <span class="store-name">${deal.source}</span>
                    </div>
                    <div class="deal-info">
                        <span class="deal-price">${deal.price}</span>
                        <span class="deal-discount">-${deal.discount}%</span>
                    </div>
                    ${viewBtn}
                </div>
            `;
        }).join('');

        const backBtn = renderButton({
            label: '',
            variant: 'ghost',
            icon: '<i data-lucide="arrow-left"></i>',
            extraClasses: 'back-btn',
            onClick: "window.navigationService.showPage('discover')"
        });

        // Hide "STATUS" and "Own Now" if owned
        let actionBoxHtml = '';
        if (isOwned) {
            const state = window.ownedState.getGameStatus(game.id);
            const status = state ? state.status : 'ready';
            const progress = state ? state.progress : 0;
            const isDownloading = status === 'downloading';
            
            let btnLabel = 'Download';
            let btnVariant = 'primary';
            let btnIcon = 'download';

            if (status === 'downloading') {
                btnLabel = `Downloading ${progress}%`;
                btnIcon = 'loader-2';
            } else if (status === 'installed') {
                btnLabel = 'Play Now';
                btnVariant = 'secondary';
                btnIcon = 'play';
            }

            actionBoxHtml = `
                <div class="status-box nb-card owned">
                    <div class="status-info-row">
                        <i data-lucide="${status === 'installed' ? 'check-circle' : 'library'}" class="icon-owned"></i>
                        <div class="status-content">
                            <span class="status-label">STATUS</span>
                            <span class="status-value">${status.toUpperCase()}</span>
                        </div>
                    </div>
                    ${renderButton({
                        label: btnLabel,
                        variant: btnVariant,
                        icon: `<i data-lucide="${btnIcon}" class="${status === 'downloading' ? 'animate-spin' : ''}"></i>`,
                        extraClasses: `own-btn ${isDownloading ? 'disabled' : ''}`,
                        onClick: isDownloading ? '' : `${status === 'installed' ? `window.notificationService.showNotification('Launching ${game.title}...')` : `window.uiEngine.downloadGame('${game.id}', '${game.title}')`}`
                    })}
                </div>
            `;
        } else {
            actionBoxHtml = `
                <div class="action-box nb-card">
                    <div class="price-info">
                        <span class="status-label">AVAILABLE NOW</span>
                        <div class="current-price">${bestDeal.price}</div>
                    </div>
                    ${renderButton({
                        label: 'Own Now',
                        variant: 'primary',
                        icon: '<i data-lucide="shopping-bag"></i>',
                        extraClasses: 'own-btn',
                        onClick: `window.uiEngine.ownGame('${game.id}', '${game.title}')`
                    })}
                </div>
            `;
        }

        return `
            <div class="game-detail">
                <div class="detail-header">
                    ${backBtn}
                </div>
                
                <div class="detail-banner nb-card">
                    <img src="${game.bg}" alt="${game.title}">
                </div>

                <div class="detail-content">
                    <div class="detail-main-info nb-card">
                        <div class="detail-title-row">
                            <h1 class="nb-title">${game.title}</h1>
                            <div class="detail-meta">
                                <span class="rating" ${tooltipProps('User Rating', 'top')}>
                                    <i data-lucide="star"></i>
                                    ${game.rating}
                                </span>
                                <span class="category" ${tooltipProps('Category', 'top')}>
                                    <i data-lucide="tag"></i>
                                    ${game.category}
                                </span>
                            </div>
                        </div>
                        
                        <div class="detail-developer-info">
                            <div class="info-item">
                                <span class="label">Developer</span>
                                <span class="value">${game.developer}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Release Date</span>
                                <span class="value">${game.releaseDate}</span>
                            </div>
                        </div>

                        <div class="detail-description">
                            <h3 class="nb-subtitle">About the game</h3>
                            <p>${game.description}</p>
                        </div>
                    </div>

                    <div class="detail-sidebar">
                        ${actionBoxHtml}

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
