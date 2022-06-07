import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJYfheAx2TOEJxx--_k3ttgMrmbsWs5ec",
  authDomain: "authex-b7a99.firebaseapp.com",
  projectId: "authex-b7a99",
  storageBucket: "authex-b7a99.appspot.com",
  messagingSenderId: "949450003365",
  appId: "1:949450003365:web:cc558c5e6b76d69703ce4c",
  measurementId: "G-RB3PSRLL0B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const storage = getStorage();

export default app;
