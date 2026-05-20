import { renderButton } from './ui/button.js';
import { renderCard } from './ui/card.js';

/**
 * Renders a game card HTML string.
 * @param {Object} game - The game object.
 * @param {Object} options - Configuration options.
 * @param {boolean} options.isOwned - Whether the game is owned.
 * @param {'discover'|'library'|'deal'} options.type - Card variant.
 * @param {string} options.status - (Library only) Game status: 'ready', 'downloading', 'installed'.
 * @param {number} options.progress - (Library only) Download progress.
 * @param {string} options.discount - (Deal only) Discount percentage.
 * @param {string} options.originalPrice - (Deal only) Original price.
 * @param {string} options.discountPrice - (Deal only) Discounted price.
 * @returns {string} The HTML template for the game card.
 */
export function renderGameCard(game, options = {}) {
    const { 
        isOwned = false, 
        type = 'discover', 
        status = 'ready', 
        progress = 0,
        discount = '',
        originalPrice = '',
        discountPrice = ''
    } = options;
    
    let badge = '';
    let footer = '';
    let content = `<div class="game-card-category">${game.category || ''}</div>`;
    let extraClasses = type === 'library' ? 'library-game-card' : 'game-card';
    
    if (type === 'discover' || type === 'deal') {
        if (isOwned) {
            badge = `<div class="game-card-owned">OWNED</div>`;
        } else if (type === 'deal' && discount) {
            badge = `<div class="game-card-deal-badge">${discount}</div>`;
        }
        
        if (type === 'deal') {
            content += `
                <div class="game-card-prices">
                    <span class="original-price">${originalPrice}</span>
                    <span class="discount-price">
                        <i data-lucide="tag" class="price-icon"></i>
                        ${discountPrice}
                    </span>
                </div>
            `;
        }

        footer = renderButton({
            label: isOwned ? 'OWNED' : 'Own Now',
            variant: isOwned ? 'secondary' : 'primary',
            extraClasses: 'own-btn',
            onClick: `event.stopPropagation(); window.uiEngine.ownGame('${game.id}', '${game.title}')`
        });
    } else if (type === 'library') {
        let actionButtonHTML = '';
        if (status === 'downloading') {
            actionButtonHTML = renderButton({
                label: `Downloading ${progress}%`,
                variant: 'primary',
                extraClasses: 'disabled',
                disabled: true
            });
        } else if (status === 'installed') {
            actionButtonHTML = renderButton({
                label: 'Play',
                variant: 'success',
                extraClasses: 'play-btn',
                onClick: `event.stopPropagation(); window.libraryEngine.playGame('${game.title}')`
            });
        } else {
            actionButtonHTML = renderButton({
                label: 'Download',
                variant: 'primary',
                extraClasses: 'download-btn',
                onClick: `event.stopPropagation(); window.libraryEngine.downloadGame('${game.id}', '${game.title}')`
            });
        }

        footer = `
            <div class="library-game-actions">
                ${actionButtonHTML}
                <button class="remove-btn" onclick="event.stopPropagation(); window.libraryEngine.removeGame('${game.id}')" title="Remove Game">
                    <img src="../assets/trash.png" alt="Remove">
                </button>
            </div>
        `;
    }

    return renderCard({
        title: game.title,
        content: `
            ${content}
            ${badge}
        `,
        image: game.image,
        footer: footer,
        extraClasses: extraClasses,
        onClick: `window.uiEngine.renderGameDetail('${game.id}')`
    });
}


// Expose to global scope
window.components = window.components || {};
window.components.renderGameCard = renderGameCard;
