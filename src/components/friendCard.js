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

        // Using standard emojis for icons since local assets might be missing or limited
        return `
            <div class="friend-card" onclick="window.uiEngine.openChat('${friend.id}')">
                <div class="friend-avatar-container">
                    <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                    <div class="status-dot ${statusClass}"></div>
                </div>
                <div class="friend-info">
                    <div class="friend-name">${friend.name}</div>
                    <div class="friend-status">${friend.status}</div>
                </div>
                <div class="friend-actions">
                    <button class="action-btn" title="Chat">💬</button>
                    <button class="action-btn" title="Voice Call" onclick="event.stopPropagation(); showNotification('Calling ${friend.name}...')">📞</button>
                    <button class="action-btn" title="Video Call" onclick="event.stopPropagation(); showNotification('Starting video call with ${friend.name}...')">🎥</button>
                </div>
            </div>
        `;
    };
})();
