<template>
  <v-container>
    <v-btn color="primary" dark class="js-push-btn">
      Accept
      <v-icon dark right>fa-bell</v-icon>
    </v-btn>
    <section class="subscription-details js-subscription-details is-invisible">
      <p>Once you've subscribed your user, you'd send their subscription to your
      server to store in a database so that when you want to send a message
      you can lookup the subscription and send a message to it.</p>
      <p>To simplify things for this code lab copy the following details
      into the <a href="https://web-push-codelab.glitch.me//">Push Companion
      Site</a> and it'll send a push message for you, using the application
      server keys on the site - so make sure they match.</p>
    </section>
  </v-container>
</template>

<script>
// push notification code.
import SW from '../sw.js'
const applicationServerPublicKey = 'BJk7RqY0Qa5rmx31elD0RHiv7qG6HRiVN_dKVjc-9srhVl_MyCGPwE_rty5wvtZwYN-4Pu6Pi4c5XNSiyeDcD_4'

const pushButton = document.querySelector('.js-push-btn')

let isSubscribed = false
let swRegistration = null

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported')
  // swRegistration.unregister()
  navigator.serviceWorker.register(SW).then((swReg) => {
    console.log('SW registered', swReg)
    swRegistration = swReg
    swRegistration.update()
    initializeUI()
  }).catch((err) => { console.log('SW Error', err) })
} else {
  console.warn('Push messaging is not supported')
  pushButton.textContent = 'Push not Supported'
}

function initializeUI () {
  pushButton.addEventListener('click', () => {
    pushButton.disabled = true
    if (isSubscribed) {

    } else {
      subscribeUser()
    }
  })

  // set the initial subscription value
  swRegistration.pushManager.getSubscription().then((subscription) => {
    isSubscribed = !(subscription === null)

    isSubscribed ? updateBtn('Disable Push messaging') : updateBtn('Enable Push messaging')
  })
}
function updateBtn (btnState) {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push messaging blocked'
    pushButton.disabled = true
    updateSubscriptionOnServer(null)
    return
  }
  pushButton.textContent = btnState
  pushButton.disabled = false
}

function subscribeUser () {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  }).then((subscription) => {
    updateSubscriptionOnServer(subscription)

    isSubscribed = true

    updateBtn('Disable Push messaging')
  })
    .catch((err) => {
      console.log('Failed to subscribe the user', err)
      updateBtn('Disable Push messaging')
    })
}

function updateSubscriptionOnServer (subscription) {
  const subscriptionJson = document.querySelector('.js-subscription-json')
  const subscriptionDetails = document.querySelector('.js-subscription-details')

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription)
    subscriptionDetails.classList.remove('is-invisible')
  } else {
    subscriptionDetails.classList.add('is-invisible')
  }
}
export default {
  name: 'pushNotification',
  data () {
    return {
      notificationEnabled: false,
      notificationPermissions: false
    }
  }
}
</script>

<style>

</style>
