self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'showNotification') {
        showSecretNotification();
    }
});

self.addEventListener('push', (event) => {
    showSecretNotification();
});

function showSecretNotification() {
    const options = {
        body: 'New study materials have been updated.', 
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png', 
        badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png',
        tag: 'sslc-study-update',
        renotify: true
    };

    self.registration.showNotification('Class 10', options); 
}

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
