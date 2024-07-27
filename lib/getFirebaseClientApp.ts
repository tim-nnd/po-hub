import { initializeApp, getApps, getApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_FC_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "po-hub.firebaseapp.com",
  projectId: "po-hub",
  storageBucket: "po-hub.appspot.com",
  messagingSenderId: "119863886302",
  appId: "1:119863886302:web:455be3b01e43626ce29d4f",
  measurementId: "G-2EJ32KH3GT"
};

export const getFirebaseClientApp = () => {
  try {
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Failed to get/initialize client app!', error);
  }
}