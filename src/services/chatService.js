/**
 * Chat Service - Handles messaging and chat UI.
 */
import { getAllFriends } from './friendService.js';
import { showNotification } from './notificationService.js';

const dummyMessages = {
    'friend-1': [
        { type: 'received', text: 'Hey! Are you online?' },
        { type: 'received', text: 'Want to play some games?' },
        { type: 'sent', text: "Sure! Let's go." }
    ],
    'friend-2': [
        { type: 'received', text: 'How is the new God of War?' },
        { type: 'sent', text: 'Amazing! You should try it.' }
    ],
    'friend-3': [
        { type: 'received', text: 'See you tomorrow!' }
    ],
    'friend-4': [
        { type: 'received', text: 'Did you finish the quest?' },
        { type: 'sent', text: 'Almost there!' }
    ],
    'friend-5': [
        { type: 'received', text: 'Busy today?' }
    ]
};

export function openChat(friendId) {
    const chatArea = document.querySelector('.chat-area');
    const friend = getAllFriends().find(f => f.id === friendId);
    if (!friend || !chatArea) return;

    const messages = dummyMessages[friendId] || [];
    const messageHtml = messages.map(m => `
        <div class="msg ${m.type}">${m.text}</div>
    `).join('');

    chatArea.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-info">
                <img src="${friend.avatar}" class="friend-avatar">
                <div>
                    <h3>${friend.name}</h3>
                    <span class="chat-status">${friend.status}</span>
                </div>
            </div>
            <div class="chat-header-actions">
                <button class="chat-action-btn" id="callBtn">
                    <i data-lucide="phone"></i>
                </button>
                <button class="chat-action-btn" id="videoBtn">
                    <i data-lucide="video"></i>
                </button>
            </div>
        </div>
        <div class="chat-messages" id="chatMessages">
            ${messageHtml}
        </div>
        <div class="chat-input-area">
            <input type="text" placeholder="Type a message..." id="chatInput" autocomplete="off">
            <button class="chat-send-btn" id="sendBtn">
                <i data-lucide="send"></i>
            </button>
        </div>
    `;

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Event Listeners
    document.getElementById('callBtn').addEventListener('click', () => showNotification(`Calling ${friend.name}...`));
    document.getElementById('videoBtn').addEventListener('click', () => showNotification(`Starting video call with ${friend.name}...`));
    document.getElementById('sendBtn').addEventListener('click', sendMessage);

    // Enter key support
    const input = document.getElementById('chatInput');
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Scroll to bottom
    const msgContainer = document.getElementById('chatMessages');
    if (msgContainer) {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
}

export function sendMessage() {
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
        showNotification('Message sent!');
    }, 200);
}

// Keep global reference for legacy components if needed for now
window.chatService = {
    openChat,
    sendMessage
};
