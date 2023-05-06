// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACB3aErPiK5G5Hdb_zzjWa873Ow8gRgLY",
  authDomain: "fir-c8dd0.firebaseapp.com",
  projectId: "fir-c8dd0",
  storageBucket: "fir-c8dd0.appspot.com",
  messagingSenderId: "532618739364",
  appId: "1:532618739364:web:490c13810324bed50f3031",
  measurementId: "G-5D4XXB08EE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
