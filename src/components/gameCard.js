import { renderButton } from './ui/button.js';
import { renderCard } from './ui/card.js';

/**
 * Renders a game card HTML string for the discover page.
 * @param {Object} game - The game object.
 * @param {boolean} isOwned - Whether the game is owned.
 * @returns {string} The HTML template for the game card.
 */
export function renderGameCard(game, isOwned) {
    const ownedBadge = isOwned ? `<div class="game-card-owned">OWNED</div>` : '';
    const buttonText = isOwned ? 'OWNED' : 'Own Now';
    const buttonVariant = isOwned ? 'secondary' : 'primary';

    const footer = renderButton({
        label: buttonText,
        variant: buttonVariant,
        extraClasses: 'own-btn',
        onClick: `event.stopPropagation(); window.uiEngine.ownGame('${game.id}', '${game.title}')`
    });

    return renderCard({
        title: game.title,
        content: `
            <div class="game-card-category">${game.category}</div>
            ${ownedBadge}
        `,
        image: game.image,
        footer: footer,
        extraClasses: 'game-card',
        onClick: `window.navigationService.showPage('detail', '${game.id}')`
    });
}


// Expose to global scope
window.components = window.components || {};
window.components.renderGameCard = renderGameCard;
