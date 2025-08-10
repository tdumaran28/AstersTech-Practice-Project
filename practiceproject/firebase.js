import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgL3UxCpPym2Bkfi-Q3aRgfPOSOSzWRs8",
  authDomain: "practiceproject-d1ad2.firebaseapp.com",
  projectId: "practiceproject-d1ad2",
  storageBucket: "practiceproject-d1ad2.firebasestorage.app",
  messagingSenderId: "442100876058",
  appId: "1:442100876058:web:9202ef9e2ac8037a2da2a3",
  measurementId: "G-HJTMG5LTF4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

