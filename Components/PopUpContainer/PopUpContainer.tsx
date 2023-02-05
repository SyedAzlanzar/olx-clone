import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoginPopup from "../LoginPopup/LoginPopup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SignInWithEmailAndPassword from "../SignInWithEmailAndPassword/SignInWithEmailAndPassword";

const PopUpContainer = ({
  isPopupOpen,
  loginWithGoogleHandler,
  canclePopupHandler,
  setIsPopupOpen,
}: any) => {
  const [isBack, setIsback] = useState(false);
  const [signInWithEmailAndPassword, setSignInWithEmailAndPassword] =
    useState(false);

  return (
    <div
      className={`bg-[#000000eb] fixed top-0 left-0 w-screen z-10 h-screen flex items-center justify-center ${
        !isPopupOpen ? "hidden" : null
      }`}
    >
      <div className="w-96 mx-auto bg-white rounded-md">
        <div
          className={`h-10 text-3xl flex items-center px-1 ${
            isBack ? "justify-between" : "justify-end"
          }`}
        >
          {isBack ? (
            <>
              <AiOutlineArrowLeft
                className="text-2xl m-1 w-6 cursor-pointer text-gray-400"
                onClick={() => {
                  setSignInWithEmailAndPassword(false);
                  setIsback(false);
                }}
              />
              <RxCross2
                className="w-7 cursor-pointer text-gray-400 m-1"
                onClick={() => {
                  canclePopupHandler();
                  setSignInWithEmailAndPassword(false);
                  setIsback(false);
                }}
              />
            </>
          ) : (
            <RxCross2
              className="w-7 cursor-pointer text-gray-400 m-1"
              onClick={() => {
                canclePopupHandler();
                setSignInWithEmailAndPassword(false);
              }}
            />
          )}
        </div>
        {!signInWithEmailAndPassword ? (
          <LoginPopup
            setIsback={setIsback}
            setSignInWithEmailAndPassword={setSignInWithEmailAndPassword}
            loginWithGoogleHandler={loginWithGoogleHandler}
          />
        ) : (
          <SignInWithEmailAndPassword
            setIsPopupOpen={setIsPopupOpen}
            setSignInWithEmailAndPassword={setSignInWithEmailAndPassword}
            setIsback={setIsback}
          />
        )}
      </div>
    </div>
  );
};

export default PopUpContainer;
