// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getStorage } from "firebase/storage"; // Import Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXz_3fPh3n9NsOpUM8FJSI-1kvRE2EUnw",
  authDomain: "valorant-stats-7ccb6.firebaseapp.com",
  databaseURL: "https://valorant-stats-7ccb6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "valorant-stats-7ccb6",
  storageBucket: "valorant-stats-7ccb6.appspot.com",
  messagingSenderId: "427538449598",
  appId: "1:427538449598:web:add15a8c9f768ee180caef",
  measurementId: "G-2LC8VYDKS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and Storage
const database = getDatabase(app);
const storage = getStorage(app);

// Export the services to use them in other parts of your application
export { app, analytics, database, storage };