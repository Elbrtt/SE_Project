import { renderButton } from './ui/button.js';

/**
 * Friend Card Component
 */
(function() {
    window.components = window.components || {};

    /**
     * Renders a friend card
     * @param {Object} friend Friend object
     * @returns {string} HTML string
     */
    window.components.renderFriendCard = function(friend) {
        let statusClass = 'offline';
        if (friend.status === 'Online') statusClass = 'online';
        if (friend.status === 'In-Game') statusClass = 'in-game';

        const chatBtn = renderButton({
            label: '💬',
            variant: 'ghost',
            extraClasses: 'action-btn',
            onClick: `window.uiEngine.openChat('${friend.id}')`
        });

        const callBtn = renderButton({
            label: '📞',
            variant: 'ghost',
            extraClasses: 'action-btn',
            onClick: `event.stopPropagation(); window.notificationService.showNotification('Calling ${friend.name}...')`
        });

        const videoBtn = renderButton({
            label: '🎥',
            variant: 'ghost',
            extraClasses: 'action-btn',
            onClick: `event.stopPropagation(); window.notificationService.showNotification('Starting video call with ${friend.name}...')`
        });

        return `
            <div class="friend-card nb-card nb-hover-elevate" onclick="window.uiEngine.openChat('${friend.id}')">
                <div class="friend-avatar-container">
                    <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                    <div class="status-dot ${statusClass}"></div>
                </div>
                <div class="friend-info">
                    <div class="friend-name">${friend.name}</div>
                    <div class="friend-status">${friend.status}</div>
                </div>
                <div class="friend-actions">
                    ${chatBtn}
                    ${callBtn}
                    ${videoBtn}
                </div>
            </div>
        `;
    };
})();
