// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsFjCTz_nt2TyOwUGaaiH3XP2gL10yiEw",
  authDomain: "ecofootprint-dcd19.firebaseapp.com",
  projectId: "ecofootprint-dcd19",
  storageBucket: "ecofootprint-dcd19.firebasestorage.app",
  messagingSenderId: "54963371830",
  appId: "1:54963371830:web:9848ad2bff991beafafd97"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
