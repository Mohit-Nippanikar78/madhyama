import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyACaU67Nh4qYvDFXXD_9FBt8lQYY9J16nM",
  authDomain: "madhyam-97baf.firebaseapp.com",
  projectId: "madhyam-97baf",
  storageBucket: "madhyam-97baf.appspot.com",
  messagingSenderId: "89869210501",
  appId: "1:89869210501:web:f293b507146dfc9338eaec",
  measurementId: "G-096HEFZTQN",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
