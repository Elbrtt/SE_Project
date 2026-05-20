/**
 * Notification Service - Handles toast notifications.
 */

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification-toast', 'show');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        // Synchronized with --anim-duration-standard (0.3s)
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

window.notificationService = {
    showNotification
};
