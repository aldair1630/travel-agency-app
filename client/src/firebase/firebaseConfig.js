// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLT1-vLKilEMetb8jB_Egrm0NuBKf5wAg",
  authDomain: "travel-agency-app-7e359.firebaseapp.com",
  projectId: "travel-agency-app-7e359",
  storageBucket: "travel-agency-app-7e359.appspot.com",
  messagingSenderId: "542234243294",
  appId: "1:542234243294:web:adc7a5f7cd33ad4364924f",
  measurementId: "G-GKQ4M6LV1S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
