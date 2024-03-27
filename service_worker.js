// Utily function we use later
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

// We have to save the subscription in the backend. It's sended using POST
async function saveSubscription(subscription) {
    // The Flask app must be listening in such port in order to work
    const response = await fetch('http://127.0.0.1:5000/save-subscription', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        // Convert the subscription object to JSON text
        body: JSON.stringify(subscription)
    })

    return response.json()
}

/* When the service worker is registered and activated, we will suscribe the user
to a push service */

// We use self to refer to the service worker itself
self.addEventListener('activate', async function() {
    // This returns a PushSubscription object
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        // We pass the public key (which is in urlbase64 encoding), converted into an array buffer
        applicationServerKey: urlBase64ToUint8Array("BP7VP4YkpiI7C6UFtZPYEJnUDE_y-9cYhpgtVhf-OCtZ9Zn9ua3GFu2UaMmfHM22eM7WRSJZes86FrX1d6JOPdY")
    })

    const response = await saveSubscription(subscription)
    console.log(response)
}) 

// The service worker is listening for the push event (the backend sending the message to the client)
self.addEventListener('push', function(message) {
    self.registration.showNotification("Hello", { body: message.data.text() })
})

/* Public Key:
BP7VP4YkpiI7C6UFtZPYEJnUDE_y-9cYhpgtVhf-OCtZ9Zn9ua3GFu2UaMmfHM22eM7WRSJZes86FrX1d6JOPdY

Private Key:
yZPxyTnoniaB2jswVDv2V99LUuRSIlDfln-k7p7iFFY */