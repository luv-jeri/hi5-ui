/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAP6RJQIKbon2Z0OnyTgyK4_x6TWcphTcs',
  authDomain: 'hifiv-8505a.firebaseapp.com',
  projectId: 'hifiv-8505a',
  storageBucket: 'hifiv-8505a.appspot.com',
  messagingSenderId: '271044637900',
  appId: '1:271044637900:web:ccb11d80265acce22a3e69',
  measurementId: 'G-RD69TB5DS4',
});

const initMessaging = firebase.messaging();

initMessaging.onBackgroundMessage(function (payload) {
  console.log('Background message', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log('NOTIFICATION CLICKED', event);
  event.notification.close();
  event.waitUntil(clients.openWindow('https://hifiv-8505a.web.app/'));
});
