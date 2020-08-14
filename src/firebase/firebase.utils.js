import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD0dx3rxo8LsNMBlRu6vJ3bmoDjyT01w9A",
  authDomain: "clothing-app-23761.firebaseapp.com",
  databaseURL: "https://clothing-app-23761.firebaseio.com",
  projectId: "clothing-app-23761",
  storageBucket: "clothing-app-23761.appspot.com",
  messagingSenderId: "88110495848",
  appId: "1:88110495848:web:d87d6a0f2f31d7ef84e3dd",
  measurementId: "G-90GJYP5T02",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
