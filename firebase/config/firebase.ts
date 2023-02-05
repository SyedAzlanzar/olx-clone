import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setUser } from "../../Redux/reducers/userSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});
export const storage = getStorage(app);
// export const signInWithGoogle = async (dispatch: any) => {
//   return await signInWithPopup(auth, googleAuthProvider)
//     .then(async (result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       // const token = credential?.accessToken;

//       // The signed-in user info.
//       const user = result.user;

//       let data = {
//         accessToken: await user.getIdToken(),
//         user: {
//           userName: user.displayName,
//           userId: user.uid,
//           userEmail: user.email,
//           profileImage: user.photoURL,
//         },
//       };
//       dispatch(setUser(data));
//       return user;
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       console.log(error);
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// };

// initialize db
export const db = getFirestore(app);
