
'use strict'

self.addEventListener('push', function (evt) {
  console.log('[service Worker] Push Recieved', evt)
  console.log(`[service Worker] Push has this data ${evt.data.text()}`)

  const title = 'my first Push notification'
  const options = {
    body: 'Yaay! it created',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  }

  evt.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (evt) {
  console.log('clicked')
  evt.notification.close()
  //  evt.waitUntil()
  Window.clients.openWindow('https://www.google.com')
})

export default self
