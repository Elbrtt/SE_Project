/**
 * Chat Service - Handles messaging and chat UI.
 */

function openChat(friendId) {
    const chatArea = document.querySelector('.chat-area');
    const friend = window.friendService.getAllFriends().find(f => f.id === friendId);
    if (!friend || !chatArea) return;

    chatArea.innerHTML = `
        <div class="chat-header">
            <img src="${friend.avatar}" class="friend-avatar">
            <h3>${friend.name}</h3>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="msg received">Hey! Are you online?</div>
            <div class="msg received">Want to play some ${window.gameService.getAllGames()[0].title}?</div>
            <div class="msg sent">Sure! Let's go.</div>
        </div>
        <div class="chat-input-area">
            <input type="text" placeholder="Type a message..." id="chatInput">
            <button class="nb-btn nb-btn-primary" onclick="window.chatService.sendMessage()">Send</button>
        </div>
    `;

    // Scroll to bottom
    const msgContainer = document.getElementById('chatMessages');
    if (msgContainer) {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const msgContainer = document.getElementById('chatMessages');
    if (!input || !input.value.trim()) return;

    const msg = document.createElement('div');
    msg.className = 'msg sent';
    msg.textContent = input.value;
    msgContainer.appendChild(msg);
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    setTimeout(() => {
        window.notificationService.showNotification('Message sent!');
    }, 200);
}

window.chatService = {
    openChat,
    sendMessage
};
