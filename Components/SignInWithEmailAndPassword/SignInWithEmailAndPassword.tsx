import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config/firebase";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../Redux/reducers/userSlice";
import { toast } from "react-toastify";
import cookie from "react-cookies"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config/firebase"


const SignInWithEmailAndPassword = ({
  setIsPopupOpen,
  setSignInWithEmailAndPassword,
  setIsback,
}: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const dispatch = useDispatch();
  const colletionRef = collection(db, 'Users');
  const emailHandler = (e: any) => setEmail(e.target.value);
  const passwordHandler = (e: any) => setPassword(e.target.value);

  const createNewUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSignInWithEmailAndPassword(false);
        setIsback(false);
        setIsPopupOpen(false);
        const token = await user.getIdToken(true).then((idToken) => idToken);
        dispatch(removeUser({}));
        dispatch(
          setUser({
            accessToken: token,
            user: {
              userName: user.displayName,
              userId: user.uid,
              userEmail: user.email,
              profileImage: user.photoURL,
            },
          })
        );
        userStoreInFirestore(user)
        toast("User Created Successful", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
          position: "bottom-right",
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        toast(errorCode, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "bottom-right",
        });
        const errorMessage = error.message;
        // ..
      });
  };


  async function userStoreInFirestore(user: any) {
    const newUser = {
      user: {
        userName: user.displayName,
        userId: user.uid,
        userEmail: user.email,
        profileImage: user.photoURL,
      },
    };

    try {
      const userRef = doc(colletionRef, user.uid);
      await setDoc(userRef, newUser);
    } catch (error) {
      console.error(error);
    }
  }
  const signInUser = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSignInWithEmailAndPassword(false);
        setIsback(false);
        setIsPopupOpen(false);
        const token = await user.getIdToken(true).then((idToken) => idToken);
        dispatch(removeUser({}));
        dispatch(
          setUser({
            accessToken: token,
            user: {
              userName: user.displayName,
              userId: user.uid,
              userEmail: user.email,
              profileImage: user.photoURL,
            },
          })
        );
        if (token !== null) {
          cookie.save("token", JSON.stringify(token), {
            path: "/",
          });
          userStoreInFirestore(user)
          setIsPopupOpen(false);
          toast("Login Successful", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            position: "bottom-right",
          });
        } else console.log("first token emptied");


        // ...
      })
      .catch((error) => {
        if (error) {
          setEmail("");
          setPassword("");
        }
        const errorCode = error.code;
        toast(errorCode, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "bottom-right",
        });

        const errorMessage = error.message;
      });
  };
  const isSignInHandler = () => {
    setIsSignIn(true);
    setEmail("");
    setPassword("");
    setIsback(false);
  };

  const isCreateUserHandler = () => {
    setIsSignIn(false);
    setEmail("");
    setPassword("");
    setIsback(true);
  };
  return (
    <div>
      <div>
        <div className="flex items-center justify-center">
          <img
            src="https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg"
            alt=""
          />
        </div>
        <p className="text-center text-lg font-medium mt-2">
          Enter Your Email & Password
        </p>
      </div>
      <div className="p-10">
        <form action="" onClick={(e: any) => e.preventDefault()}>
          <label htmlFor="">Email</label>
          <br />
          <input
            value={email}
            autoFocus
            type="email"
            placeholder="xyz@gmail.com"
            className="p-2 border-1 w-full outline-none"
            onChange={emailHandler}
          />
          <br />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input
            value={password}
            type="password"
            placeholder="a945!gb%"
            className="p-2 border-1 w-full outline-none"
            onChange={passwordHandler}
          />
          <div className="flex items-center justify-center mt-8">
            {isSignIn ? (
              <Button
                className="px-3 py-2 text-white bg-[#3A77FF] hover:bg-[#013035] rounded"
                text={"Sign in"}
                onClick={signInUser}
              />
            ) : (
              <Button
                className="px-3 py-2 text-white bg-[#3A77FF] hover:bg-[#013035] rounded"
                text={"Create User"}
                onClick={createNewUser}
              />
            )}
          </div>
        </form>
        {!isSignIn ? (
          <div className=" text-center">
            <p className="font-semibold text-lg mt-3">OR</p>
            <Button
              text={"Sign in with Email & Password"}
              className="text-xs cursor-pointer text-zinc-600  font-normal "
              onClick={isSignInHandler}
            />
          </div>
        ) : (
          <div className=" text-center">
            <p className="font-semibold text-lg mt-3">OR</p>
            <Button
              text={"Create New Account"}
              className="text-xs cursor-pointer text-zinc-600  font-normal "
              onClick={isCreateUserHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInWithEmailAndPassword;
