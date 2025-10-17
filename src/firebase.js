import { initializeApp } from "firebase/app";
import { getToken, onMessage, getMessaging } from "firebase/messaging";

function init() {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID", 
    measurementId: "YOUR_MEASUREMENT_ID", 
  } 

  const app = initializeApp(firebaseConfig);

  return getMessaging(app);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((reg) => console.log("Service Worker registered", reg))
    .catch((err) => console.error("SW registration failed", err));
}

function get_client_token() {
  const messaging = init();
  Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BGwXszTLGVE3PSHvLzfAVqV_LwpCzWsNEmJ4tMkSuXt7KMSrwZ3w0LSkG_ycOcEYJHgJM8BB7ygCAilBSkB8zyU",
      });
      console.log("FCM Token:", token);
      // send token to backend if needed
    } else {
      console.log("Notification permission denied");
    }
  });
}

function onForegroundMessage() {
  const messaging = init();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    
    const notification = new Notification(payload.data.title, {
      body: payload.data.body,
      icon: "https://cdn-icons-png.flaticon.com/512/4193/4193267.png",
      image: "https://picsum.photos/200/300",
    });

    notification.onclick = (e) => {
      e.preventDefault();
      window.focus();
      window.open(payload.data.url || "/", "_blank");
    }; 
  });
}

export { get_client_token, onForegroundMessage };
